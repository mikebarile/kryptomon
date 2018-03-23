# KRYPTOMON!

## Install dependencies

Run `npm install` to install all dependencies.

## Run tests

1.  Run `npm install -g ethereumjs-testrpc`.
2.  Run `testrpc` to create an Ethereum test network with 10 accounts. Leave it running.
3.  Run `truffle test` to execute tests. If `testrpc` crashes, cross your fingers and try again.

## Start front end

1.  Run `npm install` to install all dependencies
2.  Run `npm install -g ethereumjs-testrpc`
3.  Run `testrpc` to create a Ethereum test network. This should create 10 fake accounts on the network. Leave it running.
4.  Run `truffle migrate` (try 'rm -R build' and then add a '--reset' flag if it doesn't work)
5.  If there were changes to the contract code, update the ABI in `src/KryptomonKore.js` following the guide below.
6.  Update the kryptomonAddress in KryptomonKore.js
7.  Run `npm run-script start` to open the react app.
8.  Double check that you're logged into the kryptoGod address on Metamask (the first testrpc address)
9.  Copy paste the contents of src/initialize_species.js into the terminal.
10. Turn off the complete freeze in the test bed.
11. You should be up and running!

## Do fun command line stuff

1.  Run `truffle console`
2.  Run `var k = KryptomonKore.at(KryptomonKore.address)`
3.  Do fun things with your new kryptomon contract object:

    `k.setCompleteFreeze(false)`

    `k.buyGenZeroEggs(4, {value: 1e18, from: web3.eth.accounts[0]})`

NOTE: If npm install fails, try deleting the package-lock.json and
trying again.

ALSO NOTE: Double check that the kryptomon contract address is the same address
that you get when you run "kryptomon.address" in truffle console (there's a 1/10^100000000000
probability that it is).

ALSO ALSO NOTE: By default, the KryptoGod is set to whatever the first account is in MetaMask.

## Troubleshooting

Try the following

`rm -rf build/`
restart `testrpc`
`truffle run migrate --reset`

## Updating Contract ABI

Running `truffle migrate` deployed our contract to our testnet.
To make our app work we initialize the contract from the compiled ABI.
We need to keep this synced in the frontend.

1.  Open `build/contracts/KryptomonKore.json`
2.  Copy everything under the `abi` key
3.  Paste this in `src/index.js:19`

Once the page reloads, the new contract should be up and running!

## Using `MetaMaskChecker`

> File source: `src/templates/misc/MetaMaskChecker.jsx`

```js
// Other imports...
import MetaMaskChecker from 'misc/MetaMaskChecker';
import { withRouter } from 'react-router-dom';

class MyClass extends React.Component {
  componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);
  }

  componentWillUnmount() {
    window.clearInterval(this.checker);
  }

  // Other methods, like render
}

export default withRouter(MyClass);
```
