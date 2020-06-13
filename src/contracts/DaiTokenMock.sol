pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";


contract DaiTokenMock is ERC20,ERC20Mintable {
    string public name;
    string public symbol;
    uint256 public decimal;

    constructor() public {
        name = "Dai Stablecoin";
        symbol = "DAI";
        decimal = 18;
    }
}