var SafeMath = artifacts.require("SafeMath");
var KryptoGodController = artifacts.require("KryptoGodController");
var KryptomonDefinitions = artifacts.require("KryptomonDefinitions");
var KryptomonGenZeroEggSales = artifacts.require("KryptomonGenZeroEggSales");
var KryptomonTokenization = artifacts.require("KryptomonTokenization");
var KryptomonEggTokenization = artifacts.require("KryptomonEggTokenization");
var KryptomonBreeding = artifacts.require("KryptomonBreeding");
var KryptomonKore = artifacts.require("KryptomonKore");

module.exports = function(deployer) {
    deployer.deploy(SafeMath);
    deployer.deploy(KryptoGodController);
    deployer.deploy(KryptomonDefinitions);
    deployer.deploy(KryptomonGenZeroEggSales);
    deployer.deploy(KryptomonTokenization);
    deployer.deploy(KryptomonEggTokenization);
    deployer.deploy(KryptomonBreeding);
    deployer.deploy(KryptomonKore);
};
