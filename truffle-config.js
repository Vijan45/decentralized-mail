const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        },
        testnet: {
            provider: () => new HDWalletProvider(process.env.MNEMONIC, 'https://public-node.testnet.rsk.co'),
            network_id: 31,
            gas: 5000000,
            gasPrice: 60000000,
            networkCheckTimeout: 10000
        }
    },
    compilers: {
        solc: {
            version: "0.8.0"
        }
    }
};
