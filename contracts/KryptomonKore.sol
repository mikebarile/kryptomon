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
    kryptoGodAddress = msg.sender;
    completeFreeze = true;
    totalEggs = 0;
    totalGenZeroEggs = unassignedGenZeroEggs.add(genZeroEggsReserve);

    speciesList.push(Species({
      attack: uint8(250),
      defense: uint8(250),
      specialAttack: uint8(250),
      specialDefense: uint8(250),
      hitPoints: uint8(250),
      speed: uint8(250),
      maxChildren: uint8(10),
      breedingCooldown: uint32(0),
      evolveToId: uint16(0),
      timeToEvolve: uint32(0),
      rarity: uint8(7),
      isExtinct: false
    }));
    kryptomonList.push(
      Kryptomon({
        speciesId: uint16(0),
        geneticValue: uint8(100),
        generation: 0,
        birthTimeStamp: uint32(now),
        lastBred: uint32(now),
        numChildren: 0
      })
    );
    kryptomonIndexToOwner[0] = msg.sender;
    KryptomonAssigned(msg.sender, 0);
  }

  // If this field is set, the Kryptomon contract address has been
  // migrated to this address.
  address public newContractAddress;

  function setNewContractAddress(address _newContractAddress)
    external
    kryptoGodOnly
  {
    newContractAddress = _newContractAddress;
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
      uint256 rarity
    )
  {
    Egg memory egg = eggList[_eggId];
    return (
      uint256(egg.generation),
      uint256(egg.geneticPredisposition),
      uint256(egg.rarity)
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
      uint256 lastBred,
      uint256 numChildren
    )
  {
    Kryptomon memory kryptomon = kryptomonList[_kryptomonId];
    return (
      uint256(kryptomon.speciesId),
      uint256(kryptomon.geneticValue),
      uint256(kryptomon.generation),
      uint256(kryptomon.birthTimeStamp),
      uint256(kryptomon.lastBred),
      uint256(kryptomon.numChildren)
    );
  }

  // Returns list of KryptomonIds that belong to an address.
  function getEggIdsForAddress(address _address)
    external
    view
    returns (uint256[] eggIds)
  {
    uint256 totalEggs = totalEggSupply();
    uint256 numEggs = eggBalanceOf(_address);

    uint256[] memory eggIdsList = new uint256[](numEggs);
    uint256 eggId;
    uint256 nextEggIdsListIdx = 0;

    if (numEggs != 0) {
      for (eggId = 0; eggId <= totalEggs; eggId++) {
        if (eggIndexToOwner[eggId] == _address) {
          eggIdsList[nextEggIdsListIdx] = eggId;
          nextEggIdsListIdx++;
        }
      }
    }

    return eggIdsList;
  }

  // Returns list of KryptomonIds belonging to an address
  function getKryptomonIdsForAddress(address _address)
    external
    view
    returns (uint256[] kryptomonIds)
  {
    uint256 totalKryptomon = totalSupply();
    uint256 numKryptomon = balanceOf(_address);
    if (numKryptomon == 0) {
      return new uint256[](0);
    }

    uint256[] memory kryptomonIdsList = new uint256[](numKryptomon);
    uint256 kryptomonId;
    uint256 nextKryptomonIdsListIdx = 0;

    for (kryptomonId = 0; kryptomonId <= totalKryptomon; kryptomonId++) {
      if (kryptomonIndexToOwner[kryptomonId] == _address) {
        kryptomonIdsList[nextKryptomonIdsListIdx] = kryptomonId;
        nextKryptomonIdsListIdx++;
      }
    }

    return kryptomonIdsList;
  }

  // Returns all data associated with a species.
  function getSpeciesDetails(uint256 _speciesId)
    external
    view
    returns (
      uint256 _attack,
      uint256 _defense,
      uint256 _specialAttack,
      uint256 _specialDefense,
      uint256 _hitPoints,
      uint256 _speed,
      uint256 _maxChildren,
      uint256 _breedingCooldown,
      uint256 _evolveToId,
      uint256 _timeToEvolve,
      uint256 _rarity,
      bool isExtinct
    )
  {
    Species memory species = speciesList[_speciesId];
    return (
      uint256(species.attack),
      uint256(species.defense),
      uint256(species.specialAttack),
      uint256(species.specialDefense),
      uint256(species.hitPoints),
      uint256(species.speed),
      uint256(species.maxChildren),
      uint256(species.breedingCooldown),
      uint256(species.evolveToId),
      uint256(species.timeToEvolve),
      uint256(species.rarity),
      species.isExtinct
    );
  }
}
