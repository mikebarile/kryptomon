import React, { Component } from 'react';
import Web3 from 'web3';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { accounts: [], amount: 0, sender: null, openModal: false }
    this.updateAmount = this.updateAmount.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.transferMoney = this.transferMoney.bind(this);
    this.getBalance = this.getBalance.bind(this);
  }

  componentWillMount() {
    var web3;
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    // TODO(mikebarile): Update this ABI once we've finalized the contract.
    var kryptomonABI = [ { constant: true, inputs: [], name: 'name', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [Object], name: 'assignReserveEggs', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'approve', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'eggIndexToOwner', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [Object], name: 'hatchEgg', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'transferFrom', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'setGenZeroEggPrice', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'setHatchingPaused', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'eggTransfer', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [Object], name: 'eggOwnerOf', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'hatchingPaused', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'totalEggSupply', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [Object], name: 'breedKryptomon', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'eggApprove', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'buyGenZeroEggs', outputs: [], payable: true, stateMutability: 'payable', type: 'function' }, { constant: false, inputs: [Object], name: 'setGenZeroPaused', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [], name: 'withdrawBalance', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [Object], name: 'ownerOf', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'eggBalanceOf', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'speciesMapping', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'balanceOf', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'genZeroPaused', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'kryptomonIndexToApproved', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'breedingPaused', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'eggIndexToApproved', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'symbol', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [Object], name: 'transfer', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'completeFreeze', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'getKryptomon', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [Object], name: 'setCompleteFreeze', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [Object], name: 'ownerToTotalEggs', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'kryptoGodAddress', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [Object], name: 'setNewKryptoGod', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'eggTransferFrom', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [Object], name: 'kryptomonIndexToOwner', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [Object], name: 'ownerToTotalKryptomon', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [Object], name: 'evolve', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [Object], name: 'setBreedingPaused', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [Object], name: 'getEgg', outputs: [Object], payable: false, stateMutability: 'view', type: 'function' }, { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { payable: true, stateMutability: 'payable', type: 'fallback' }, { anonymous: false, inputs: [Object], name: 'KryptomonBred', type: 'event' }, { anonymous: false, inputs: [Object], name: 'EggTransfer', type: 'event' }, { anonymous: false, inputs: [Object], name: 'EggApproval', type: 'event' }, { anonymous: false, inputs: [Object], name: 'Transfer', type: 'event' }, { anonymous: false, inputs: [Object], name: 'Approval', type: 'event' }, { anonymous: false, inputs: [Object], name: 'GenZeroEggHatched', type: 'event' }, { anonymous: false, inputs: [Object], name: 'EggHatched', type: 'event' }, { anonymous: false, inputs: [Object], name: 'KryptomonAssigned', type: 'event' }, { anonymous: false, inputs: [Object], name: 'EggAssigned', type: 'event' }, { anonymous: false, inputs: [Object], name: 'KryptomonEvolved', type: 'event' } ];

    // TODO(mikebarile): Update this address once we've finalized the contract.
    var kryptomonAddress = '0x144608857eccce57f2522274550a70a66c5d0c78';

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
    this.setState({sender, openModal: true})
  }

  closeModal() {
    this.setState({sender: null, openModal: false, amount: 0})
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
    )
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
      )
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.openModal ? this.renderModal() : null}
          {this.renderTable()}
        </p>
      </div>
    );
  }
}

export default App;
