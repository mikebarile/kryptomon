pragma solidity ^0.4.11;
import './KryptomonDefinitions.sol';
import '../libraries/SafeMath.sol';

contract KryptomonGenZeroEggSales is KryptomonDefinitions {
  using SafeMath for uint256;

  string public constant genZeroEggName = "Gen0 Kryptomon Egg";
  string public constant genZeroEggSymbol = "ZEG";
  uint8 public constant genZeroEggDecimals = 0;

  // The total number of gen0 eggs in circulation. Initialized in
  // KryptomonKore as the sum of unassignedGenZeroEggs and
  // genZeroEggsReserve. Drops by 1 each time an egg is hatched.
  uint256 public totalGenZeroEggs;

  // The total number of "gen 0" eggs remaining. These eggs have no
  // parents or genetics, and hatch into a Kryptomon. These eggs are
  // stored as an int so that the Kryptomon creators don't have to pay
  // a crazy gas cost to initialize thousands of identical eggs. These
  // eggs are effecitvely owned by the Kryptomon board and are non
  // transferable.
  uint256 public unassignedGenZeroEggs = 50000;

  // A reserve of gen0 eggs that is controlled by the KryptoGod. For
  // use with beta testing, bug bounties, etc.
  uint256 public genZeroEggsReserve = 50000;

  // The price per gen0 egg. Can be reassigned by the KryptoGod.
  uint256 public genZeroEggPrice = 10 finney;

  // Event triggered when a gen0 egg is transfered.
  event GenZeroEggTransfer(
    address _from,
    address _to,
    uint256 _eggs
  );

  // Event triggered when gen0 egg management approval is granted.
  event GenZeroEggApproval(
    address _eggOwner,
    address _spender,
    uint256 _eggs
  );

  // Event triggered when a gen0 egg is successfully hatched.
  event GenZeroEggHatched(address buyerId);

  // Balances for each account.
  mapping(address => uint256) genZeroEggBalances;

  // Owner of account approves the transfer of an amount to another
  // account.
  mapping(address => mapping (address => uint256)) genZeroEggAllowances;

  // Get the egg balance for account `_eggOwner`.
  function genZeroEggBalanceOf(address _eggOwner)
    public
    constant
    returns (uint256 balance)
  {
    return genZeroEggBalances[_eggOwner];
  }

  // Transfer the balance from owner's account to another account
  function genZeroEggTransfer(address _to, uint256 _eggs)
    public
    returns (bool success)
  {
    require(_to != address(0));
    require(_eggs <= genZeroEggBalances[msg.sender]);

    // SafeMath.sub will throw if there is not enough balance.
    genZeroEggBalances[msg.sender]
      = genZeroEggBalances[msg.sender].sub(_eggs);
    genZeroEggBalances[_to] = genZeroEggBalances[_to].add(_eggs);
    GenZeroEggTransfer(msg.sender, _to, _eggs);
    return true;
  }

  // Used to enable approved third parties to manage your egg inventory.
  function genZeroEggTransferFrom(
    address _from,
    address _to,
    uint256 _eggs
  )
    public
    returns (bool success)
  {
    require(_to != address(0));
    genZeroEggBalances[_from] = genZeroEggBalances[_from].sub(_eggs);
    genZeroEggAllowances[_from][msg.sender]
      = genZeroEggAllowances[_from][msg.sender].sub(_eggs);
    genZeroEggBalances[_to] = genZeroEggBalances[_to].add(_eggs);
    GenZeroEggTransfer(_from, _to, _eggs);
    return true;
  }

  // Allow `_spender` to withdraw from your account, multiple times,
  // up to the `_eggs` amount. If this function is called again it
  // overwrites the current allowance with '_eggs'.
  function genZeroEggApprove(address _spender, uint256 _eggs)
    public
    returns (bool success)
  {
    require(_spender != address(0));
    genZeroEggAllowances[msg.sender][_spender] = _eggs;
    GenZeroEggApproval(msg.sender, _spender, _eggs);
    return true;
  }

  // The total number of genZeroEggs remaining in circulation.
  function genZeroEggTotalSupply()
    public
    constant
    returns (uint256 _totalSupply)
  {
    return totalGenZeroEggs;
  }

  // Function that allows the KryptoGod to change the gen0 egg price.
  function setGenZeroEggPrice(uint256 _price) external kryptoGodOnly {
    genZeroEggPrice = _price;
  }

  // Function that allows the KryptoGod to distribute gen0 reserve eggs.
  function assignReserveEggs(address _sendTo, uint256 _numEggs)
    external
    kryptoGodOnly
  {
    require(_sendTo != address(0));
    require(_numEggs <= genZeroEggsReserve);
    genZeroEggsReserve = genZeroEggsReserve.sub(_numEggs);
    genZeroEggBalances[_sendTo]
      = genZeroEggBalances[_sendTo].add(_numEggs);
  }

  // Allows users to purchase unassigned gen0 eggs.
  function buyGenZeroEggs(uint256 _numEggs)
    external
    whenGenZeroNotPaused
    payable
  {
    require(_numEggs <= unassignedGenZeroEggs);
    uint256 totalCost = _numEggs.mul(genZeroEggPrice);
    require(msg.value >= totalCost);
    unassignedGenZeroEggs = unassignedGenZeroEggs.sub(_numEggs);
    genZeroEggBalances[msg.sender]
      = genZeroEggBalances[msg.sender].add(_numEggs);
  }

  // Allows users to hatch their gen0 eggs.
  function hatchGenZeroEgg(uint256 _numEggs)
    external
    whenGenZeroNotPaused
    whenHatchingNotPaused
  {
    require(_numEggs <= genZeroEggBalanceOf(msg.sender));
    for(uint256 i = 0; i < _numEggs; i++) {
      genZeroEggBalances[msg.sender]
        = genZeroEggBalances[msg.sender].sub(1);
      uint256 kryptomonId = createGenZeroKryptomon(i);
      kryptomonIndexToOwner[kryptomonId] = msg.sender;
      totalGenZeroEggs = totalGenZeroEggs.sub(1);
      GenZeroEggHatched(msg.sender);
      KryptomonAssigned(msg.sender, kryptomonId);
    }
  }

  // Function used to create a gen0 kryptomon. Employs similar logic to
  // createKryptomon except that there aren't any genetic effects.
  function createGenZeroKryptomon(uint256 _id)
    internal
    returns(uint256)
  {
    uint256 speciesId = determineSpeciesId(_id);
    uint256 geneticValue = determineGenZeroGeneticValue(_id);
    kryptomonList.push(
      Kryptomon({
        speciesId: uint16(speciesId),
        geneticValue: uint8(geneticValue),
        generation: 0,
        birthTimeStamp: uint32(now),
        lastBred: uint32(now),
        numChildren: 0
      })
    );
    return uint256(kryptomonList.length.sub(1));
  }

  // Determines the genetic value for a new gen0 Kryptomon.
  function determineGenZeroGeneticValue(uint256 _id)
    internal
    view
    returns(uint256)
  {
    return uint256(random(_id.add(1000000)) % 200);
  }
}
