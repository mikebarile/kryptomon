import React, { Component } from 'react';
import Web3 from 'web3';

import logo from './logo.svg';
import './App.css';

var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

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
    this.getBalance();
  }

  getBalance() {
    var accounts = web3.eth.accounts.map(acc => ({name: acc, balance: parseInt(web3.eth.getBalance(acc))}));
    this.setState({accounts: accounts});
  }

  updateAmount(e) {
    const { value } = e.target;
    this.setState({amount: value});
  }

  transferMoney(to) {
    const { sender, amount } = this.state;
    var transaction = { from: sender, to: to, value: amount };
    web3.eth.sendTransaction(transaction);
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
