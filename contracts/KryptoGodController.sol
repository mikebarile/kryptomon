pragma solidity ^0.4.11;

contract KryptoGodController {
  /*** BEGIN KryptoGod definition ***/
  // Address associated with the KryptoGod, ruler of all Kryptomon.
  address public kryptoGodAddress;

  // Modifier for functions that can only be executed by the
  // the kryptoGod.
  modifier kryptoGodOnly() {
    require(msg.sender == kryptoGodAddress);
    _;
  }

  // Allows the president to reset the address associated with the
  // president.
  function setNewKryptoGod(address _newKryptoGod)
    external
    kryptoGodOnly
  {
    require(_newKryptoGod != address(0));
    kryptoGodAddress = _newKryptoGod;
  }
  /*** END KryptoGod definition ***/

  /*** BEGIN Contract freeze definitions ***/
  // Various bools that allow board members to temporarily pause
  // various aspects of gameplay.
  bool public completeFreeze =  false;
  bool public genZeroPaused = false;
  bool public hatchingPaused = false;
  bool public marketplacePaused = false;
  bool public breedingPaused = false;

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

  modifier whenMarketplaceNotPaused() {
    require(!completeFreeze);
    require(!marketplacePaused);
    _;
  }

  modifier whenBreedingNotPaused() {
    require(!completeFreeze);
    require(!breedingPaused);
    _;
  }
  /*** END Contract freeze definitions ***/
}
