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
      from: "0xEc53459d4650964Ee328223a89e176f28E1a5d80", // default address to use for any transaction Truffle makes during migrations
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
