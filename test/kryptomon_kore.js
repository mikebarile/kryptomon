const BigNumber = require('bignumber.js');
const chai = require('chai'),
      expect = chai.expect,
      should = chai.should();
const debug = require("debug")("kryptomon");

const KryptomonKore = artifacts.require("KryptomonKore");

chai.use(require('chai-subset'));
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));

contract("Kryptomon", function(accounts) {
    const god = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];
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
                accounts.forEach(async function(account) {
                    (await kore.balanceOf(account)).toNumber().should.equal(0);
                    (await kore.eggBalanceOf(account)).toNumber().should.equal(0);
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
            const starting_user_balance = await kore.balanceOf(user);
            const starting_total_supply = await kore.totalSupply();
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
            const owner_is = async (user) => async (id) => await kore.ownerOf(id) === user;
            const kryptomon_ids = result.logs
                  .filter(log => log.event === 'KryptomonAssigned')
                  .map(log => log.args.kryptomonId.toNumber());
            kryptomon_ids.should.all.satisfy(await owner_is(user));
            (await kore.balanceOf(user)).should.deep.equal(starting_user_balance.plus(num_eggs));
            (await kore.totalSupply()).should.deep.equal(starting_total_supply.plus(num_eggs));
        };

        contract("#assignReserveEggs()", function() {
            it("emits events and assigns eggs", async function() {
                await testGenZeroEggsAssigned(user1, async function(num_eggs) {
                    return await kore.assignReserveEggs(user1, num_eggs, {from: god});
                });
            });
        
            it("only god can assign", async function() {
                const num_eggs = 2;
                await kore.assignReserveEggs(user1, num_eggs, {from: user1})
                    .should.be.rejectedWith(/revert/);
            });
        });
        
        contract("#buyGenZeroEggs()", function() {
            const egg_price = web3.toWei(10, 'finney');
            it("emits events and assigns eggs", async function() {
                await testGenZeroEggsAssigned(user1, async function(num_eggs) {
                    return await kore.buyGenZeroEggs(num_eggs, {
                        value: egg_price * num_eggs,
                        from: user1,
                    });
                });
            });            

            it("requires sufficient funds", async function() {
                const num_eggs = 2;
                await kore.buyGenZeroEggs(num_eggs, {
                    value: egg_price * num_eggs / 2,
                    from: user1,
                }).should.be.rejectedWith(/revert/);
            });            
        });
    });

    contract("Breeding", function() {
        const breed = async function(user) {
            const [matron_id, sire_id] =
                  (await kore.assignReserveEggs(user, /* num eggs = */ 2)).logs
                  .filter(log => log.event === 'KryptomonAssigned')
                  .map(log => log.args.kryptomonId);
            const breed_result = await kore.breedKryptomon(sire_id, matron_id, {from: user});
            breed_result.logs.should
                .have.lengthOf(2).and
                .containSubset([
                    {
                        event: 'KryptomonBred',
                        args: {
                            sireId: sire_id,
                            matronId: matron_id,
                            ownerAddress: user
                        }
                    },
                    {
                        event: 'EggAssigned',
                        args: { ownerAddress: user }
                    }
                ]);
            const egg_id = breed_result.logs
                  .filter(log => log.event === 'EggAssigned')[0]
                  .args.eggId;
            return {sire_id, matron_id, egg_id};
        };

        contract("#breedKryptomon()", function () {
            it("creates an egg", async function() {
                const user = user1;
                const starting_user_egg_balance = await kore.eggBalanceOf(user);
                const egg_id = (await breed(user)).egg_id;
                (await kore.eggBalanceOf(user)).should.deep.equal(starting_user_egg_balance.plus(1));
                (await kore.eggOwnerOf(egg_id)).should.equal(user);
            });
        });

        contract("#hatchEgg()", function() {
            it("hatches an egg", async function() {
                const user = user1;
                const starting_user_egg_balance = await kore.eggBalanceOf(user);
                const egg_id = (await breed(user)).egg_id;
                // Set this after breeding to include the sire and maton used to breed.
                const starting_user_balance = await kore.balanceOf(user);
                const hatch_result = await kore.hatchEgg(egg_id, {from: user});
                hatch_result.logs.should
                    .have.lengthOf(2).and
                    .containSubset([
                        {
                            event: 'EggHatched',
                            args: {
                                ownerAddress: user,
                                eggId: egg_id
                            }
                        },
                        {
                            event: 'KryptomonAssigned',
                            args: { ownerAddress: user }
                        }
                    ]);
                const kryptomon_id = hatch_result.logs
                      .filter(log => log.event === 'KryptomonAssigned')[0]
                      .args.kryptomonId;
                (+await kore.eggOwnerOf(egg_id)).should.equal(0);
                (await kore.ownerOf(kryptomon_id)).should.equal(user);
                (await kore.eggBalanceOf(user)).should.deep.equal(starting_user_egg_balance);
                (await kore.balanceOf(user)).should.deep.equal(starting_user_balance.plus(1));
            });
            
            it("cannot hatch another user's egg", async function() {
                const user = user1;
                const other_user = user2;
                const egg_id = (await breed(user)).egg_id;
                await kore.hatchEgg(egg_id, {from: other_user}).should.be.rejectedWith(/revert/);
            });
        });
    });
});
