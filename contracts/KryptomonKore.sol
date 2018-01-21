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
}
