pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/UsersContract.sol";

contract TestUsersContract {
  function testJoinUser() public {
    UsersContract usersContract = UsersContract(DeployedAddresses.UsersContract());

    usersContract.join("Nicolas", "Apolonia");
  }
}
