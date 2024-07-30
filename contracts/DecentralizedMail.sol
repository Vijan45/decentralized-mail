// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedMail {
    struct Message {
        address sender;
        address receiver;
        string content; // IPFS hash or plain text
        string imageHash; // IPFS hash of the image
        uint256 timestamp;
        bool isDeleted; // Flag to mark message as deleted
    }

    Message[] public messages;
    mapping(address => uint256[]) public userMessages;

    event MessageSent(address indexed sender, address indexed receiver, uint256 messageId);
    event MessageDeleted(address indexed user, uint256 messageId);

    function sendMessage(address _receiver, string memory _content, string memory _imageHash) public {
        uint256 messageId = messages.length;
        messages.push(Message({
            sender: msg.sender,
            receiver: _receiver,
            content: _content,
            imageHash: _imageHash,
            timestamp: block.timestamp,
            isDeleted: false
        }));
        userMessages[_receiver].push(messageId);
        userMessages[msg.sender].push(messageId); // Add message to sender's message list
        emit MessageSent(msg.sender, _receiver, messageId);
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getUserMessages(address _user) public view returns (uint256[] memory) {
        return userMessages[_user];
    }

    function getMessageById(uint256 messageId) public view returns (Message memory) {
        require(messageId < messages.length, "Message does not exist");
        return messages[messageId];
    }

    function deleteMessage(uint256 messageId) public {
        require(messageId < messages.length, "Message does not exist");
        Message storage message = messages[messageId];
        require(message.receiver == msg.sender || message.sender == msg.sender, "Not authorized to delete this message");
        message.isDeleted = true;
        emit MessageDeleted(msg.sender, messageId);
    }

    function getUserInbox(address _user) public view returns (Message[] memory) {
        uint256[] memory messageIds = userMessages[_user];
        Message[] memory inbox = new Message[](messageIds.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < messageIds.length; i++) {
            Message storage message = messages[messageIds[i]];
            if (!message.isDeleted) {
                inbox[counter] = message;
                counter++;
            }
        }

        // Resize the array to fit the number of non-deleted messages
        Message[] memory resizedInbox = new Message[](counter);
        for (uint256 j = 0; j < counter; j++) {
            resizedInbox[j] = inbox[j];
        }

        return resizedInbox;
    }
}
