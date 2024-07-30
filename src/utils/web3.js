import Web3 from 'web3';
import mailContractData from './DecentralizedMail.json';

let web3;
let mailContract;

const initWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        // Legacy dapp browsers...
        web3 = new Web3(window.web3.currentProvider);
    } else {
        // Non-dapp browsers...
        const provider = new Web3.providers.HttpProvider('https://public-node.testnet.rsk.co');
        web3 = new Web3(provider);
    }

    const networkId = '31'; // RSK Testnet network ID
    const deployedNetwork = mailContractData.networks[networkId];
    if (deployedNetwork) {
        mailContract = new web3.eth.Contract(
            mailContractData.abi,
            deployedNetwork.address
        );
    } else {
        console.error("Contract not deployed on this network");
    }
};

initWeb3();

export { web3, mailContract };
