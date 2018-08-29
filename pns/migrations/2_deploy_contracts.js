const PNSRegistry = artifacts.require("./PNSRegistry.sol");
const PNSRegistrar = artifacts.require('./PNSRegistrar.sol');
const PNSResolver = artifacts.require('./PNSResolver.sol');

const web3 = new (require('web3'))();
const namehash = require('eth-ens-namehash');

const PERL = 'perl';

module.exports = async (deployer) => {
  // deploy registry
  let pnsResgirty = await deployer.deploy(PNSRegistry);
  // deploy registrar
  let pnsRegistrar = await deployer.deploy(PNSRegistrar, PNSRegistry.address, namehash.hash(PERL));
  // deploy resolver
  let pnsResolver = await deployer.deploy(PNSResolver, PNSRegistry.address);
  PNSRegistry.at(PNSRegistry.address).setSubnodeOwner('0x0', web3.sha3(PERL), PNSRegistrar.address);
};
