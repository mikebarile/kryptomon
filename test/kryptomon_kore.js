const debug = require("debug")("kryptomon");
const KryptomonKore = artifacts.require("KryptomonKore");

contract("KryptomonKore", function(accounts) {
    const god = accounts[0];
    const user1 = accounts[1];
    let kore;

    beforeEach(async function() {
	kore = await KryptomonKore.deployed();
    });
    
    describe("Initial state", function() {
	it("has kryptoGod", async function() {
	    assert.equal(await kore.kryptoGodAddress(), god);
	});
    });

    describe("assign reserve eggs", function() {
	it("assigns eggs and emits events", async function() {
	    const num_eggs = 2;
	    result = await kore.assignReserveEggs(user1, num_eggs);
	    assert.equal(result.logs.length, 2*num_eggs);
	    for (var i = 0; i < num_eggs; i += 2) {
		assert.equal(result.logs[i].event, 'GenZeroEggHatched');
		assert.equal(result.logs[i].args.buyerId, user1);
		assert.equal(result.logs[i+1].event, 'KryptomonAssigned');
		assert.equal(result.logs[i+1].args.ownerAddress, user1);
	    }
	    assert.equal(await kore.ownerToTotalKryptomon(user1), num_eggs);
	})
    })
});
