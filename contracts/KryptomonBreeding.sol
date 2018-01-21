pragma solidity ^0.4.11;
import './KryptomonEggTokenization.sol';

contract KryptomonBreeding is KryptomonEggTokenization {
  event KryptomonBred(
    uint256 _sireIndex,
    uint256 _matronIndex,
    address _owner
  );

  function breedKryptomon(uint256 _sireIndex, uint256 _matronIndex)
    external
  {
    require(ownerOf(_sireIndex) == msg.sender);
    require(ownerOf(_matronIndex) == msg.sender);
    uint256 eggIndex = createEgg(_sireIndex, _matronIndex);
  }

  function createEgg(uint256 _sireIndex, uint256 _matronIndex)
    private
    return(uint256)
  {

  }
}
