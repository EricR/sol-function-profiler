# Solidity Function Profiler

Usage Example:

```
$ node index.js ~/contracts/mytoken.sol
.--------------------------------------------------------------------------------------------------------.
|                                        ~/contracts/mytoken.sol                                         |
|--------------------------------------------------------------------------------------------------------|
|   Contract    |           Function            | Visibility | Constant |  Returns  |     Modifiers      |
|---------------|-------------------------------|------------|----------|-----------|--------------------|
| MyToken       | ()                            | public     | false    |           | payable            |
| MyToken       | initTokenHolder(address,uint) | public     | false    |           | onlyOwner          |
| MyToken       | balance(address)              | public     | true     | uint      |                    |
| MyToken       | transferAll(address,address)  | external   | false    |           | onlyTokenHolder    |
| MyToken       | kill()                        | internal   | false    |           |                    |
'--------------------------------------------------------------------------------------------------------'
```
