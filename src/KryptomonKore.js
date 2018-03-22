/* eslint-disable */

import web3 from './web3';

// TODO(mikebarile): Update this address once we've finalized the contract.
// Update this when running truffle migrate
const kryptomonAddress = '0xb63f92d766c5a075491d281a2aac659733ed675a';

// TODO(mikebarile): Update this ABI once we've finalized the contract.
const kryptomonABI = [
  {
    constant: true,
    inputs: [],
    name: 'totalGenZeroEggs',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_sendTo',
        type: 'address',
      },
      {
        name: '_numEggs',
        type: 'uint256',
      },
    ],
    name: 'assignReserveEggs',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_speciesId',
        type: 'uint256',
      },
    ],
    name: 'setSpeciesExtinct',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'genZeroEggPrice',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_eggId',
        type: 'uint256',
      },
    ],
    name: 'hatchEgg',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_price',
        type: 'uint256',
      },
    ],
    name: 'setGenZeroEggPrice',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'genZeroEggName',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_condition',
        type: 'bool',
      },
    ],
    name: 'setHatchingPaused',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'eggTransfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'eggOwnerOf',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'hatchingPaused',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_attack',
        type: 'uint256',
      },
      {
        name: '_defense',
        type: 'uint256',
      },
      {
        name: '_specialAttack',
        type: 'uint256',
      },
      {
        name: '_specialDefense',
        type: 'uint256',
      },
      {
        name: '_hitPoints',
        type: 'uint256',
      },
      {
        name: '_speed',
        type: 'uint256',
      },
      {
        name: '_maxChildren',
        type: 'uint256',
      },
      {
        name: '_breedingCooldown',
        type: 'uint256',
      },
      {
        name: '_evolveToId',
        type: 'uint256',
      },
      {
        name: '_timeToEvolve',
        type: 'uint256',
      },
      {
        name: '_rarity',
        type: 'uint256',
      },
    ],
    name: 'addSpecies',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalEggSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_sireIndex',
        type: 'uint256',
      },
      {
        name: '_matronIndex',
        type: 'uint256',
      },
    ],
    name: 'breedKryptomon',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'eggApprove',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_numEggs',
        type: 'uint256',
      },
    ],
    name: 'buyGenZeroEggs',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_condition',
        type: 'bool',
      },
    ],
    name: 'setGenZeroPaused',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'genZeroEggTotalSupply',
    outputs: [
      {
        name: '_totalSupply',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'eggBalanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'newContractAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'genZeroPaused',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'breedingPaused',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_numEggs',
        type: 'uint256',
      },
    ],
    name: 'hatchGenZeroEgg',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_eggOwner',
        type: 'address',
      },
    ],
    name: 'genZeroEggBalanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'completeFreeze',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'genZeroEggsReserve',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_eggs',
        type: 'uint256',
      },
    ],
    name: 'genZeroEggApprove',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_condition',
        type: 'bool',
      },
    ],
    name: 'setCompleteFreeze',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_eggs',
        type: 'uint256',
      },
    ],
    name: 'genZeroEggTransferFrom',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'genZeroEggDecimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'unassignedGenZeroEggs',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'genZeroEggSymbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'kryptoGodAddress',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_eggs',
        type: 'uint256',
      },
    ],
    name: 'genZeroEggTransfer',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_speciesId',
        type: 'uint256',
      },
    ],
    name: 'setSpeciesNotExtinct',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newKryptoGod',
        type: 'address',
      },
    ],
    name: 'setNewKryptoGod',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'eggTransferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_kryptomonId',
        type: 'uint256',
      },
    ],
    name: 'evolve',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_condition',
        type: 'bool',
      },
    ],
    name: 'setBreedingPaused',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'sireId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'matronId',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'ownerAddress',
        type: 'address',
      },
    ],
    name: 'KryptomonBred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'EggTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_owner',
        type: 'address',
      },
      {
        indexed: false,
        name: '_approved',
        type: 'address',
      },
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'EggApproval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_owner',
        type: 'address',
      },
      {
        indexed: false,
        name: '_approved',
        type: 'address',
      },
      {
        indexed: false,
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        name: '_eggs',
        type: 'uint256',
      },
    ],
    name: 'GenZeroEggTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_eggOwner',
        type: 'address',
      },
      {
        indexed: false,
        name: '_spender',
        type: 'address',
      },
      {
        indexed: false,
        name: '_eggs',
        type: 'uint256',
      },
    ],
    name: 'GenZeroEggApproval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'buyerId',
        type: 'address',
      },
    ],
    name: 'GenZeroEggHatched',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: false,
        name: 'eggId',
        type: 'uint256',
      },
    ],
    name: 'EggHatched',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: false,
        name: 'kryptomonId',
        type: 'uint256',
      },
    ],
    name: 'KryptomonAssigned',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: false,
        name: 'eggId',
        type: 'uint256',
      },
    ],
    name: 'EggAssigned',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'ownerAddress',
        type: 'address',
      },
      {
        indexed: false,
        name: 'kryptomonId',
        type: 'uint256',
      },
    ],
    name: 'KryptomonEvolved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'speciesId',
        type: 'uint256',
      },
    ],
    name: 'SpeciesIdAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'speciesId',
        type: 'uint256',
      },
    ],
    name: 'SpeciesSetExtinct',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'speciesId',
        type: 'uint256',
      },
    ],
    name: 'SpeciesSetNotExtinct',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newContractAddress',
        type: 'address',
      },
    ],
    name: 'setNewContractAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'withdrawBalance',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_eggId',
        type: 'uint256',
      },
    ],
    name: 'getEgg',
    outputs: [
      {
        name: 'generation',
        type: 'uint256',
      },
      {
        name: 'geneticPredisposition',
        type: 'uint256',
      },
      {
        name: 'rarity',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_kryptomonId',
        type: 'uint256',
      },
    ],
    name: 'getKryptomon',
    outputs: [
      {
        name: 'speciesId',
        type: 'uint256',
      },
      {
        name: 'geneticValue',
        type: 'uint256',
      },
      {
        name: 'generation',
        type: 'uint256',
      },
      {
        name: 'birthTimeStamp',
        type: 'uint256',
      },
      {
        name: 'lastBred',
        type: 'uint256',
      },
      {
        name: 'numChildren',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'getEggIdsForAddress',
    outputs: [
      {
        name: 'eggIds',
        type: 'uint256[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_address',
        type: 'address',
      },
    ],
    name: 'getKryptomonIdsForAddress',
    outputs: [
      {
        name: 'kryptomonIds',
        type: 'uint256[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_speciesId',
        type: 'uint256',
      },
    ],
    name: 'getSpeciesDetails',
    outputs: [
      {
        name: '_attack',
        type: 'uint256',
      },
      {
        name: '_defense',
        type: 'uint256',
      },
      {
        name: '_specialAttack',
        type: 'uint256',
      },
      {
        name: '_specialDefense',
        type: 'uint256',
      },
      {
        name: '_hitPoints',
        type: 'uint256',
      },
      {
        name: '_speed',
        type: 'uint256',
      },
      {
        name: '_maxChildren',
        type: 'uint256',
      },
      {
        name: '_breedingCooldown',
        type: 'uint256',
      },
      {
        name: '_evolveToId',
        type: 'uint256',
      },
      {
        name: '_timeToEvolve',
        type: 'uint256',
      },
      {
        name: '_rarity',
        type: 'uint256',
      },
      {
        name: 'isExtinct',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export default new web3.eth.Contract(kryptomonABI, kryptomonAddress);
