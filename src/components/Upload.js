import React, { useState } from 'react';
import { create } from '@pinata/sdk';
import { Buffer } from 'buffer';

const pinata = create(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_SECRET_KEY);

function Upload() {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            const result = await pinata.pinFileToIPFS(file);
            setCid(result.IpfsHash);
            alert('File uploaded! CID: ' + result.IpfsHash);
        } catch (error) {
            console.error('Error uploading to Pinata:', error);
        }
    };

    return (
        <div>
            <h1>Upload to IPFS</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {cid && <p>CID: {cid}</p>}
        </div>
    );
}

export default Upload;
