# KRYPTOMON!

## Start front end
1. Run `npm install` to install all dependencies
2. Run `npm install -g ethereumjs-testrpc`
3. Run `testrpc` to create a Ethereum test network. This should create 10 fake accounts on the network. Leave it running.
4. Run `rm -R build`
5. Run `truffle migrate --reset`
7. Run `npm run-script start` to open the react app.

NOTE: If npm install fails, try deleting the package-lock.json and
trying again.
