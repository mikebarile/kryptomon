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
    require(_sireIndex < totalSupply());
    require(_matronIndex < totalSupply());
    require(ownerOf(_sireIndex) == msg.sender);
    require(ownerOf(_matronIndex) == msg.sender);
    Kryptomon memory sire = kryptomonList[_sireIndex];
    Kryptomon memory matron = kryptomonList[_matronIndex];
    require(sire.numChildren < speciesList[sire.speciesId].maxChildren);
    require(matron.numChildren < speciesList[matron.speciesId].maxChildren);
    require(sire.breedingCooldown <= now);
    require(matron.breedingCooldown <= now);
    uint256 eggIndex = createEgg(_sireIndex, _matronIndex);
    KryptomonBred(_sireIndex, _matronIndex, msg.sender);
    kryptomonList[_sireIndex].numChildren += 1;
    kryptomonList[_matronIndex].numChildren += 1;
    kryptomonList[_sireIndex].breedingCooldown =
      uint32(now + speciesList[sire.speciesId].breedingCooldown);
    kryptomonList[_matronIndex].breedingCooldown =
      uint32(now + speciesList[matron.speciesId].breedingCooldown);
    ownerToTotalEggs[msg.sender] += 1;
    eggIndexToOwner[eggIndex] = msg.sender;
    EggAssigned(msg.sender, eggIndex);
  }

  function createEgg(uint256 _sireIndex, uint256 _matronIndex)
    private
    returns(uint256)
  {
    Kryptomon memory sire = kryptomonList[_sireIndex];
    Kryptomon memory matron = kryptomonList[_matronIndex];
    uint256 geneticPredisposition;
    uint256 generation;
    if (sire.geneticValue + matron.geneticValue == 0) {
      geneticPredisposition = 0;
    } else {
      geneticPredisposition =
        (sire.geneticValue + matron.geneticValue) / 2;
    }
    if (sire.generation > matron.generation) {
      generation = sire.generation + 1;
    } else {
      generation = matron.generation + 1;
    }
    eggList.push(
      Egg({
        geneticPredisposition: uint8(geneticPredisposition),
        generation: uint16(generation),
        matronSpeciesId: matron.speciesId,
        sireSpeciesId: sire.speciesId
      })
    );
    return uint256(eggList.length - 1);
  }
}
