import KryptomonKore from 'src/KryptomonKore';
import web3 from 'src/web3';

export default async function deployAllSpecies() {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  // Species name: TBD
  // Species ID: 0
  KryptomonKore.methods
    .addSpecies(
      1 /* _attack */,
      1 /* _defense */,
      1 /* _specialAttack */,
      1 /* _specialDefense */,
      1 /* _hitPoints */,
      1 /* _speed */,
      1 /* _maxChildren */,
      1 /* _breedingCooldown */,
      6 /* _evolveToId */,
      1 /* _timeToEvolve */,
      1 /* _rarity */,
    )
    .send({
      from: account,
    });

  // Species name: TBD
  // Species ID: 1
  KryptomonKore.methods
    .addSpecies(
      1 /* _attack */,
      1 /* _defense */,
      1 /* _specialAttack */,
      1 /* _specialDefense */,
      1 /* _hitPoints */,
      1 /* _speed */,
      1 /* _maxChildren */,
      1 /* _breedingCooldown */,
      0 /* _evolveToId */,
      0 /* _timeToEvolve */,
      2 /* _rarity */,
    )
    .send({
      from: account,
    });

  // Species name: TBD
  // Species ID: 2
  KryptomonKore.methods
    .addSpecies(
      1 /* _attack */,
      1 /* _defense */,
      1 /* _specialAttack */,
      1 /* _specialDefense */,
      1 /* _hitPoints */,
      1 /* _speed */,
      1 /* _maxChildren */,
      1 /* _breedingCooldown */,
      0 /* _evolveToId */,
      0 /* _timeToEvolve */,
      3 /* _rarity */,
    )
    .send({
      from: account,
    });

  // Species name: TBD
  // Species ID: 3
  KryptomonKore.methods
    .addSpecies(
      1 /* _attack */,
      1 /* _defense */,
      1 /* _specialAttack */,
      1 /* _specialDefense */,
      1 /* _hitPoints */,
      1 /* _speed */,
      1 /* _maxChildren */,
      1 /* _breedingCooldown */,
      0 /* _evolveToId */,
      0 /* _timeToEvolve */,
      4 /* _rarity */,
    )
    .send({
      from: account,
    });

  // Species name: TBD
  // Species ID: 4
  KryptomonKore.methods
    .addSpecies(
      1 /* _attack */,
      1 /* _defense */,
      1 /* _specialAttack */,
      1 /* _specialDefense */,
      1 /* _hitPoints */,
      1 /* _speed */,
      1 /* _maxChildren */,
      1 /* _breedingCooldown */,
      0 /* _evolveToId */,
      0 /* _timeToEvolve */,
      5 /* _rarity */,
    )
    .send({
      from: account,
    });

  // Species name: TBD
  // Species ID: 5
  KryptomonKore.methods
    .addSpecies(
      1 /* _attack */,
      1 /* _defense */,
      1 /* _specialAttack */,
      1 /* _specialDefense */,
      1 /* _hitPoints */,
      1 /* _speed */,
      1 /* _maxChildren */,
      1 /* _breedingCooldown */,
      0 /* _evolveToId */,
      0 /* _timeToEvolve */,
      6 /* _rarity */,
    )
    .send({
      from: account,
    });

  // Species name: TBD
  // Species ID: 6
  KryptomonKore.methods
    .addSpecies(
      1 /* _attack */,
      1 /* _defense */,
      1 /* _specialAttack */,
      1 /* _specialDefense */,
      1 /* _hitPoints */,
      1 /* _speed */,
      1 /* _maxChildren */,
      1 /* _breedingCooldown */,
      0 /* _evolveToId */,
      0 /* _timeToEvolve */,
      7 /* _rarity */,
    )
    .send({
      from: account,
    });
}
