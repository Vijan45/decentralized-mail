// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedMail {
    struct Message {
        address sender;
        address receiver;
        string content; // IPFS hash or plain text
        uint256 timestamp;
    }

    Message[] public messages;
    mapping(address => uint256[]) public userMessages;

    event MessageSent(address indexed sender, address indexed receiver, uint256 messageId);

    function sendMessage(address _receiver, string memory _content) public {
        uint256 messageId = messages.length;
        messages.push(Message({
            sender: msg.sender,
            receiver: _receiver,
            content: _content,
            timestamp: block.timestamp
        }));
        userMessages[_receiver].push(messageId);
        emit MessageSent(msg.sender, _receiver, messageId);
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getUserMessages(address _user) public view returns (uint256[] memory) {
        return userMessages[_user];
    }
}
