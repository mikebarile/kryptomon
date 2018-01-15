pragma solidity ^0.4.11;
import './KryptomonBase.sol';

contract GenZeroEggSales is KryptomonBase {

  // The total number of "gen 0" eggs remaining. These eggs can only
  // be hatched by the COO, have no parents or genetics, and hatch
  // into a random Kryptomon. These eggs are stored as an int so that
  // the Kryptomon creators don't ahve to pay a crazy gas cost to
  // initialize thousands of identical eggs. These eggs are effecitvely
  // "owned" by the COO and are non transferable.
  uint32 numGenZeroEggsRemaining = 100000;

  // Public function called by users to purchase a gen0 egg.
  function buyGenZeroEggs(uint numEggs) internal {}

  // Function called when a user successfully purchases a gen0 egg
  // from the COO.
  function hatchGenZeroEgg(address _toAddress) internal {
    require(numGenZeroEggsRemaining > 0);
    uint256 rand = random() % 1000000 + 1;

  }
}
