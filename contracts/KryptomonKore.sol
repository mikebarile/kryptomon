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

  // TODO(mikebarile): Write this function.
  // Function that calculates a Kryptomon's actual stats which are
  // calculated as: base stats +/- geneticValue - generation.
  /* function calculateStats(uint256 _kryptomonId)
    internal
    view
    returns (
      uint256 attack,
      uint256 defense,
      uint256 specialAttack,
      uint256 specialDefense,
      uint256 hitPoints,
      uint256 speed
    )
  {

  } */

  // TODO(mikebarile): Write this function.
  // Function that calculates the time at which a Kryptomon will be
  // ready to evolve.
  /* function calculateEvolutionTime(uint256 _kryptomonId)
    internal
    view
    returns(uint256)
  {

  } */

  // TODO(mikebarile): Write this function. 
  // Function that calculates the time at which a Kryptomon will be
  // ready to breed again. Returns 0 if the Kryptomon will never breed
  // again!
  /* function calculateEvolutionTime(uint256 _kryptomonId)
    internal
    view
    returns(uint256)
  {

  } */
}
