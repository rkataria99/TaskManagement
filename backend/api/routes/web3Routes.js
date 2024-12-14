import express from 'express';
import web3 from '../../utils/web3.js'; // Use `.js` because ES Modules require extensions

const router = express.Router();

// Route to get balance of an Ethereum address
router.get('/balance/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const balance = await web3.eth.getBalance(address);
    const balanceInEther = web3.utils.fromWei(balance, 'ether');
    res.status(200).json({ address, balance: balanceInEther });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance', details: error.message });
  }
});

// Route to send Ethereum (example, assumes sender's private key is accessible)
router.post('/send', async (req, res) => {
  const { sender, receiver, amount, privateKey } = req.body;

  try {
    const tx = {
      from: sender,
      to: receiver,
      value: web3.utils.toWei(amount, 'ether'),
      gas: 21000,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    res.status(200).json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send Ethereum', details: error.message });
  }
});

export default router; // Use `export default`
