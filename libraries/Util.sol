pragma solidity ^0.4.11;
// Kitchen sink of util functions for Kryptomon

library Util {
  function min(uint256 _a, uint256 _b)
    internal
    pure
    returns(uint256)
  {
    return _a < _b ? _a : _b;
  }

  function max(uint256 _a, uint256 _b)
    internal
    pure
    returns(uint256)
  {
    return _a > _b ? _a : _b;
  }

  /* Uncomment these if needed.
  function strCat(string _a, string _b, string _c, string _d, string _e)
    internal
    pure
    returns (string)
  {
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    bytes memory _bc = bytes(_c);
    bytes memory _bd = bytes(_d);
    bytes memory _be = bytes(_e);
    string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
    bytes memory babcde = bytes(abcde);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
    for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
    for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
    for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
    for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
    return string(babcde);
  }

  function strCat(string _a, string _b, string _c, string _d)
    internal
    pure
    returns (string)
  {
    return strCat(_a, _b, _c, _d, "");
  }

  function strCat(string _a, string _b, string _c)
    internal
    pure
    returns (string)
  {
    return strCat(_a, _b, _c, "", "");
  }

  function strCat(string _a, string _b)
    internal
    pure
    returns (string)
  {
    return strCat(_a, _b, "", "", "");
  }
  */
}
