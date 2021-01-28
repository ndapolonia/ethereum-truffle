/* eslint-disable no-undef */
const AssertionError = require('assert').AssertionError;
const UsersContract = artifacts.require('UsersContract');

contract('UsersContract', async (accounts) => {
  let usersContractInstance;
  let owner = accounts[0];
  let other = accounts[1];

  beforeEach(async () => {
    usersContractInstance = await UsersContract.new({ from: owner });
  });

  it('Should join a user', async () => {
    let name = 'Nicolás';
    let surename = 'Apolonia';

    await usersContractInstance.join(name, surename, { from: owner, gas: '500000' });
  });

  it('Should retrieve a user', async () => {
    const name = 'Nicolás';
    const surename = 'Apolonia';

    await usersContractInstance.join(name, surename, { from: owner, gas: '500000' });

    const user = await usersContractInstance.getUser(owner);

    assert.strictEqual(name, user[0]);
    assert.strictEqual(surename, user[1]);
  });

  it('Should not allow joining a user twice', async () => {
    await usersContractInstance.join('Nicolás', 'Apolonia', { from: other, gas: '500000' });

    try {
      await usersContract.join('Luca', 'Berizzo Apolonia', { from: other, gas: '500000' });
      assert.fail("Same account can't join twice");
    } catch (error) {
      if (error instanceof AssertionError) {
        assert.fail(error.message);
      }
    }
  });

  it('Should not allow retrieving a not registered user', async () => {
    try {
      await usersContractInstance.getUser(owner);
      assert.fail('User should not be registered');
    } catch (error) {
      if (error instanceof AssertionError) {
        assert.fail(error.message);
      }
    }
  });

  it('Should retrieve total registered users', async () => {
    await usersContractInstance.join('Nicolás', 'Apolonia', { from: owner, gas: '500000' });
    await usersContractInstance.join('Luca', 'Berizzo Apolonia', { from: other, gas: '500000' });

    const total = await usersContractInstance.totalUsers();
    assert.strictEqual(parseInt(total), 2);
  });
});
