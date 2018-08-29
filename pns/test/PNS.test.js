const PNSRegistrar = artifacts.require('PNSRegistrar.sol');
const PNSRegistry = artifacts.require('PNSRegistry.sol');
const PNSResolver = artifacts.require('PNSResolver.sol');
const namehash = require('eth-ens-namehash');
const Web3 = require('web3');
let web3 = new Web3();

contract('PNS', function (accounts) {
  beforeEach(async () => {
    console.log('perl sha3', web3.sha3('perl'));
    console.log('perl namehash', namehash.hash('perl'));
    registry = await PNSRegistry.new();
    registrar = await PNSRegistrar.new(registry.address, 0);
    resolver = await PNSResolver.new(registry.address);

    await registry.setOwner(0, registrar.address, {from: accounts[0]});
  });

  it('should allow registration of names', async () => {
    await registrar.register(web3.sha3('perl'), accounts[0], {from: accounts[0]});
    assert.equal(await registry.owner(0), registrar.address);
    assert.equal(await registry.owner(namehash.hash('perl')), accounts[0]);
  });

});
