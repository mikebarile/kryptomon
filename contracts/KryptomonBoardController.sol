pragma solidity ^0.4.11;

// Specific duties have been assigned to various members of the
// Kryptomon board. This distribution of power helps ensure the safety
// of funds stored in this contract and prevents any one address from
// being able to take complete control over the project. Several of
// these patterns were borrowed from Open Zeppelin.
contract KryptomonBoardController {
  /*** BEGIN Board member definitions ***/
  // Addresses associated with the various board roles.
  address public presidentAddress;
  address public managerAddress;
  address public treasurerAddress;

  // Modifier for functions that can only be executed by the
  // the Kryptomon president.
  modifier presidentOnly() {
    require(msg.sender == presidentAddress);
    _;
  }

  /// Modifier for functions that can only be executed by the
  // the Kryptomon manager.
  modifier managerOnly() {
    require(msg.sender == managerAddress);
    _;
  }

  // Modifier for functions that can only be executed by the
  // the Kryptomon treasurer.
  modifier treasurerOnly() {
    require(msg.sender == treasurerAddress);
    _;
  }

  modifier boardMemberOnly() {
    require(
      msg.sender == presidentAddress ||
      msg.sender == managerAddress ||
      msg.sender == treasurerAddress
    );
    _;
  }

  // Allows the president to reset the address associated with the
  // president.
  function setNewPresident(address _newPresident)
    external
    presidentOnly
  {
    require(_newPresident != address(0));
    presidentAddress = presidentAddress;
  }

  // Allows the president to reset the address associated with the
  // manager.
  function setNewManager(address _newManager) external presidentOnly {
    require(_newManager != address(0));
    managerAddress = _newManager;
  }

  // Allows the president to reset the address associated with the
  // treasurer.
  function setNewTreasurer(address _newTreasurer)
      external presidentOnly {
    require(_newTreasurer != address(0));
    treasurerAddress = _newTreasurer;
  }
  /*** END Board member definitions ***/

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
