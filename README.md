# KRYPTOMON!

## Install dependencies
Run `npm install` to install all dependencies.

## Run tests
1. Run `npm install -g ethereumjs-testrpc`.
2. Run `testrpc` to create an Ethereum test network with 10 accounts. Leave it running.
3. Run `truffle test` to execute tests.

## Start front end
1. Run `npm install` to install all dependencies
2. Run `npm install -g ethereumjs-testrpc`
3. Run `testrpc` to create a Ethereum test network. This should create 10 fake accounts on the network. Leave it running.
4. Run `truffle migrate` (try 'rm -R build' and then add a '--reset' flag if it doesn't work)
5. Run `npm run-script start` to open the react app.

## Do fun command line stuff
1. Run `truffle console`
2. Run `var kryptomon = KryptomonKore.at(KryptomonKore.address)`
3. Do fun things with your new kryptomon contract object

NOTE: If npm install fails, try deleting the package-lock.json and
trying again.

ALSO NOTE: Double check that the kryptomon contract address is the same address
that you get when you run "kryptomon.address" in truffle console (there's a 1/10^100000000000
probability that it is).
