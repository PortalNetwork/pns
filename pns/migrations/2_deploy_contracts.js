const PNSRegistry = artifacts.require("./PNSRegistry.sol");
const PNSRegistrar = artifacts.require('./PNSRegistrar.sol');
const PNSResolver = artifacts.require('./PNSResolver.sol');

const web3 = new (require('web3'))();
const namehash = require('eth-ens-namehash');

const PERL = 'perl';

module.exports = function(deployer) {
  // deploy registry
  deployer.deploy(PNSRegistry)
    .then(() => {
      // deploy registrar
      return deployer.deploy(PNSRegistrar, PNSRegistry.address, namehash.hash(PERL));
    })
    .then(() => {
      // deploy resolver
      return deployer.deploy(PNSResolver, PNSRegistry.address);
    })
    .then(function() {
      PNSRegistry.at(PNSRegistry.address).setSubnodeOwner('0x0', web3.sha3(PERL), PNSRegistrar.address);
    });
};
