pragma solidity ^0.4.11;
import './KryptoGodController.sol';
import '../libraries/SafeMath.sol';
import '../libraries/Util.sol';

contract KryptomonDefinitions is KryptoGodController {
  using SafeMath for uint256;

  //// START Event Definitions
  // Event that's fired every time an egg is hatched.
  event EggHatched(address ownerAddress, uint256 eggId);

  // Event that's fired every time a Kryptomon is assigned a new owner.
  // This includes when a new Kryptomon is hatched from an egg.
  event KryptomonAssigned(address ownerAddress, uint256 kryptomonId);

  // Event that's fired every time an egg is assigned to a new owner.
  // This includes when a new egg is created from breeding two
  // Kryptomon.
  event EggAssigned(address ownerAddress, uint256 eggId);

  // Event that's fired every time a Kryptomon successfully evolves.
  event KryptomonEvolved(address ownerAddress, uint256 kryptomonId);
  //// END Event Definitions

  //// START Structs Definitions
  // The main Egg struct.
  struct Egg {
    // The generation of the Kryptomon that will be hatched from this
    // egg. The generation is calculated as the max of the two parents'
    // generations plus 1 (e.g. if parent1 is gen0 and parent 2 is gen9,
    // the child will be gen10).
    uint8 generation;

    // The average of the egg's parents' gene attributes. The Kryptomon
    // that hatches from this egg is slightly more likely to have this
    // as their genetic value.
    uint8 geneticPredisposition;

    // The egg's rarity, calculated as the minimum rarity of the egg's
    // parents.
    // 1: Common
    // 2: Uncommon
    // 3: Rare
    // 4: Super Rare
    // 5: Ultra Rare
    // 6: Mega Rare
    // 7: Legendary
    uint8 rarity;
  }

  // The main Kryptomon struct.
  struct Kryptomon {
    // Initiated when the Kryptomon is hatched from an egg. Used by
    // various
    uint32 birthTimeStamp;

    // The minimum timestamp after which this Kryptomon can engage in
    // breeding activities again. Is based on a Kryptomon's species.
    uint32 lastBred;

    // The id associated with the Kryptomon's species. All metadata
    // associated with the Kryptomon's species is stored in a separate
    // lookup table.
    uint16 speciesId;

    // The number of eggs that this Kryptomon has produced. Different
    // species of Kryptomon have different restrictions on how many
    // children they can have.
    uint8 numChildren;

    // The Kryptomon's generation. Higher generation Kryptomon have
    // increasingly degredated base stats and take exponentially more
    // time to evolve.
    uint8 generation;

    // A value between 0 and 200 that modifies the Kryptomon's stats.
    // A value of 0 results in a 10% decrease in base stats while a
    // value of 200 results in a 10% increase. Children are
    // predisposed to have similar genes as their parents but there is
    // an element of randomness in gene assignment.
    uint8 geneticValue;
  }

  struct Species {
    // The amount of time a Kryptomon must wait before it can breed
    // again.
    uint32 breedingCooldown;

    // Base amount time it takes for this Kryptomon to evolve. Actual
    // evolution time is also based on Kryptomon's generation. Time is
    // in seconds.
    uint32 timeToEvolve;

    // The ID for the species this type of Kryptomon will evolve into.
    // A non-zero value indicates this type of Kryptomon can evolve.
    uint16 evolveToId;

    // Stat used to determine "physical" type attack potency.
    uint8 attack;

    // Stat used to determine effectiveness in defending against all
    // "physical" type attacks.
    uint8 defense;

    // Stat used to determine "special" type attack potency.
    uint8 specialAttack;

    // Stat used to determine effectiveness in defending against all
    // "special" type attacks.
    uint8 specialDefense;

    // A number of points representing how much damage a Kryptomon can
    // sustain before being knocked out.
    uint8 hitPoints;

    // Represents how frequently the Kryptomon can attack and the order
    // of attacks.
    uint8 speed;

    // The maximum number of children a Kryptomon can sire.
    uint8 maxChildren;

    // Number representing the creature's rarity. Values can be between
    // 1 - 7 which translate into the following:
    // 1: Common
    // 2: Uncommon
    // 3: Rare
    // 4: Super Rare
    // 5: Ultra Rare
    // 6: Mega Rare
    // 7: Legendary
    uint8 rarity;

    // Indicates that this species can no longer be hatched or bred.
    bool isExtinct;
  }
  //// END Struct Definitions

  //// START Storage
  // An array containing the egg struct for all eggs in existence. Each
  // egg's ID is actually an index in this array.
  Egg[] eggList;

  // An array containing the Kryptomon struct for all Kryptomon in
  // existence. The ID of each Kryptomon is actually an index in this
  // array.
  Kryptomon[] kryptomonList;

  // An array containing all of the Kryptomon species structs. Each
  // species' ID is its index in the array.
  Species[] speciesList;

  // Total number of eggs in circulation (not including gen0).
  uint256 totalEggs;

  // Maps all kryptomon IDs to an owner. All Kryptomon should have an
  // owner at all times.
  mapping (uint256 => address) internal kryptomonIndexToOwner;

  // Maps all egg IDs to an owner. All eggs should have an owner at all
  // times.
  mapping (uint256 => address) internal eggIndexToOwner;

  // Maps each Kryptomon to an address that has been approved to call
  // the "transferFrom" method. Used to comply with ERC721.
  mapping (uint256 => address) internal kryptomonIndexToApproved;

  // Maps each Kryptomon egg to an address that has been approved to
  // call the "transferFrom" method. Used to comply loosely with ERC721.
  mapping (uint256 => address) internal eggIndexToApproved;

  // Total species for each rarity level.
  mapping (uint256 => uint256) public speciesCountByRarity;

  // Returns a pseudo-random value seeded with _seed and some other
  // not-very-random data.
  function random(uint256 _seed) internal view returns(uint256) {
    return uint256(keccak256(
      _seed,
      block.blockhash(block.number - Util.min(block.number - 1, 255)),
      msg.gas,
      msg.sender,
      block.timestamp
    ));
  }

  // returns an approximately uniformly distributed pseudo-random int
  // in [1, _n].
  function uniformRandom(uint256 _seed, uint256 _n)
    internal
    view
    returns(uint256)
  {
    // Ensure we don't divide by zero or try to overflow the int.
    require(_n > 0 && _n < 1000000000000);
    return random(_seed) % _n + 1;
  }

  // Function called by Kryptomon users to hatch their eggs. Destroys
  // the egg, removes the egg ID from the ownership mapping, creates
  // a new Kryptomon, and assigns ownership of the new Kryptomon to
  // the egg's owner.
  function hatchEgg(uint256 _eggId) external whenHatchingNotPaused {
    require(eggIndexToOwner[_eggId] == msg.sender);
    uint256 kryptomonId = createKryptomon(_eggId);
    delete eggList[_eggId];
    delete eggIndexToOwner[_eggId];
    totalEggs = totalEggs.sub(1);
    kryptomonIndexToOwner[kryptomonId] = msg.sender;
    EggHatched(msg.sender, _eggId);
    KryptomonAssigned(msg.sender, kryptomonId);
  }

  // Creates a new Kryptomon and returns its id. The new Kryptomon will
  // have a higher probability of having one of its parents' species
  // and a higher probability of inheriting the average of their
  // gene value.
  function createKryptomon(uint256 _eggId) internal returns(uint256) {
    Egg memory egg = eggList[_eggId];
    uint256 speciesId = determineSpeciesId(_eggId, egg.rarity);
    uint256 geneticValue = determineGeneticValue(
      egg.geneticPredisposition,
      _eggId
    );
    kryptomonList.push(
      Kryptomon({
        speciesId: uint16(speciesId),
        geneticValue: uint8(geneticValue),
        generation: egg.generation,
        birthTimeStamp: uint32(now),
        lastBred: uint32(now),
        numChildren: 0
      })
    );
    return uint256(kryptomonList.length.sub(1));
  }

  // Function used to determine a new Kryptomon's species ID. The
  // species ID is chosen randomly from rarity buckets based on
  // the egg's rarity.
  function determineSpeciesId(uint256 _eggId, uint256 _eggRarity)
    internal
    returns(uint256)
  {
    uint256 randRarity = uniformRandom(_eggId, 1000000);
    uint24[6] memory bracket = getRarityBracketArray(_eggRarity);
    uint256 rarity;
    if (randRarity <= bracket[0]) {
      // Set to a common creature (40% probability).
      rarity = 1;
    } else if (randRarity > bracket[0] && randRarity <= bracket[1]) {
      // Set to an uncommon creature (25% probability).
      rarity = 2;
    } else if (randRarity > bracket[1] && randRarity <= bracket[2]) {
      // Set to a rare creature (20% probability).
      rarity = 3;
    } else if (randRarity > bracket[2] && randRarity <= bracket[3]) {
      // Set to a super rare creature (10% probability).
      rarity = 4;
    } else if (randRarity > bracket[3] && randRarity <= bracket[4]) {
      // Set to an ultra rare creature (~5% probability).
      rarity = 5;
    } else if (randRarity > bracket[4] && randRarity <= bracket[5]) {
      // Set to a mega rare creature (~0.1% probability).
      rarity = 6;
    } else if (randRarity > bracket[5]) {
      // Set to a legendary creature (0.0005% probability).
      rarity = 7;
    }

    // If there are 0 legendaries remaining, return a rarity 6
    // Kryptomon species ID. Else, return a random legendary species
    // ID and set it to extinct.
    if (rarity == 7 && speciesCountByRarity[7] == 0) {
      rarity = 6;
    }
    uint256 speciesId = getRarityBasedSpeciesId(_eggId, rarity);
    if (rarity == 7) {
      setLegendarySpeciesExtinct(speciesId);
    }

    return speciesId;
  }

  // Returns an array with the "rarity-based bracket" e.g. the
  // probabilities of hatching a Kryptomon of a given rarity.
  function getRarityBracketArray(uint256 _eggRarity)
    private
    pure
    returns(uint24[6])
  {
    require(_eggRarity > 0);
    require(_eggRarity <= 7);
    uint24[6] memory rarityBracket;

    if (_eggRarity == 1) {
      rarityBracket = [400000, 650000, 850000, 950000, 998000, 999800];
    } else if (_eggRarity == 2) {
      rarityBracket = [300000, 600000, 850000, 950000, 998000, 999800];
    } else if (_eggRarity == 3) {
      rarityBracket = [250000, 500000, 800000, 993000, 997000, 999700];
    } else if (_eggRarity == 4) {
      rarityBracket = [200000, 400000, 700000, 920000, 996000, 999600];
    } else if (_eggRarity == 5) {
      rarityBracket = [100000, 250000, 550000, 850000, 990000, 999500];
    } else if (_eggRarity == 6) {
      rarityBracket = [0, 100000, 350000, 650000, 950000, 999000];
    } else {
      rarityBracket = [0, 0, 0, 0, 800000, 998000];
    }
    return rarityBracket;
  }

  // Returns a random species ID of the given rarity.
  function getRarityBasedSpeciesId(uint256 _eggId, uint256 _rarity)
    internal
    view
    returns(uint256)
  {
    require(_rarity > 0 && _rarity <= 7);
    uint256 speciesCount = speciesCountByRarity[_rarity];
    require(speciesCount > 0);
    // Generates a random number between 1 and the total number
    // "speciesCount" of Kryptomon species with the given rarity. Then
    // crawls through the Kryptomon species list until we've reached
    // the nth species of the given rarity and return it.
    uint256 speciesNum = uniformRandom(_eggId, speciesCount);
    require(speciesNum > 0 && speciesNum <= speciesCount);
    uint256 counter = 0;
    for (uint256 idx = 0; idx < speciesList.length; idx++) {
      if (counter == speciesNum
        && speciesList[idx].rarity == _rarity
        && !speciesList[idx].isExtinct
      ) {
        return idx;
      } else if (speciesList[idx].rarity == _rarity
        && !speciesList[idx].isExtinct) {
          counter += 1;
      }
    }
    return 1;
  }

  // Determines the genetic value of the resulting Kryptomon. Produces
  // a value between 0 and 200. There is a 50% chance that the
  // resulting Kryptomon will have the same genetic value as its
  // genetic predisposition.
  function determineGeneticValue(
    uint256 _geneticPredisposition,
    uint256 _eggId
  ) private
    view
    returns(uint256)
  {
    uint256 genes = randomGenes(_eggId) % 400;
    if (genes <= 200) {
      return genes;
    } else {
      return _geneticPredisposition;
    }
  }

  // Produces a random genetic code for use in gen0 eggs.
  function randomGenes(uint256 _eggId) internal view returns(uint256) {
    return random(_eggId.add(1000000)) % 400;
  }

  // Function that enforces generation penalty using the formula
  // y = 1x + (1 + .05)^x
  function enforceGenerationPenalty(
    uint256 initialTimestamp,
    uint256 basePeriod,
    uint256 generation
  )
    internal
    pure
    returns(uint256)
  {
    return (
      initialTimestamp
      .add(
        basePeriod
        .mul(generation)
      )
      .add(
        (
          (basePeriod
            .mul(100)
            .add(5)
          ) ** generation
        ).div(100 ** generation)
      )
    );
  }

  // External function called by users to evolve their Kryptomon.
  // Maintains the same Kryptomon struct and just changes the
  // Kryptomon's speciesId. Note: timeToEvolve is in seconds.
  function evolve(uint256 _kryptomonId) external {
    require(kryptomonIndexToOwner[_kryptomonId] == msg.sender);
    Kryptomon memory kryptomon = kryptomonList[_kryptomonId];
    Species memory species = speciesList[kryptomon.speciesId];
    require(species.evolveToId != 0);
    uint256 evolutionTimestamp  = enforceGenerationPenalty(
      uint256(kryptomon.birthTimeStamp),
      species.timeToEvolve,
      kryptomon.generation
    );
    require(
      now >= uint256(kryptomon.birthTimeStamp).add(evolutionTimestamp)
    );
    kryptomonList[_kryptomonId].speciesId = species.evolveToId;
    kryptomonList[_kryptomonId].birthTimeStamp = uint32(now);
    KryptomonEvolved(msg.sender, _kryptomonId);
  }
  //// END Storage

  //// START Species Definitions

  // Event that's fired every time a species ID is added.
  event SpeciesIdAdded(uint256 speciesId);

  // Event that's fired every time a species is set to extinct.
  event SpeciesSetExtinct(uint256 speciesId);

  // Event that's fired every time a species is set to not extinct.
  event SpeciesSetNotExtinct(uint256 speciesId);

  function addSpecies(
    uint256 _attack,
    uint256 _defense,
    uint256 _specialAttack,
    uint256 _specialDefense,
    uint256 _hitPoints,
    uint256 _speed,
    uint256 _maxChildren,
    uint256 _breedingCooldown,
    uint256 _evolveToId,
    uint256 _timeToEvolve,
    uint256 _rarity
  ) external
    kryptoGodOnly
  {
    require(_attack <= 250);
    require (_defense <= 250);
    require (_specialAttack <= 250);
    require (_specialDefense <= 250);
    require (_hitPoints <= 250);
    require (_speed <= 250);
    require (_maxChildren <= 100);
    require (_breedingCooldown < 4294967295);
    require (_evolveToId <= 10000);
    require (_timeToEvolve <= 2147483646);
    require (_rarity > 0 && _rarity <= 7);

    speciesList.push(Species({
      attack: uint8(_attack),
      defense: uint8(_defense),
      specialAttack: uint8(_specialAttack),
      specialDefense: uint8(_specialDefense),
      hitPoints: uint8(_hitPoints),
      speed: uint8(_speed),
      maxChildren: uint8(_maxChildren),
      breedingCooldown: uint32(_breedingCooldown),
      evolveToId: uint16(_evolveToId),
      timeToEvolve: uint32(_timeToEvolve),
      rarity: uint8(_rarity),
      isExtinct: false
    }));

    speciesCountByRarity[_rarity]
      = speciesCountByRarity[_rarity].add(1);
    SpeciesIdAdded(speciesList.length.sub(1));
  }

  function setSpeciesExtinct(uint256 _speciesId)
    external
    kryptoGodOnly
  {
    require(_speciesId < speciesList.length);
    speciesList[_speciesId].isExtinct = true;
    speciesCountByRarity[speciesList[_speciesId].rarity]
      = speciesCountByRarity[speciesList[_speciesId].rarity].sub(1);
    SpeciesSetExtinct(_speciesId);
  }

  // This is a separate function from setSpeciesExtinct with internal
  // visibility to optimize gas cost.
  function setLegendarySpeciesExtinct(uint256 _speciesId) internal {
    require(_speciesId < speciesList.length);
    require(speciesList[_speciesId].rarity == 7);
    speciesList[_speciesId].isExtinct = true;
    speciesCountByRarity[7] = speciesCountByRarity[7].sub(1);
    SpeciesSetExtinct(_speciesId);
  }

  function setSpeciesNotExtinct(uint256 _speciesId)
    external
    kryptoGodOnly
  {
    require(_speciesId < speciesList.length);
    speciesList[_speciesId].isExtinct = false;
    speciesCountByRarity[speciesList[_speciesId].rarity]
      = speciesCountByRarity[speciesList[_speciesId].rarity].add(1);
    SpeciesSetNotExtinct(_speciesId);
  }

  //// END Species Definitions
}
