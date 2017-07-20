const parser     = require("solidity-parser");
const asciiTable = require('ascii-table');

if(process.argv.length < 3) {
  console.log("Error: Missing argument for sol file to scan");
  process.exit(1);
}

var target   = process.argv[2],
    contract = parser.parseFile(target);

generateReport(target, contract);

function generateReport(target, contract) {
  var table = new asciiTable(target);
  table.setHeading('Contract', 'Function', 'Visibility', 'Constant', 'Returns', 'Modifiers');

  contract.body.forEach(function(contract) {
    if(contract.type == 'ContractStatement') {
      contract.body.forEach(function(part) {
        if(part.type == "FunctionDeclaration" && part.is_abstract == false) {
          var func = parseFunctionPart(contract, part);
          table.addRow(func.contract, func.function, func.visibility, func.constant, func.returns, func.modifiers);
        }
      })
    }
  })
  console.log(table.toString());
}

function parseFunctionPart(contract, part) {
  var contractName = contract.name,
      funcName     = part.name || "",
      params       = [];

  if(part.params) {
    part.params.forEach(function(param) {
      params.push(param.literal.literal);
    });
    funcName += "(" + params.join(',') + ")"
  } else {
    funcName += "()"
  }

  // Default is public
  var visibility = "public"
      isConstant = false,
      returns    = [],
      custom     = [];

  if(part.modifiers) {
    part.modifiers.forEach(function(mod) {
      switch(mod.name) {
        case "public":
          break;
        case "private":
          visibility = "private";
          break;
        case "internal":
          visibility = "internal";
          break;
        case "external":
          visibility = "external";
          break;
        case "constant":
          isConstant = true;
          break;
        case "returns":
          mod.params.forEach(function(param) {
            returns.push(param.name);
          });
          break;
        default:
          custom.push(mod.name);
      }
    });
  }

  return {
    contract:   contractName,
    function:   funcName,
    visibility: visibility,
    constant:   isConstant,
    returns:    returns,
    modifiers:  custom
  }
}
