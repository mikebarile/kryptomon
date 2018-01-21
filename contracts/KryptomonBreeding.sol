pragma solidity ^0.4.11;
import './KryptomonEggTokenization.sol';

contract KryptomonBreeding is KryptomonEggTokenization {
  function breedKryptomon(uint256 sireIndex, uint256 matronIndx)
    external
  {
    require(ownerOf(sireIndex) == msg.sender);
    require(ownerOf(matronIndx) == msg.sender);
  }
}
