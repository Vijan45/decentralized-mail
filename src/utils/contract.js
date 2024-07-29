import Web3 from 'web3';
import mailContractData from './DecentralizedMail.json';

let web3Instance;
let mailContract;

const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (web3Instance) return resolve(web3Instance);

        if (window.ethereum) {
            web3Instance = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(() => {
                    console.log('Ethereum enabled');
                    resolve(web3Instance);
                }).catch((error) => {
                    console.error('Error enabling Ethereum', error);
                    reject(error);
                });
            } catch (error) {
                console.error('Error with Ethereum', error);
                reject(error);
            }
        } else if (window.web3) {
            web3Instance = new Web3(window.web3.currentProvider);
            console.log('Using web3 current provider');
            resolve(web3Instance);
        } else {
            const provider = new Web3.providers.HttpProvider('https://public-node.testnet.rsk.co');
            web3Instance = new Web3(provider);
            console.log('Using HTTP provider');
            resolve(web3Instance);
        }
    });
};

const getContract = async (web3) => {
    if (mailContract) return mailContract;

    const networkId = await web3.eth.net.getId();
    console.log('Network ID:', networkId);
    const deployedNetwork = mailContractData.networks[networkId];
    if (!deployedNetwork) {
        throw new Error('Contract not deployed on the current network');
    }
    mailContract = new web3.eth.Contract(
        mailContractData.abi,
        deployedNetwork.address
    );
    console.log('Contract address:', deployedNetwork.address);

    return mailContract;
};

export { getWeb3, getContract };
