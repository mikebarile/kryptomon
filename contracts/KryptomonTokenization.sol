pragma solidity ^0.4.11;
import './KryptomonGenZeroEggSales.sol';

// ERC721 interface to make Kryptomon ERC721 compliant. Below code
// adapted from comments in Ethereum EIP issue 721.
// Reference: https://github.com/ethereum/eips/issues/721
contract ERC721 {
  // Core functions
  function totalSupply() public view returns (uint256 _totalSupply);
  function balanceOf(address _owner) public view returns (uint256 _balance);
  function ownerOf(uint _tokenId) public view returns (address _owner);
  function approve(address _to, uint _tokenId) public;
  function transferFrom(address _from, address _to, uint _tokenId) public;
  function transfer(address _to, uint _tokenId) public;

  // Optional functions
  function name() public view returns (string _name);
  function symbol() public view returns (string _symbol);
  /* function tokenOfOwnerByIndex(address _owner, uint _index) external view returns (uint _tokenId); */
  /* function tokenMetadata(uint _tokenId) public view returns (string _infoUrl); */

  // Events
  event Transfer(address _from, address _to, uint256 _tokenId);
  event Approval(address _owner, address _approved, uint256 _tokenId);
}

contract KryptomonTokenization is KryptomonGenZeroEggSales, ERC721 {
  // Returns the total number of Kryptomon in existence.
  function totalSupply() public view returns(uint256) {
    return kryptomonList.length;
  }

  // Returns the total number of Kryptomon owned by a given address.
  function balanceOf(address _owner) public view returns(uint256) {
    return ownerToTotalKryptomon[_owner];
  }

  // Returns the address of the owner of a given Kryptomon id.
  function ownerOf(uint _tokenId) public view returns(address) {
    require(_tokenId < totalSupply() - 1);
    return kryptomonIndexToOwner[_tokenId];
  }

  // Approves an address to call the "transferFrom" method and take
  // ownership of a Kryptomon.
  function approve(address _to, uint _tokenId) public {
    require(_to != address(0));
    require(msg.sender == ownerOf(_tokenId));
    kryptomonIndexToApproved[_tokenId] = _to;
    Approval(msg.sender, _to, _tokenId);
  }

  // Allows a Kryptomon's custodian to transfer ownership from the
  // current owner to a different address.
  function transferFrom(address _from, address _to, uint _tokenId)
    public
  {
    require(kryptomonIndexToApproved[_tokenId] == msg.sender);
    require(ownerOf(_tokenId) == _from);
    require(_to != address(0));
    kryptomonIndexToOwner[_tokenId] = _to;
    ownerToTotalKryptomon[_from] -= 1;
    ownerToTotalKryptomon[_to] += 1;
    Transfer(_from, _to, _tokenId);
  }

  // Allows a Kryptomon's owner to transfer the Kryptomon to another
  // user.
  function transfer(address _to, uint _tokenId) public {
    require(ownerOf(_tokenId) == msg.sender);
    require(_to != address(0));
    kryptomonIndexToOwner[_tokenId] = _to;
    ownerToTotalKryptomon[msg.sender] -= 1;
    ownerToTotalKryptomon[_to] += 1;
    Transfer(msg.sender, _to, _tokenId);
  }

  // Optional functions
  function name() public view returns (string _name) {
    return "Kryptomon";
  }

  function symbol() public view returns (string _symbol) {
    return "KRMN";
  }

  /* We've chosen to leave tokenOfOwnerByIndex unimplemented because
     it doesn't add any value and would be very costly to implement.
   function tokenOfOwnerByIndex(address _owner, uint _index)
    external
    view
    returns (uint256) {}
  */

  /* function tokenMetadata(uint _tokenId) public view returns (string) {

  } */

  // Events
  event Transfer(address _from, address _to, uint256 _tokenId);
  event Approval(address _owner, address _approved, uint256 _tokenId);
}
