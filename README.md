# Decentralized Mail

## Overview

Decentralized Mail is a blockchain-based email application built on the RSK testnet. It allows users to send and receive messages in a secure and decentralized manner. The application leverages smart contracts to manage messages, ensuring that they are immutable and accessible only to the intended recipients.

## Features

- **Send and Receive Messages**: Users can send messages to other users on the platform and receive messages from them.
- **Message Attachments**: Supports sending and displaying images as attachments through IPFS.
- **Delete Messages**: Users can delete messages they have sent or received.
- **Inbox Management**: View and manage messages in your inbox, including viewing details and replying to messages.

## Prerequisites

- Node.js
- npm or yarn
- Metamask or another Ethereum-compatible wallet
- RSK Testnet

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/decentralized-mail.git
    ```

2. Navigate to the project directory:

    ```bash
    cd decentralized-mail
    ```

3. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

4. Configure your environment variables by creating a `.env` file in the root directory with the following content:

    ```plaintext
   MNEMONIC=your_mnemonic_phrase_here //You need to add your wallet's 12 words mnemonic phrase here
   REACT_APP_PINATA_API_KEY=your_pinata_api_key
   REACT_APP_PINATA_SECRET_KEY=your_pinata_secret_key
   REACT_APP_CONTRACT_ADDRESS=your_rsk_testnet_contract_address
    ```

## Usage

1. **Start the development server:**

    ```bash
    npm start
    # or
    yarn start
    ```

2. **Deploy the smart contract:**

    - Navigate to the `scripts` directory and run the deployment script:

        ```bash
        truffle migrate --network testnet
        ```

3. **Interact with the Application:**

    - Open your browser and navigate to `http://localhost:3000`.
    - Connect your wallet (Metamask) and start using the application.

## Smart Contract

The smart contract for Decentralized Mail is located in the `contracts/DecentralizedMail.sol` file. It includes functions to send, receive, and delete messages. For detailed information about the smart contract, refer to the [DecentralizedMail.sol](contracts/DecentralizedMail.sol) file.

## Helper Functions and Contract Setup

The `utils/contract.js` file contains helper functions to interact with the smart contract. It provides functions to initialize Web3, get the contract instance, and handle interactions with the blockchain.

## Known Issues

- **EIP-1559 Error**: Some transactions may fail with an "EIP-1559NotSupportedError". Ensure you are using a compatible network configuration and gas price settings.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow for contributing to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please open an issue on the [GitHub repository](https://github.com/Vijan45/decentralized-mail).

