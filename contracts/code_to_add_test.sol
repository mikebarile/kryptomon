// Function used to determine a new Kryptomon's species ID. The
// species ID is chosen randomly from rarity buckets based on
// the egg's rarity.
function determineSpeciesId(uint256 _eggId, uint256 _eggRarity)
  internal
  view
  returns(uint256)
{
  uint256 randRarity = uniformRandom(_eggId, 1000000);
  uint24[6] memory bracket = getRarityBracketArray(_eggRarity);
  uint256 rarity;
  if (randRarity <= bracket[0]) {
    // Set to a common creature (40% probability).
    rarity = 1;
  } else if (randRarity > bracket[0] && randRarity <= bracket[1]) {
    // Set to an uncommon creature (25% probability).
    rarity = 2;
  } else if (randRarity > bracket[1] && randRarity <= bracket[2]) {
    // Set to a rare creature (20% probability).
    rarity = 3;
  } else if (randRarity > bracket[2] && randRarity <= bracket[3]) {
    // Set to a super rare creature (10% probability).
    rarity = 4;
  } else if (randRarity > bracket[3] && randRarity <= bracket[4]) {
    // Set to an ultra rare creature (~5% probability).
    rarity = 5;
  } else if (randRarity > bracket[4] && randRarity <= bracket[5]) {
    // Set to a mega rare creature (~0.1% probability).
    rarity = 6;
  } else if (randRarity > bracket[5]) {
    // Set to a legendary creature (0.0005% probability).
    rarity = 7;
  }

  // If there are 0 legendaries remaining, return a rarity 6
  // Kryptomon species ID. Else, return a random legendary species
  // ID and set it to extinct.
  if (rarity == 7 && speciesCountByRarity[7] == 0) {
    rarity = 6;
  }
  uint256 speciesId = getRarityBasedSpeciesId(_eggId, rarity);
  if (rarity == 7) {
    /* setLegendarySpeciesExtinct(speciesId); */
  }

  return speciesId;
}

function test(uint max, uint offset) external view
  returns(
      uint256[8]
  )
{
  uint256[8] memory list;
  for (uint i = 0; i < max; i++) {
    uint speciesId = determineSpeciesId(i + offset, 1);
    uint rarity = speciesList[speciesId].rarity;
    if (rarity == 1) {list[0] = list[0] += 1;}
    else if (rarity == 2) {list[1] = list[1] += 1;}
    else if (rarity == 3) {list[2] = list[2] += 1;}
    else if (rarity == 4) {list[3] = list[3] += 1;}
    else if (rarity == 5) {list[4] = list[4] += 1;}
    else if (rarity == 6) {list[5] = list[5] += 1;}
    else if (rarity == 7) {list[6] = list[6] += 1;}
    else {list[7] = list[7] += 1;}
  }
  return (
      list
  );
}
