module.exports = function(callback) {
  const KryptomonKore = artifacts.require("KryptomonKore");
  let kore;

  async function setup() {
    kore = await KryptomonKore.deployed();
    if (await kore.completeFreeze()) { await kore.setCompleteFreeze(false);
  }

  // This defaults to true for some reason.
  setup();

  console.log(KryptomonKore.getSpeciesDetails(147));
  callback.call();
}
