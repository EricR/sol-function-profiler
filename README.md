# Solidity Function Profiler

A command line tool that generates a human-consumable report listing a contract's functions. This is useful during manual code review to understand what functions are made public, use which modifiers, and so on.

Usage Example:

```
$ node install
...
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
