import React, { useState } from 'react';
import { getWeb3, getContract } from '../utils/contract';

const SendMessage = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContract(web3);

    try {
      await contract.methods.sendMessage(recipient, message).send({ from: accounts[0] });
      setStatus('Message sent successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message');
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
      <p>{status}</p>
    </div>
  );
};

export default SendMessage;
