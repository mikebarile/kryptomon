pragma solidity ^0.4.11;
import './KryptomonTokenization.sol';

// Note: Kryptomon are ERC721 compliant while eggs are not. However,
// we will implement similar functionality because we want eggs to also
// be transferable.
contract KryptomonEggTokenization is KryptomonTokenization {
  string public constant genZeroEggName = "Kryptomon Egg";
  string public constant genZeroEggSymbol = "EGG";

  // Returns the total number of Kryptomon eggs in existence.
  function totalEggSupply() public view returns(uint256) {
    return eggList.length;
  }

  // Returns the total number of Kryptomon eggs owned by a given
  // address.
  function eggBalanceOf(address _owner) public view returns(uint256) {
    uint256 numEggs;
    uint256 eggId;
    uint256 totalEggs = totalEggSupply();

    for (eggId = 0; eggId <= totalEggs; eggId++) {
      if (eggIndexToOwner[eggId] == _owner) {
        numEggs = numEggs.add(1);
      }
    }

    return numEggs;
  }

  // Returns the address of the owner of a given Kryptomon egg id.
  function eggOwnerOf(uint _tokenId) public view returns(address) {
    require(_tokenId < totalEggSupply());
    return eggIndexToOwner[_tokenId];
  }

  // Approves an address to call the "transferFrom" method and take
  // ownership of a Kryptomon egg.
  function eggApprove(address _to, uint _tokenId) public {
    require(_to != address(0));
    require(msg.sender == eggOwnerOf(_tokenId));
    eggIndexToApproved[_tokenId] = _to;
    EggApproval(msg.sender, _to, _tokenId);
  }

  // Allows a Kryptomon egg's custodian to transfer ownership from the
  // current owner to a different address.
  function eggTransferFrom(address _from, address _to, uint _tokenId)
    public
  {
    require(eggIndexToApproved[_tokenId] == msg.sender);
    require(eggOwnerOf(_tokenId) == _from);
    require(_to != address(0));
    eggIndexToOwner[_tokenId] = _to;
    EggTransfer(_from, _to, _tokenId);
    EggAssigned(_to, _tokenId);
  }

  // Allows a Kryptomon egg's owner to transfer the Kryptomon to another
  // user.
  function eggTransfer(address _to, uint _tokenId) public {
    require(eggOwnerOf(_tokenId) == msg.sender);
    require(_to != address(0));
    eggIndexToOwner[_tokenId] = _to;
    EggTransfer(msg.sender, _to, _tokenId);
    EggAssigned(_to, _tokenId);
  }

  // Events
  event EggTransfer(address _from, address _to, uint256 _tokenId);
  event EggApproval(
    address _owner,
    address _approved,
    uint256 _tokenId
  );
}
