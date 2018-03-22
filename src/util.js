/* eslint max-len:0 */

// Library of utils used around dApp
import numeral from 'numeral';

import KryptomonKore from 'src/KryptomonKore';

// Unpack KryptomonKore methods
const { getKryptomon, getSpeciesDetails } = KryptomonKore.methods;

export const KMON_IMG_BASE_URL =
  'https://res.cloudinary.com/dsguwnfdw/image/upload/v1521682933/Kryptomon_PNG/';

export function getImageFromKryptomon(kryptomon) {
  // TODO: Remove after getting kGod png
  if (kryptomon.speciesId === '0') {
    kryptomon.speciesId = '143';
  }
  return (
    KMON_IMG_BASE_URL + numeral(kryptomon.speciesId).format('000') + '.png'
  );
}

export function getImageFromSpeciesId(speciesId) {
  // TODO: Remove after getting kGod png
  if (speciesId === '0') {
    speciesId = '143';
  }
  return KMON_IMG_BASE_URL + numeral(speciesId).format('000') + '.png';
}

export async function getImageFromKryptomonId(kryptomonId) {
  const kryptomon = await getKryptomon(kryptomonId).call();
  return getImageFromKryptomon(kryptomon);
}

export async function getAllEvolutionImages(species) {
  const evolutionImgSrcs = [];
  while (species._evolveToId !== '0') {
    evolutionImgSrcs.push(getImageFromSpeciesId(species._evolveToId));
    species = await getSpeciesDetails(species._evolveToId).call();
  }

  return evolutionImgSrcs;
}

export const rarityById = {
  1: { color: 'grey', name: 'Common', icon: 'asterisk' },
  2: { color: 'green', name: 'Uncommon', icon: 'asterisk' },
  3: { color: 'teal', name: 'Rare', icon: 'diamond' },
  4: { color: 'blue', name: 'Super Rare', icon: 'diamond' },
  5: { color: 'purple', name: 'Ultra Rare', icon: 'fire' },
  6: { color: 'red', name: 'Mega Rare', icon: 'fire' },
  7: { color: 'orange', name: 'Legendary', icon: 'star' },
};
