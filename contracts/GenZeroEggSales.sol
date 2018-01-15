pragma solidity ^0.4.11;
import './KryptomonBase.sol';

contract GenZeroEggSales is KryptomonBase {

  // The total number of "gen 0" eggs remaining. These eggs can only
  // be hatched by the COO, have no parents or genetics, and hatch
  // into a random Kryptomon. These eggs are stored as an int so that
  // the Kryptomon creators don't ahve to pay a crazy gas cost to
  // initialize thousands of identical eggs. These eggs are effecitvely
  // "owned" by the COO and are non transferable.
  uint numGenZeroEggsRemaining = 100000;

  uint genZeroEggPrice = 10 finney;

  // Function that allows the COO to change the gen0 egg price.
  function setGenZeroEggPrice(uint price) external onlyCOO {
    genZeroEggPrice = price;
  }

  // The function users call to purchase gen0 eggs. Automatically
  // hatches a kryptomon and sets ownership to the purchaser.
  function buyGenZeroEggs(uint _numEggs) external whenNotPaused payable {
    require(_numEggs <= numGenZeroEggsRemaining);
    uint totalCost = _numEggs * genZeroEggPrice;
    require(msg.value < totalCost);
    numGenZeroEggsRemaining -= _numEggs;
    for(uint i = 0; i < _numEggs; i++) {
      uint32 kryptomonId = createKryptomon();
      kryptomonIndexToOwner[kryptomonId] = msg.sender;
    }
  }

  // Function called when a user successfully purchases a gen0 egg
  // from the COO.
  function hatchGenZeroEgg(address _toAddress) internal {
    require(numGenZeroEggsRemaining > 0);
  }
}
