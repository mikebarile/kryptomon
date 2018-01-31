import React, { Component } from 'react';
import Web3 from 'web3';
import {Link} from 'react-router-dom';

import logo from '../logo.svg';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { accounts: [], amount: 0, sender: null, openModal: false };
    this.updateAmount = this.updateAmount.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.transferMoney = this.transferMoney.bind(this);
    this.getBalance = this.getBalance.bind(this);
  }

  componentWillMount() {
    var web3;
    if (typeof window.web3 === 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // TODO(mikebarile): Update this ABI once we've finalized the contract.
    var kryptomonABI = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "_name", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_sendTo", "type": "address" }, { "name": "_numEggs", "type": "uint256" } ], "name": "assignReserveEggs", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "eggIndexToOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_eggId", "type": "uint256" } ], "name": "hatchEgg", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "price", "type": "uint256" } ], "name": "setGenZeroEggPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_condition", "type": "bool" } ], "name": "setHatchingPaused", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "eggTransfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "eggOwnerOf", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "hatchingPaused", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalEggSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_sireIndex", "type": "uint256" }, { "name": "_matronIndex", "type": "uint256" } ], "name": "breedKryptomon", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "eggApprove", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_numEggs", "type": "uint256" } ], "name": "buyGenZeroEggs", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_condition", "type": "bool" } ], "name": "setGenZeroPaused", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawBalance", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "eggBalanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "speciesMapping", "outputs": [ { "name": "attack", "type": "uint8" }, { "name": "defense", "type": "uint8" }, { "name": "specialAttack", "type": "uint8" }, { "name": "specialDefense", "type": "uint8" }, { "name": "hitPoints", "type": "uint8" }, { "name": "speed", "type": "uint8" }, { "name": "maxChildren", "type": "uint8" }, { "name": "breedingCooldown", "type": "uint32" }, { "name": "evolveToId", "type": "uint16" }, { "name": "timeToEvolve", "type": "uint32" }, { "name": "rarity", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "genZeroPaused", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "kryptomonIndexToApproved", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "breedingPaused", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "eggIndexToApproved", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "_symbol", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "completeFreeze", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_kryptomonId", "type": "uint256" } ], "name": "getKryptomon", "outputs": [ { "name": "speciesId", "type": "uint256" }, { "name": "geneticValue", "type": "uint256" }, { "name": "generation", "type": "uint256" }, { "name": "birthTimeStamp", "type": "uint256" }, { "name": "breedingCooldown", "type": "uint256" }, { "name": "numChildren", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_condition", "type": "bool" } ], "name": "setCompleteFreeze", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "ownerToTotalEggs", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "kryptoGodAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newKryptoGod", "type": "address" } ], "name": "setNewKryptoGod", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "eggTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "kryptomonIndexToOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "ownerToTotalKryptomon", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_kryptomonId", "type": "uint256" } ], "name": "evolve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_condition", "type": "bool" } ], "name": "setBreedingPaused", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_eggId", "type": "uint256" } ], "name": "getEgg", "outputs": [ { "name": "generation", "type": "uint256" }, { "name": "geneticPredisposition", "type": "uint256" }, { "name": "matronSpeciesId", "type": "uint256" }, { "name": "sireSpeciesId", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_sireIndex", "type": "uint256" }, { "indexed": false, "name": "_matronIndex", "type": "uint256" }, { "indexed": false, "name": "_owner", "type": "address" } ], "name": "KryptomonBred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_tokenId", "type": "uint256" } ], "name": "EggTransfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_owner", "type": "address" }, { "indexed": false, "name": "_approved", "type": "address" }, { "indexed": false, "name": "_tokenId", "type": "uint256" } ], "name": "EggApproval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_owner", "type": "address" }, { "indexed": false, "name": "_approved", "type": "address" }, { "indexed": false, "name": "_tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "buyerId", "type": "address" } ], "name": "GenZeroEggHatched", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "ownerAddress", "type": "address" }, { "indexed": false, "name": "eggId", "type": "uint256" } ], "name": "EggHatched", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "ownerAddress", "type": "address" }, { "indexed": false, "name": "kryptomonId", "type": "uint256" } ], "name": "KryptomonAssigned", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "ownerAddress", "type": "address" }, { "indexed": false, "name": "eggId", "type": "uint256" } ], "name": "EggAssigned", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "ownerAddress", "type": "address" }, { "indexed": false, "name": "kryptomonId", "type": "uint256" } ], "name": "KryptomonEvolved", "type": "event" } ];

    // TODO(mikebarile): Update this address once we've finalized the contract.
    var kryptomonAddress = '0xcbf5eae588c5153e675c55176642e72d0318a359';

    var kryptomon = web3.eth.contract(kryptomonABI).at(kryptomonAddress);

    window.web3 = web3;
    window.kryptomonABI = kryptomonABI;
    window.kryptomonAddress = kryptomonAddress;
    window.kryptomon = kryptomon;

    this.getBalance();
  }

  getBalance() {
    var accounts = window.web3.eth.accounts.map(acc => ({name: acc, balance: parseInt(window.web3.eth.getBalance(acc))}));
    this.setState({accounts: accounts});
  }

  updateAmount(e) {
    const { value } = e.target;
    this.setState({amount: value});
  }

  transferMoney(to) {
    const { sender, amount } = this.state;
    var transaction = { from: sender, to: to, value: amount };
    window.web3.eth.sendTransaction(transaction);
    this.getBalance();
    this.closeModal();
  }

  openModal(sender) {
    this.setState({sender, openModal: true});
  }

  closeModal() {
    this.setState({sender: null, openModal: false, amount: 0});
  }

  renderModal() {
    const { sender, accounts } = this.state;
    const otherAccounts = accounts.filter(acc => acc.name !== sender);

    return (
      <div style={{position: 'absolute', top: 50, bottom: 50, width: '100%', padding: '20px 0'}}>
        <div style={{margin: '20px auto', backgroundColor: 'beige', border: '3px black solid'}}>
          <div>
            <div>Amount to send:</div>
            <input value={this.state.amount} onChange={this.updateAmount}/>
          </div>
          <hr />
          {otherAccounts.map((acc, index) => (
            <li key={index} style={{display: 'flex', justifyContent: 'space-around'}}>
              <div>To: </div>
              <div>
                {acc.name}
              </div>
              <button onClick={() => this.transferMoney(acc.name)}>Send</button>
            </li>
          ))}
          <hr />
          <div>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  renderTable() {
    const { accounts } = this.state;

    return accounts.map((acc, index) => {
      return (
        <li style={{display: 'flex', justifyContent: 'space-around'}} key={index}>
          <div>
            {acc.name}
          </div>
          <div>
            E {acc.balance}
          </div>
          <div>
            <button onClick={() => this.openModal(acc.name)}>Transfer</button>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {this.state.openModal ? this.renderModal() : null}
          {this.renderTable()}
        </div>
        <div>
          Check out the new home page!!
          <br/>
          <br/>
          <Link to='/home'>Home</Link>
        </div>
      </div>
    );
  }
}

export default App;
