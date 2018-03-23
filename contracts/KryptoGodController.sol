pragma solidity ^0.4.11;

contract KryptoGodController {
  //// BEGIN KryptoGod definition
  // Address associated with the KryptoGod, ruler of all Kryptomon.
  address public kryptoGodAddress;

  // Modifier for functions that can only be executed by the
  // the KryptoGod.
  modifier kryptoGodOnly() {
    require(msg.sender == kryptoGodAddress);
    _;
  }

  event Debug(string messsage);
  
  // Allows the KryptoGod to reset the address associated with the
  // KryptoGod.
  function setNewKryptoGod(address _newKryptoGod)
    external
    kryptoGodOnly
  {
    require(_newKryptoGod != address(0));
    kryptoGodAddress = _newKryptoGod;
  }
  //// END KryptoGod definition

  //// BEGIN Contract freeze definitions
  // Various bools that allow the KryptoGod to temporarily freeze
  // various aspects of gameplay.
  bool public completeFreeze = false;
  bool public genZeroPaused = false;
  bool public hatchingPaused = false;
  bool public breedingPaused = false;

  function setCompleteFreeze(bool _condition) external kryptoGodOnly {
    completeFreeze = _condition;
  }

  function setGenZeroPaused(bool _condition) external kryptoGodOnly {
    genZeroPaused = _condition;
  }

  function setHatchingPaused(bool _condition) external kryptoGodOnly {
    hatchingPaused = _condition;
  }

  function setBreedingPaused(bool _condition) external kryptoGodOnly {
    breedingPaused = _condition;
  }

  modifier whenNotFrozen() {
    require(!completeFreeze);
    _;
  }

  modifier whenGenZeroNotPaused() {
    require(!completeFreeze);
    require(!genZeroPaused);
    _;
  }

  modifier whenHatchingNotPaused() {
    require(!completeFreeze);
    require(!hatchingPaused);
    _;
  }

  modifier whenBreedingNotPaused() {
    require(!completeFreeze);
    require(!breedingPaused);
    _;
  }
  //// END Contract freeze definitions
}
