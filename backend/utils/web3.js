import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/f82e058886064b27a72d952d703cceaf'));

// Test the connection
web3.eth.getBlockNumber()
  .then((blockNumber) => {
    console.log('Latest Block Number:', blockNumber);
  })
  .catch((error) => {
    console.error('Error connecting to the blockchain:', error);
  });

export default web3; // Use `export default` instead of `module.exports`
