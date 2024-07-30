const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        testnet: { // Renamed from rskTestnet to testnet
            provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://public-node.testnet.rsk.co'),
            network_id: 31, // RSK Testnet network id
            gas: 5500000, // Gas limit (adjust if necessary)
            gasPrice: 1000000000, // Gas price in wei (1 gwei)
            networkCheckTimeout: 10000 // Timeout for network checks
        }
    },
    compilers: {
        solc: {
            version: "0.8.0"
        }
    }
};
