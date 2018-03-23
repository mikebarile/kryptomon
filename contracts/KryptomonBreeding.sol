pragma solidity ^0.4.11;
import './KryptomonEggTokenization.sol';
import '../libraries/SafeMath.sol';
import '../libraries/Util.sol';

contract KryptomonBreeding is KryptomonEggTokenization {
  using SafeMath for uint256;

  event KryptomonBred(
    uint256 sireId,
    uint256 matronId,
    address ownerAddress
  );

  function breedKryptomon(uint256 _sireIndex, uint256 _matronIndex)
    external
    whenBreedingNotPaused
  {
    require(_sireIndex < totalSupply());
    require(_matronIndex < totalSupply());
    require(ownerOf(_sireIndex) == msg.sender);
    require(ownerOf(_matronIndex) == msg.sender);
    Kryptomon memory sire = kryptomonList[_sireIndex];
    Kryptomon memory matron = kryptomonList[_matronIndex];
    // Only the matron needs checks for max children.
    require(matron.numChildren < speciesList[matron.speciesId].maxChildren);
    require(
      enforceGenerationPenalty(
        sire.lastBred,
        speciesList[sire.speciesId].breedingCooldown,
        sire.generation
      ) <= now
    );
    require(
      enforceGenerationPenalty(
        matron.lastBred,
        speciesList[matron.speciesId].breedingCooldown,
        matron.generation
      ) <= now
    );
    uint256 eggIndex = createEgg(_sireIndex, _matronIndex);
    KryptomonBred(_sireIndex, _matronIndex, msg.sender);
    kryptomonList[_matronIndex].numChildren += 1;
    kryptomonList[_sireIndex].lastBred = uint32(now);
    kryptomonList[_matronIndex].lastBred = uint32(now);
    eggIndexToOwner[eggIndex] = msg.sender;
    totalEggs = totalEggs.add(1);
    EggAssigned(msg.sender, eggIndex);
  }

  function createEgg(uint256 _sireIndex, uint256 _matronIndex)
    private
    returns(uint256)
  {
    Kryptomon memory sire = kryptomonList[_sireIndex];
    Kryptomon memory matron = kryptomonList[_matronIndex];

    uint256 geneticPredisposition
      = uint256(sire.geneticValue + matron.geneticValue).div(2);

    uint256 generation
      = Util.max(sire.generation, matron.generation) + 1;

    uint256 rarity
      = Util.min(speciesList[sire.speciesId].rarity,
                 speciesList[matron.speciesId].rarity);

    eggList.push(
      Egg({
        geneticPredisposition: uint8(geneticPredisposition),
        generation: uint8(generation),
        rarity: uint8(rarity)
      })
    );
    return uint256(eggList.length.sub(1));
  }
}
