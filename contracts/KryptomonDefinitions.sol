pragma solidity ^0.4.11;
import './KryptoGodController.sol';

contract KryptomonDefinitions is KryptoGodController {
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
    uint16 generation;

    // The average of the egg's parents' gene attributes. The Kryptomon
    // that hatches from this egg is slightly more likely to have this
    // as their genetic value.
    uint8 geneticPredisposition;

    // The species ID associated with the egg's matron. The egg has a
    // slightly larger chance of hatching into this species.
    uint16 matronSpeciesId;

    // The species ID associated with the egg's sire. The egg has a
    // slightly larger chance of hatching into this species.
    uint16 sireSpeciesId;
  }

  // The main Kryptomon struct.
  struct Kryptomon {
    // The id associated with the Kryptomon's species. All metadata
    // associated with the Kryptomon's species is stored in a separate
    // lookup table.
    uint16 speciesId;

    // A value between 0 and 200 that modifies the Kryptomon's stats.
    // A value of 0 results in a 10% decrease in base stats while a
    // value of 200 results in a 10% increase. Children are
    // predisposed to have similar genes as their parents but there is
    // an element of randomness in gene assignment.
    uint8 geneticValue;

    // The Kryptomon's generation. Higher generation Kryptomon have
    // increasingly degredated base stats and take exponentially more
    // time to evolve.
    uint16 generation;

    // Initiated when the Kryptomon is hatched from an egg. Used by
    // various
    uint32 birthTimeStamp;

    // The minimum timestamp after which this Kryptomon can engage in
    // breeding activities again. Is based on a Kryptomon's species.
    uint32 breedingCooldown;

    // The number of eggs that this Kryptomon has produced. Different
    // species of Kryptomon have different restrictions on how many
    // children they can have.
    uint16 numChildren;
  }

  struct Species {
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

    // The amount of time a Kryptomon must wait before it can breed
    // again.
    uint32 breedingCooldown;

    // The ID for the species this type of Kryptomon will evolve into.
    // A non-zero value indicates this type of Kryptomon can evolve.
    uint16 evolveToId;

    // Base amount time it takes for this Kryptomon to evolve. Actual
    // evolution time is also based on Kryptomon's generation.
    uint32 timeToEvolve;

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

  // Maps all kryptomon IDs to an owner. All Kryptomon should have an
  // owner at all times.
  mapping (uint256 => address) public kryptomonIndexToOwner;

  // Maps all egg IDs to an owner. All eggs should have an owner at all
  // times.
  mapping (uint256 => address) public eggIndexToOwner;

  // Maps each user's address to the total number of Kryptomon they
  // own. We use this mapping to comply with ERC721.
  mapping (address => uint256) public ownerToTotalKryptomon;

  // Maps each Kryptomon to an address that has been approved to call
  // the "transferFrom" method. Used to comply with ERC721.
  mapping (uint256 => address) public kryptomonIndexToApproved;

  // Maps each user's address to the total number of Kryptomon eggs
  // they own. We use this mapping to comply loosely with ERC721.
  mapping (address => uint256) public ownerToTotalEggs;

  // Maps each Kryptomon egg to an address that has been approved to
  // call the "transferFrom" method. Used to comply loosely with ERC721.
  mapping (uint256 => address) public eggIndexToApproved;

  // Function used to return a pseudo-random int used to identy a
  // new Kryptomon's species.
  function random(uint256 id) internal view returns(uint256) {
    return uint256(keccak256(
      id,
      msg.gas,
      msg.sender,
      block.timestamp
    ));
  }

  // Function used to return a pseudo-random int between 1 and
  // 1,000,000 for use in generating a species ID.
  function randomSpecies(uint256 id) internal view returns(uint256) {
    return random(id + 1000000) % 1000000 + 1;
  }

  // Function called by Kryptomon users to hatch their eggs. Destroys
  // the egg, removes the egg ID from the ownership mapping, creates
  // a new Kryptomon, and assigns ownership of the new Kryptomon to
  // the egg's owner.
  function hatchEgg(uint256 _eggId) external {
    require(eggIndexToOwner[_eggId] == msg.sender);
    uint256 kryptomonId = createKryptomon(_eggId);
    delete eggList[_eggId];
    delete eggIndexToOwner[_eggId];
    kryptomonIndexToOwner[kryptomonId] = msg.sender;
    ownerToTotalEggs[msg.sender] -= 1;
    ownerToTotalKryptomon[msg.sender] += 1;
    EggHatched(msg.sender, _eggId);
    KryptomonAssigned(msg.sender, kryptomonId);
  }

  // Creates a new Kryptomon and returns its id. The new Kryptomon will
  // have a higher probability of having one of its parents' species
  // and a higher probability of inheriting the average of their
  // gene value.
  function createKryptomon(uint256 _eggId) internal returns(uint256) {
    Egg memory egg = eggList[_eggId];
    uint256 speciesId = determineSpeciesId(
      egg.matronSpeciesId,
      egg.sireSpeciesId,
      _eggId
    );
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
        breedingCooldown: uint32(now),
        numChildren: 0
      })
    );
    return uint256(kryptomonList.length - 1);
  }

  // TODO(mikebarile): Create lookup tables for the different Kryptomon
  // rarities and finish this function.
  // Function used to determine a new Kryptomon's species ID. There is
  // a 2% chance that the resulting Kryptomon will inherit one of its
  // parents' species.
  function determineSpeciesId(
    uint256 _matronSpeciesId,
    uint256 _sireSpeciesId,
    uint256 _eggId
  ) private
    view
    returns(uint256)
  {
    uint256 randSpecies = randomSpecies(_eggId);
    if (randSpecies <= 1000) {
      // Set species ID to matron's species ID.
      return _matronSpeciesId;
    } else if (randSpecies > 10000 && randSpecies <= 20000) {
      // Set species ID to sire's species ID.
      return _sireSpeciesId;
    } else if (randSpecies > 20000 && randSpecies <= 400000) {
      // Set to a common creature (38% probability).

    } else if (randSpecies > 400000 && randSpecies <= 650000) {
      // Set to an uncommon creature (25% probability).

    } else if (randSpecies > 650000 && randSpecies <= 850000) {
      // Set to a rare creature (20% probability).

    } else if (randSpecies > 850000 && randSpecies <= 950000) {
      // Set to a super rare creature (10% probability).

    } else if (randSpecies > 950000 && randSpecies <= 998000) {
      // Set to an ultra rare creature (~5% probability).

    } else if (randSpecies > 998000 && randSpecies <= 999995) {
      // Set to a mega rare creature (~0.1% probability).

    } else if (randSpecies > 999995 && randSpecies <= 1000000) {
      // Set to a legendary creature (0.0005% probability).

    }
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
    return random(_eggId + 1000000) % 400;
  }

  // External function called by users to evolve their Kryptomon.
  // Maintains the same Kryptomon struct and just changes the
  // Kryptomon's speciesId.
  // TODO(mikebarile): Update the logic to incorporate a penalty for
  // generation. We should consider whether "evolutionDate" should just
  // be stored in the species struct.
  function evolve(uint256 _kryptomonId) external {
    require(kryptomonIndexToOwner[_kryptomonId] == msg.sender);
    Kryptomon memory kryptomon = kryptomonList[_kryptomonId];
    Species memory species = speciesList[kryptomon.speciesId];
    require(now >= kryptomon.birthTimeStamp + species.timeToEvolve);
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

  function addSpeciesId(
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
    require (_breedingCooldown <= 2147483646);
    require (_evolveToId <= 10000 && speciesList[_evolveToId].rarity != 0);
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

    SpeciesIdAdded(speciesList.length - 1);
  }

  function setSpeciesExtinct(uint256 _speciesId)
    external
    kryptoGodOnly
  {
    require(_speciesId < speciesList.length);
    speciesList[_speciesId].isExtinct = true;

    SpeciesSetExtinct(_speciesId);
  }

  function setSpeciesNotExtinct(uint256 _speciesId)
    external
    kryptoGodOnly
  {
    require(_speciesId < speciesList.length);
    speciesList[_speciesId].isExtinct = false;

    SpeciesSetNotExtinct(_speciesId);
  }

  // TODO(mikebarile): Ensure that "extinct" kryptomon can't be creaed.

  // Function that intializes the species mapping. This function is
  // only called when KryptomonKore is being initialized.
  // TODO(mikebarile): Add all the Kryptomon!
  function intializeSpecies() internal {
    // Example Kryptomon species
    speciesList.push(Species({
      attack: 100,
      defense: 100,
      specialAttack: 100,
      specialDefense: 100,
      hitPoints: 100,
      speed: 100,
      maxChildren: 2,
      breedingCooldown: 20000,
      evolveToId: 2,
      timeToEvolve: 10000000,
      rarity: 1,
      isExtinct: false
    }));
  }

  //// END Species Definitions
}
