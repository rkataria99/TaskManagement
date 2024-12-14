import axios from 'axios';

// Use environment variable for the API base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Fallback to localhost if no environment variable is set
});

// Fetch Ethereum balance
export const getEthereumBalance = async (address) => {
  try {
    const response = await api.get(`/api/web3/balance/${address}`);
    return response.data; // { address, balance }
  } catch (error) {
    console.error('Error fetching Ethereum balance:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch balance');
  }
};

// Send Ethereum transaction
export const sendEthereumTransaction = async (transactionDetails) => {
  try {
    const response = await api.post('/api/web3/send', transactionDetails);
    return response.data; // { success: true, receipt }
  } catch (error) {
    console.error('Error sending Ethereum transaction:', error);
    throw new Error(error.response?.data?.error || 'Failed to send Ethereum');
  }
};

export default api;
