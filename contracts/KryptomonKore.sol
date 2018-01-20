pragma solidity ^0.4.11;
import './KryptomonMarketplace.sol';

// The bottom of the Kryptomon inheritance ladder. This is the contract
// that's used to initialize Kryptomon! The full inheritance ladder
// includes:
// 1. KryptomonBoardController
// 2. KryptomonKore
// 3. KryptomonGenZeroEggSales
// 4. KryptomonTokenization
// 5. KryptomonBreeding
// 6. KryptomonMarketplace
// 7. KryptomonInit
contract KryptomonKore is KryptomonMarketplace {
  function KryptomonKore() public {
    intializeSpecies();
    presidentAddress = msg.sender;
    treasurerAddress = msg.sender;
    managerAddress = msg.sender;
  }
}
