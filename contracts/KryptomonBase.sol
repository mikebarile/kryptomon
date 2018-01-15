pragma solidity ^0.4.11;
import './KryptomonAccessControl.sol';

contract KryptomonBase is KryptomonAccessControl {
  /*** START Event Definitions ***/
  // The KryptomonHatch event is fired whenever a kryptomon egg is
  // hatched. This occurs whenever an egg owner calls the "hatch"
  // method resulting in a new Kryptomon.
  event KryptomonHatch();

  // The EggTransfer event is defined in current draft of ERC721. Every
  // time egg ownership is assigned, including when an egg is created.
  event EggTransfer();

  // The EggTransfer event is defined in current draft of ERC721. Every
  // time kryptomon ownership is assigned, including birth.
  event KryptomonTransfer();
  /*** END Event Definitions ***/

  /*** START Structs Definitions ***/
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
    uint8 genes;

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
    uint8 genes;

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

    // The number of eggs that this kryptomon has produced. Different
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
    uint8 evolveToId;

    // Base amount time it takes for this Kryptomon to evolve. Actual
    // evolution time is also based on Kryptomon's generation.
    uint32 timeToEvolve;
  }
  /*** END Struct Definitions ***/

  /*** START Storage ***/
  // An array containing the egg struct for all eggs in existence. Each
  // egg's ID is actually an index in this array.
  Egg[] eggList;

  // An array containing the Kryptomon struct for all Kryptomon in
  // existence. The ID of each Kryptomon is actually an index in this
  // array. Note that the ID 0 is the Kryptogod, the creator of all
  // Kryptomon who produced all gen1 Kryptomon through a divine act of
  // parthogenesis. Kryptomon ID 0 should be considered invalid.
  Kryptomon[] kryptomonList;

  // A mapping of kryptomon IDs to the address that owns them. All
  // kryptomon have a valid owner address.
  mapping (uint32 => address) public kryptomonIndexToOwner;

  // A mapping of egg IDs to the address that owns them. All eggs have
  // have a valid owner address.
  mapping (uint32 => address) public eggIndexToOwner;

  // Function used to return pseudo-random numbers. Probably needs to
  // be reexamined to ensure that egg hatching can't be attacked by
  // miners.
  function random() internal view returns(uint256) {
    return uint256(keccak256(now, msg.gas, msg.sender, block.timestamp));
  }

  function createKryptomon() internal returns(uint32) {
    uint256 rand = random() % 1000000 + 1;

  }

  // function hatchEgg(uint32 _eggId) external {}

  // function evolve(uint32 _kryptomonId) external {}

  // function transferEgg(uint32 eggId, address _toAddress) internal {}

  // function transferKryptomon(uint32 kryptomonId, address _toAddress) internal {}

  /*** END Storage ***/

  /*** START Species Definitions ***/

  Species[] speciesList;

  /*** END Species Definitions ***/

}
