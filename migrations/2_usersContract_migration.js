/* eslint-disable no-undef */

const UsersContracts = artifacts.require('./UsersContract');

module.exports = function (deployer) {
  deployer.deploy(UsersContracts);
};
