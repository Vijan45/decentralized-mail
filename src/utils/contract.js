import Web3 from 'web3';
import DecentralizedMail from '../contracts/DecentralizedMail.json';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        resolve(new Web3(window.web3.currentProvider));
      } else {
        reject(new Error('Must install MetaMask'));
      }
    });
  });

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = DecentralizedMail.networks[networkId];
  return new web3.eth.Contract(
    DecentralizedMail.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

export { getWeb3, getContract };
