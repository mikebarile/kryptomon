const debug = require("debug")("kryptomon");
const chai = require('chai'),
      expect = chai.expect,
      should = chai.should();
const BigNumber = require('bignumber.js');
const KryptomonKore = artifacts.require("KryptomonKore");

chai.use(require('chai-subset'));
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));

contract("Kryptomon", function(accounts) {
    const god = accounts[0];
    const user1 = accounts[1];
    let kore;

    beforeEach(async function() {
        kore = await KryptomonKore.deployed();
        // This defaults to true for some reason.
        if (await kore.completeFreeze()) { await kore.setCompleteFreeze(false); }
    });
    
    contract("Definitions", function() {
        contract("Initial state", function() {
            it("has kryptoGod", async function() {
                await kore.kryptoGodAddress().should.become(god);
            });

            it("no one has eggs or kryptomon", function() {
                BigNumber(0).should.deep.equal(BigNumber(0));
                accounts.forEach(async function(account) {
                    (await kore.ownerToTotalKryptomon(account)).toNumber().should.equal(0);
                    (await kore.ownerToTotalEggs(account)).toNumber().should.equal(0);
                });
            });

            it("is not paused", async function() {
                (await kore.completeFreeze()).should.equal(false);
                (await kore.breedingPaused()).should.equal(false);
                (await kore.hatchingPaused()).should.equal(false);
                (await kore.genZeroPaused()).should.equal(false);
            });
        });
    });
         
    contract("GenZeroEggSales", function() {
        const testGenZeroEggsAssigned = async function(user, assign_eggs_fn) {
            const starting_user_num_kryptomon = +(await kore.ownerToTotalKryptomon(user)).toNumber();
            const starting_total_supply = +await kore.totalSupply();
            const num_eggs = 2;
            const result = await assign_eggs_fn(num_eggs);
            result.logs.should
                .have.lengthOf(2 * num_eggs).and
                .containSubset(Array(num_eggs).fill(
                    {
                        event: 'GenZeroEggHatched',
                        args: {buyerId: user}
                    })).and
                .containSubset(Array(num_eggs).fill(
                    {
                        event: 'KryptomonAssigned',
                        args: {ownerAddress: user}
                    }));
            const owner_is = async (user) => async (id) => await kore.kryptomonIndexToOwner(id) === user;
            const kryptomon_ids = result.logs
                  .filter(log => log.event === 'KryptomonAssigned')
                  .map(log => log.args.kryptomonId.toNumber());
            kryptomon_ids.should.all.satisfy(await owner_is(user));
            (await kore.ownerToTotalKryptomon(user)).toNumber().should.equal(starting_user_num_kryptomon + num_eggs);
            (await kore.totalSupply()).toNumber().should.equal(starting_total_supply + num_eggs);
        };

        contract("#assignReserveEggs()", function() {
            it("emits events and assigns eggs", async function() {
                await testGenZeroEggsAssigned(user1, async function(num_eggs) {
                    return await kore.assignReserveEggs(user1, num_eggs, {from: god});
                });
            });
        
            it("only god can assign", function() {
                const num_eggs = 2;
                kore.assignReserveEggs(user1, num_eggs, {from: user1}).should.be.rejectedWith(/revert/);
            });
        });
        
        contract("#buyGenZeroEggs()", function() {
            it("emits events and assigns eggs", async function() {
                const egg_price = web3.toWei(10, 'finney');
                await testGenZeroEggsAssigned(user1, async function(num_eggs) {
                    return await kore.buyGenZeroEggs(num_eggs, {
                        value: egg_price * num_eggs,
                        from: user1,
                    });
                });
            });            
        });
    });

    contract("Breeding", function() {
        contract("#breedKryptomon", function () {
            it("creates an egg", async function() {
                const user = user1;
                const starting_user_num_eggs = (await kore.ownerToTotalEggs(user)).toNumber();
                const result = await kore.assignReserveEggs(user, /* num eggs = */ 2);
                const [matron_id, sire_id] = result.logs
                      .filter(log => log.event === 'KryptomonAssigned')
                      .map(log => log.args.kryptomonId);
                const breed_result = await kore.breedKryptomon(sire_id, matron_id, {from: user});
                breed_result.logs.should.have.lengthOf(2).and
                    .containSubset([
                        {
                            event: 'KryptomonBred',
                            args: {
                                _sireIndex: sire_id,
                                _matronIndex: matron_id,
                                _owner: user
                            }
                        },
                        {
                            event: 'EggAssigned',
                            args: { ownerAddress: user }
                        }
                    ]);
                const egg_id = breed_result.logs.filter(log => log.event === 'EggAssigned')[0].args.eggId.toNumber();
                (await kore.ownerToTotalEggs(user)).toNumber().should.equal(starting_user_num_eggs + 1);
                (await kore.eggIndexToOwner(egg_id)).should.equal(user);
            });
        });
    });
});
