import React, { useEffect, useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Card,
    CardContent,
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getWeb3, getContract } from '../utils/contract';
import './Inbox.css';

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');
    const [openReply, setOpenReply] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const fetchMessages = async () => {
        try {
            setStatus('Initializing Web3...');
            const web3 = await getWeb3();
            const mailContract = await getContract(web3);
            const accounts = await web3.eth.getAccounts();

            setStatus('Fetching messages...');
            const userMessageIds = await mailContract.methods.getUserMessages(accounts[0]).call();

            const userMessages = await Promise.all(
                userMessageIds.map(async id => {
                    const message = await mailContract.methods.getMessageById(id).call();
                    return {
                        ...message,
                        id: id.toString()
                    };
                })
            );

            setMessages(userMessages);
            setStatus('');
        } catch (error) {
            console.error('Error fetching messages:', error);
            setStatus('Failed to fetch messages');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleClickOpenReply = (message) => {
        setSelectedMessage(message);
        setOpenReply(true);
    };

    const handleCloseReply = () => {
        setOpenReply(false);
        setReplyMessage('');
    };

    const handleReply = async () => {
        try {
            const web3 = await getWeb3();
            const mailContract = await getContract(web3);
            const accounts = await web3.eth.getAccounts();

            // Fetch current gas price
            const gasPrice = await web3.eth.getGasPrice();
            console.log('Gas Price:', gasPrice);

            await mailContract.methods.sendMessage(selectedMessage.sender, replyMessage, '').send({
                from: accounts[0],
                gasPrice: gasPrice
            });

            setStatus('Reply sent successfully!');
            handleCloseReply();
            fetchMessages();
        } catch (error) {
            console.error('Error sending reply:', error);
            setStatus(`Failed to send reply: ${error.message}`);
        }
    };

    const handleClickOpenDetail = (message) => {
        setSelectedMessage(message);
        setOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
    };

    const handleDelete = async (messageId) => {
        try {
            const web3 = await getWeb3();
            const mailContract = await getContract(web3);
            const accounts = await web3.eth.getAccounts();

            // Fetch current gas price
            const gasPrice = await web3.eth.getGasPrice();
            console.log('Gas Price:', gasPrice);

            await mailContract.methods.deleteMessage(messageId).send({
                from: accounts[0],
                gasPrice: gasPrice
            });

            setMessages(messages.filter(msg => msg.id !== messageId));
            setStatus('Message deleted successfully!');
        } catch (error) {
            console.error('Error deleting message:', error);
            setStatus(`Failed to delete message: ${error.message}`);
        }
    };

    return (
        <Card className="inbox-card">
            <CardContent>
                <Typography variant="h5" gutterBottom>Inbox</Typography>
                {status && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {status}
                    </Typography>
                )}
                <List className="message-list">
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <ListItem key={msg.id} divider className="message-list-item">
                                <ListItemText
                                    primary={`From: ${msg.sender}`}
                                    secondary={
                                        <>
                                            <Box className="message-content" onClick={() => handleClickOpenDetail(msg)}>
                                                <Typography component="span" variant="body2" color="textPrimary">
                                                    {msg.content.length > 100 ? `${msg.content.substring(0, 100)}...` : msg.content}
                                                </Typography>
                                            </Box>
                                            {msg.imageHash && (
                                                <Box className="message-image-container">
                                                    <img
                                                        src={`https://gateway.pinata.cloud/ipfs/${msg.imageHash}`}
                                                        alt="Attachment"
                                                        className="message-image"
                                                        onClick={() => window.open(`https://gateway.pinata.cloud/ipfs/${msg.imageHash}`, '_blank')}
                                                    />
                                                </Box>
                                            )}
                                        </>
                                    }
                                />
                                <Box display="flex" alignItems="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleClickOpenReply(msg)}
                                    >
                                        Reply
                                    </Button>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(msg.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No messages found.
                        </Typography>
                    )}
                </List>

                <Dialog open={openReply} onClose={handleCloseReply}>
                    <DialogTitle>Reply to Message</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Reply Message"
                            fullWidth
                            multiline
                            rows={4}
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseReply} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleReply} color="primary">
                            Send Reply
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDetail} onClose={handleCloseDetail} maxWidth="md" fullWidth>
                    <DialogTitle>Message Details</DialogTitle>
                    <DialogContent>
                        {selectedMessage && (
                            <>
                                <Typography variant="h6">From: {selectedMessage.sender}</Typography>
                                <Typography variant="body1">{selectedMessage.content}</Typography>
                                {selectedMessage.imageHash && (
                                    <Paper className="message-detail-image-container">
                                        <Box className="message-detail-image-box">
                                            <img
                                                src={`https://gateway.pinata.cloud/ipfs/${selectedMessage.imageHash}`}
                                                alt="Attachment"
                                                className="message-detail-image"
                                                onClick={() => window.open(`https://gateway.pinata.cloud/ipfs/${selectedMessage.imageHash}`, '_blank')}
                                            />
                                        </Box>
                                    </Paper>
                                )}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetail} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default Inbox;
