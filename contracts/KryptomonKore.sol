pragma solidity ^0.4.11;
import './KryptomonBreeding.sol';

// The bottom of the Kryptomon inheritance ladder. This is the contract
// that's used to initialize Kryptomon! The full inheritance ladder
// includes:
// 1. KryptoGodController
// 2. KryptomonDefinitions
// 3. KryptomonGenZeroEggSales
// 4. KryptomonTokenization
// 5. KryptomonEggTokenization
// 6. KryptomonBreeding
// 7. KryptomonKore
contract KryptomonKore is KryptomonBreeding {
  function KryptomonKore() public {
    intializeSpecies();
    kryptoGodAddress = msg.sender;
    completeFreeze = true;
  }

  // Send all the ethers to the KryptoGod.
  function withdrawBalance() external kryptoGodOnly {
    kryptoGodAddress.transfer(this.balance);
  }

  // Tips are very much appreciated :D
  function() external payable {}

  function getEgg(uint256 _eggId)
    external
    view
    returns (
      uint256 generation,
      uint256 geneticPredisposition,
      uint256 matronSpeciesId,
      uint256 sireSpeciesId
    )
  {
    Egg storage egg = eggList[_eggId];
    return (
      uint256(egg.generation),
      uint256(egg.geneticPredisposition),
      uint256(egg.matronSpeciesId),
      uint256(egg.sireSpeciesId)
    );
  }

  // TODO(mikebarile): Write a "getKryptomon" function. Will require
  // some thought on what we'll actually want on the front end (for
  // example, we'll probably want "evolveTime" rather than
  // "timeToEvolve").
  /* function getKryptomon(uint256 _kryptomonId)
    external
    view
    returns (

    )
  {
  
  } */

}
