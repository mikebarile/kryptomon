const KryptomonKore = artifacts.require("KryptomonKore");
const fs = require("fs");

module.exports = async function(callback) {
    // Number of eggs to hatch in a single transaction.
    // Needs to be relatively small to avoid running out of gas.
    const hatch_batch_size = 10;
    const num_eggs = 10000;
    const k = KryptomonKore.at(KryptomonKore.address);
    await k.setCompleteFreeze(false);
    await k.setGenZeroEggPrice(1);
    await k.buyGenZeroEggs(num_eggs, {value: 1e18});
    var rarities = [];
    for (var i = 0; i < num_eggs ; i += hatch_batch_size) {
        const hatch_result = await k.hatchGenZeroEgg(hatch_batch_size);
        const kryptomon_assigned = hatch_result.logs
              .filter(log => log.event === 'KryptomonAssigned');
        for (var j in kryptomon_assigned) {
            const log = kryptomon_assigned[j];
            const kryptomon_id = log.args.kryptomonId.toNumber();
            const kryptomon = (await k.getKryptomon(kryptomon_id));
            const species_id = kryptomon[0].toNumber();
            const species = (await k.getSpeciesDetails(species_id));
            const rarity = species[10].toNumber();
            rarities.push(rarity);
        }
        if (i % 10 == 0) { console.log(i + " of " +  num_eggs + " done"); }
    }
    fs.writeFileSync("/tmp/mons.txt", rarities);
    callback();
}
