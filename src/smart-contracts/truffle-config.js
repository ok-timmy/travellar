const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    dashboard: {},
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    inf_airbnb_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\ADMIN\\Desktop\\Projects\\Airbnb-clone\\src\\smart-contracts\\infura_airbnb.env', 'utf-8'), "https://goerli.infura.io/v3/a3e310d2d9fd45a18463040538facee1")
    }
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  },
  db: {
    enabled: false,
    host: "127.0.0.1"
  }
};
