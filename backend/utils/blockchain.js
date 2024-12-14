import React, { useState } from 'react';
import { getEthereumBalance, sendEthereumTransaction } from './api'; // Import the functions

const EthereumDashboard = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState({
    sender: '',
    receiver: '',
    amount: '',
    privateKey: '',
  });
  const [transactionReceipt, setTransactionReceipt] = useState(null);

  // Fetch Ethereum balance
  const handleFetchBalance = async () => {
    try {
      const result = await getEthereumBalance(address);
      setBalance(result.balance);
    } catch (error) {
      alert(error.message);
    }
  };

  // Send Ethereum transaction
  const handleSendTransaction = async () => {
    try {
      const receipt = await sendEthereumTransaction(transactionDetails);
      setTransactionReceipt(receipt);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Ethereum Dashboard</h1>

      {/* Fetch Ethereum Balance */}
      <div>
        <h2>Check Ethereum Balance</h2>
        <input
          type="text"
          placeholder="Enter Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleFetchBalance}>Get Balance</button>
        {balance !== null && <p>Balance: {balance} ETH</p>}
      </div>

      {/* Send Ethereum Transaction */}
      <div>
        <h2>Send Ethereum</h2>
        <input
          type="text"
          placeholder="Sender Address"
          value={transactionDetails.sender}
          onChange={(e) =>
            setTransactionDetails({ ...transactionDetails, sender: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Receiver Address"
          value={transactionDetails.receiver}
          onChange={(e) =>
            setTransactionDetails({ ...transactionDetails, receiver: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Amount (ETH)"
          value={transactionDetails.amount}
          onChange={(e) =>
            setTransactionDetails({ ...transactionDetails, amount: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Private Key"
          value={transactionDetails.privateKey}
          onChange={(e) =>
            setTransactionDetails({ ...transactionDetails, privateKey: e.target.value })
          }
        />
        <button onClick={handleSendTransaction}>Send Ethereum</button>
        {transactionReceipt && (
          <div>
            <h3>Transaction Successful!</h3>
            <p>Transaction Hash: {transactionReceipt.receipt.transactionHash}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EthereumDashboard;
