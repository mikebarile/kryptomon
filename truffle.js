module.exports = {
   networks: {
     development: {
     host: "localhost",
     port: 8545,
     network_id: "*" // Match any network id,
   },
   rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0xa9c4a6cb737422f85c2bdac5493dcf7617e86772", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 6712390 // Gas limit used for deploys
    }
  },
  solc: {
  		optimizer: {
  			enabled: true,
  			runs: 200
  		}
  	}
};
