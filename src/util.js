/* eslint max-len:0 */

// Library of utils used around dApp
import numeral from 'numeral';

import KryptomonKore from 'src/KryptomonKore';
import { SpeciesNames } from 'constants/Kryptomon';

// Unpack KryptomonKore methods
const { getKryptomon, getSpeciesDetails } = KryptomonKore.methods;

export const KMON_IMG_BASE_URL =
  'https://res.cloudinary.com/dsguwnfdw/image/upload/v1521682933/Kryptomon_PNG/';

export function getImageFromKryptomon(kryptomon) {
  // TODO: Remove after getting kGod png
  if (kryptomon.speciesId === '0' || kryptomon.speciesId === '') {
    kryptomon.speciesId = '143';
  }
  return (
    KMON_IMG_BASE_URL + numeral(kryptomon.speciesId).format('000') + '.png'
  );
}

export function getImageFromSpeciesId(speciesId) {
  // TODO: Remove after getting kGod png
  if (speciesId === '0' || speciesId === '') {
    speciesId = '143';
  }
  return KMON_IMG_BASE_URL + numeral(speciesId).format('000') + '.png';
}

export async function getImageFromKryptomonId(kryptomonId) {
  const kryptomon = await getKryptomon(kryptomonId).call();
  return getImageFromKryptomon(kryptomon);
}

export async function getEvolutionInformation(species) {
  const evolutions = [];
  while (species._evolveToId !== '0') {
    evolutions.push({
      src: getImageFromSpeciesId(species._evolveToId),
      name: SpeciesNames[species._evolveToId],
    });
    species = await getSpeciesDetails(species._evolveToId).call();
  }

  return evolutions;
}
