pragma solidity ^0.4.11;
// Kitchen sink of util functions for Kryptomon

library Util {
  function min(uint256 _a, uint256 _b)
    public
    pure
    returns(uint256)
  {
    return _a < _b ? _a : _b;
  }

  function max(uint256 _a, uint256 _b)
    public
    pure
    returns(uint256)
  {
    return _a > _b ? _a : _b;
  }
}
