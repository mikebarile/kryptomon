var SafeMath = artifacts.require('SafeMath');
var Util = artifacts.require('Util');
var KryptomonKore = artifacts.require('KryptomonKore');

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(Util);
  deployer.link(SafeMath, KryptomonKore);
  deployer.link(Util, KryptomonKore);
  deployer.deploy(KryptomonKore);
};
