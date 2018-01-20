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
  function tokenOfOwnerByIndex(address _owner, uint _index) external view returns (uint _tokenId);
  function tokenMetadata(uint _tokenId) public view returns (string _infoUrl);

  // Events
  event Transfer(address _from, address _to, uint256 _tokenId);
  event Approval(address _owner, address _approved, uint256 _tokenId);
}

contract KryptomonTokenization is KryptomonGenZeroEggSales, ERC721 {
  function totalSupply() public view returns(uint256) {
    return kryptomonList.length;
  }

  function balanceOf(address _owner) public view returns(uint256) {
    return ownerToTotalKryptomon[_owner];
  }

  /* function ownerOf(uint _tokenId) public view returns(address) {

  }

  function approve(address _to, uint _tokenId) public {

  }

  function transferFrom(address _from, address _to, uint _tokenId) public {

  }

  function transfer(address _to, uint _tokenId) public {

  }

  // Optional functions
  function name() public view returns (string _name) {

  }

  function symbol() public view returns (string _symbol) {

  }

  function tokenOfOwnerByIndex(address _owner, uint _index) external view returns (uint256) {

  }

  function tokenMetadata(uint _tokenId) public view returns (string) {

  } */

  // Events
  event Transfer(address _from, address _to, uint256 _tokenId);
  event Approval(address _owner, address _approved, uint256 _tokenId);
}
