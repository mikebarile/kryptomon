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
4. Run `rm -R build`
5. Run `truffle migrate --reset`
6. Run `npm run-script start` to open the react app.

NOTE: If npm install fails, try deleting the package-lock.json and
trying again.
