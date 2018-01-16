pragma solidity ^0.4.11;
import './Kryptomon.sol';

contract GenZeroEggSales is KryptomonBase {
  // The total number of "gen 0" eggs remaining. These eggs have no
  // parents or genetics, and hatch into a Kryptomon. These eggs are
  // stored as an int so that the Kryptomon creators don't have to pay
  // a crazy gas cost to initialize thousands of identical eggs. These
  // eggs are effecitvely owned by the Kryptomon board and are non
  // transferable.
  uint genZeroEggs = 1000000;

  // A reserve of gen0 eggs that is controlled by the Manager. For use
  // with beta testing, bug bounties, etc.
  uint genZeroEggsReserve = 50000;

  // The price per gen0 egg. Can be reassigned by the Manager based on
  // ether <-> fiat price movements.
  uint genZeroEggPrice = 10 finney;

  // Event triggered when a gen zero egg is successfully hatched.
  event genZeroEggHatched(address buyerId);

  // Function that allows the Manager to change the gen0 egg price.
  function setGenZeroEggPrice(uint price) external managerOnly {
    genZeroEggPrice = price;
  }

  // Function that allows the Manager to distribute gen0 reserve eggs.
  // To be used for beta testing, bug bounty rewards, etc.
  function assignReserveEggs(address _sendTo, uint _numEggs)
    external
    managerOnly
  {
    require(_numEggs <= genZeroEggsReserve);
    genZeroEggsReserve -= _numEggs;
    for(uint i = 0; i < _numEggs; i++) {
      uint32 kryptomonId = createGenZeroKryptomon(i);
      kryptomonIndexToOwner[kryptomonId] = _sendTo;
      genZeroEggHatched(_sendTo);
      kryptomonAssigned(_sendTo, kryptomonId);
    }
  }

  // The function Kryptomon players call to purchase gen0 eggs.
  // Automatically hatches a kryptomon and sets ownership to the
  // purchaser.
  function buyGenZeroEggs(uint _numEggs)
    external
    whenGenZeroNotPaused
    payable
  {
    require(_numEggs <= genZeroEggs);
    uint totalCost = _numEggs * genZeroEggPrice;
    require(msg.value >= totalCost);
    genZeroEggs -= _numEggs;
    for(uint i = 0; i < _numEggs; i++) {
      uint32 kryptomonId = createGenZeroKryptomon(i);
      kryptomonIndexToOwner[kryptomonId] = msg.sender;
      genZeroEggHatched(msg.sender);
      kryptomonAssigned(msg.sender, kryptomonId);
    }
  }

  // Function used to create a gen0 kryptomon. Employs similar logic to
  // createKryptomon except that there aren't any genetic effects.
  function createGenZeroKryptomon(uint id) internal returns(uint32) {
    uint16 speciesId = determineGenZeroSpeciesId(id);
    uint8 geneticValue = determineGenZeroGeneticValue(id);
    kryptomonList.push(Kryptomon({
      speciesId: speciesId,
      geneticValue: geneticValue,
      generation: 0,
      birthTimeStamp: uint32(now),
      breedingCooldown: uint32(now),
      numChildren: 0
    }));
    return uint32(kryptomonList.length - 1);
  }

  // Function that pseudo-randomly determines a species ID for a new
  // gen 0 Kryptomon.
  // TODO(mikebarile): Create lookup table and assign Kryptomon once
  // we've finished designing them.
  function determineGenZeroSpeciesId(uint id)
    private
    view
    returns(uint16)
  {
    uint256 randSpecies = randomSpecies(id);
    if (randSpecies <= 400000) {
      // Set to a common creature (40% probability).

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

  // Determines the genetic value for a new gen0 Kryptomon.
  function determineGenZeroGeneticValue(uint id)
    internal
    view
    returns(uint8)
  {
    return uint8(random(id + 1000000) % 200);
  }
}
