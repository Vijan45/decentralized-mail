const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const API_KEY = process.env.PINATA_API_KEY;
const SECRET_KEY = process.env.PINATA_SECRET_KEY;

async function uploadToPinata(content) {
    const form = new FormData();
    form.append('file', content);

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
            headers: {
                ...form.getHeaders(),
                'pinata_api_key': API_KEY,
                'pinata_secret_api_key': SECRET_KEY,
            },
        });

        return response.data.IpfsHash;
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
}

// Example usage
const fs = require('fs');
const filePath = './example.txt'; // Replace with your file path
const fileContent = fs.createReadStream(filePath);

uploadToPinata(fileContent)
    .then(cid => console.log('File uploaded to IPFS with CID:', cid))
    .catch(err => console.error(err));
