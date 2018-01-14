pragma solidity ^0.4.11;
import './KryptomonAccessControl.sol';

contract KryptomonBase is KryptomonAccessControl {
  /*** Events ***/

  // The KryptomonHatch event is fired whenever a kryptomon egg is hatched.
  // This occurs whenever an egg owner calls the "hatch" method resulting in a
  // new Kryptomon.
  event KryptomonHatch();

  // The EggTransfer event is defined in current draft of ERC721. Every
  // time egg ownership is assigned.
  event EggTransfer();

  // The EggTransfer event is defined in current draft of ERC721. Every
  // time kryptomon ownership is assigned, including birth.
  event KryptomonTransfer();

  // The main Egg struct.
  struct Egg {
    //
    uint16 generation;

    //
    uint32 matronId;

    //
    uint32 sireId;
  }

  // The main Kryptomon struct.
  struct Kryptomon {
    //
    uint16 species;

    //
    uint256 genes;

    //
    uint16 generation;

    //
    uint32 id;

    // Set to the index in the cooldown array (see below) that represents
    // the current cooldown duration for this Kitty. This starts at zero
    // for gen0 cats, and is initialized to floor(generation/2) for others.
    // Incremented by one for each successful breeding action, regardless
    // of whether this cat is acting as matron or sire.
    uint16 cooldownIndex;

    // The minimum timestamp after which this cat can engage in breeding
    // activities again. This same timestamp is used for the pregnancy
    // timer (for matrons) as well as the siring cooldown.
    uint64 cooldownEndBlock;

    //
    uint16 level;

    //
    uint64 levelUpBlock;
  }
}
