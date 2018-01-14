pragma solidity ^0.4.11;
import './KryptomonAccessControl.sol';

contract KryptomonBase is KryptomonAccessControl {
  /*** Events ***/

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

  // The main Egg struct.
  struct Egg {
    // The generation of the Kryptomon that will be hatched from this
    // egg. The generation is calculated as the max of the two parents'
    // generations (e.g. if parent1 is gen 1 and parent 2 is gen 9,
    // the child will be gen 9 as well).
    uint16 generation;

    // The id associated with the egg's matron.
    uint32 matronId;

    // The id associated with the egg's sire.
    uint32 sireId;
  }

  // The main Kryptomon struct.
  struct Kryptomon {
    // The id associated with the Kryptomon's species. All metadata
    // associated with the Kryptomon's species is stored in a separate
    // lookup table.
    uint16 speciesId;

    // A value between 0 and 200 that modifies the Kryptomon's stats.
    // A value of 0 results in the maximum genetic base stat decrease
    // while a value of 200 results in the maximum genetic base stat
    // increase. Children inherit the average of their parents' dna.
    uint8 dna;

    // The Kryptomon's generation. Higher generation Kryptomon have
    // increasingly degredated base stats.
    uint16 generation;

    // Initiated when the Kryptomon is hatched from an egg. Used by
    // various
    uint32 birthTimeStamp;

    // An index associated with the Kryptomon's 'breedability'. Highly
    // breedable Kryptomon can lay eggs much faster than Kryptomon
    // with a poor breedability index.
    uint16 breedingIndex;

    // The minimum timestamp after which this Kryptomon can engage in
    // breeding activities again.
    uint32 breedingCooldown;

    // The number of eggs that this kryptomon has produced. Kryptomon
    // can produce at most 4 eggs over their lifetime.
    uint16 numChildren;
  }
}
