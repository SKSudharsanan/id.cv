const circomlibjs = require('circomlibjs');
const { ethers } = require('ethers');
const fs = require('fs');

async function prepareInput() {
    // Example credential data
    const credentialData = "example_credential_data";

    // Hash the credential data using Poseidon
    const poseidon = await circomlibjs.buildPoseidon();
    const credentialDataBigInt = BigInt(ethers.keccak256(ethers.toUtf8Bytes(credentialData)));
    const credentialDataHash = poseidon.F.toString(poseidon([credentialDataBigInt]));

    // Prepare input JSON
    const input = {
        "credentialHash": credentialDataHash, // This should be the calculated hash
        "expirationDate": 1672531199,  // Example expiration date
        "currentDate": 1669886799,     // Example current date
        "credentialData": credentialDataBigInt.toString() // Use the actual data hashed to an integer
    };

    // Save input JSON to file
    fs.writeFileSync('input.json', JSON.stringify(input, null, 2));

    console.log("Input JSON prepared and saved to input.json");
}

prepareInput();
