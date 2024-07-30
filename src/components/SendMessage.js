import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { getWeb3, getContract } from '../utils/contract';

const SendMessage = () => {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');

    const sendMessage = async () => {
        console.log('Starting sendMessage function...');
        try {
            const web3 = await getWeb3();
            console.log('Web3 initialized:', web3);
            const accounts = await web3.eth.requestAccounts();
            console.log('Accounts retrieved:', accounts);
            const contract = await getContract(web3);
            console.log('Contract instance:', contract);

            let imageHash = '';
            if (image) {
                console.log('Uploading image to Pinata...');
                const formData = new FormData();
                formData.append('file', image);

                console.log('Pinata API Key:', process.env.REACT_APP_PINATA_API_KEY);
                console.log('Pinata Secret API Key:', process.env.REACT_APP_PINATA_SECRET_API_KEY);

                const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                    method: 'POST',
                    headers: {
                        'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
                        'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY
                    },
                    body: formData
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Pinata upload failed: ${errorText}`);
                }

                const data = await response.json();
                imageHash = data.IpfsHash;
                console.log('Image uploaded to IPFS:', imageHash);
            }

            console.log('Sending message with contract method...');
            await contract.methods.sendMessage(recipient, message, imageHash).send({
                from: accounts[0],
                gas: 5500000,
                gasPrice: web3.utils.toWei('1', 'gwei')
            });
            setStatus('Message sent successfully!');
            console.log('Message sent successfully!');
        } catch (error) {
            console.error('Error:', error);
            setStatus('Failed to send message');
        }
    };

    return (
        <Card className="Card">
            <CardContent>
                <Typography variant="h5" gutterBottom>Send Message</Typography>
                <TextField
                    label="Recipient Address"
                    fullWidth
                    variant="outlined"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <TextField
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ margin: '20px 0' }}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ marginBottom: '20px' }}
                />
                <Button variant="contained" color="primary" onClick={sendMessage}>
                    Send
                </Button>
                {status && (
                    <Typography variant="body2" color={status === 'Message sent successfully!' ? 'primary' : 'error'} gutterBottom>
                        {status}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default SendMessage;
