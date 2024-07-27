import React, { useEffect, useState } from 'react';
import { getWeb3, getContract } from '../utils/contract';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contract = await getContract(web3);

      try {
        const userMessages = await contract.methods.getUserMessages(accounts[0]).call();
        setMessages(userMessages);
        setStatus('');
      } catch (error) {
        console.error(error);
        setStatus('Failed to fetch messages');
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      {status && <p>{status}</p>}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <p>From: {msg.sender}</p>
            <p>Message: {msg.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
