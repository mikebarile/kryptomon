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

  // Returns all data associated with an egg.
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

  // Returns all data associated with a Kryptomon.
  function getKryptomon(uint256 _kryptomonId)
    external
    view
    returns (
      uint256 speciesId,
      uint256 geneticValue,
      uint256 generation,
      uint256 birthTimeStamp,
      uint256 breedingCooldown,
      uint256 numChildren
    )
  {
    Kryptomon storage kryptomon = kryptomonList[_kryptomonId];
    return (
      uint256(kryptomon.speciesId),
      uint256(kryptomon.geneticValue),
      uint256(kryptomon.generation),
      uint256(kryptomon.birthTimeStamp),
      uint256(kryptomon.breedingCooldown),
      uint256(kryptomon.numChildren)
    );
  }
}
