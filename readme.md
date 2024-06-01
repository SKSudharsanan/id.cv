# Id.cv
## Decentralised Resumes with Verifiable credentials using ZKSnark 

## Project developed during
![HackFS 2024](https://storage.googleapis.com/ethglobal-api-production/events%2Fcrxnz%2Flogo%2F1713889751835_hackfs2024logo.svg)


## What is Id.cv
Id.cv is **Decentralised AI Powered Resume system** along with verifiable credential badges using **ZkSnark**. These resumes can be accessed through the subdomains of id.cv domains. These resumes are generated through AI and we are planning to auto populate the verifiable badges.

Our Planned **Tech stack** includes

 - **React.js** - Frontend
 - **Node.js** - Backend
 - **Lighthouse.storage** - for encrypted storage 
 - **Ens** - for launching subdomains 

We are planning to use three different blockchains for this project for specific purposes

 - **Ethereum Sepolia** - for launcing ens subdomains
 - **Filecoin Calibrated Testnet** - for lighthouse storage
 - **Galadriel** - for AI services

# folder structure
 - contracts - consits of the smart contracts written
 - backend - consists of a node js server for id.cv backend
 - zk-verifiable-credentials - consists of ways to launch for zk-verifible-credentials
 - ui - consists of the frontend of the app

# flow of how things work
- upload your resume to ui
- resume is then passed to the backend, where the pdf resume is converted into image and 
  send to galadriel to convert into json resume structure
  ```
  curl --location 'http://localhost:3000/generate_image' \
--form 'pdf=@"upload pdf file"'
  ```
- then the json resume can be send to resume-generator api where it is converted into a html 
  and uploaded to lighthouse
  ```
 curl --location 'http://localhost:3000/generate_resume' \
--header 'Content-Type: application/json' \
--data '{
    "resumeData": add-your-json-resume-from-step-2,
    "theme": "modern"
}'
  ```
- then hit the idcvdomainminter contract
```
function register(
        bytes32 parentNode,
        string calldata label,
        address newOwner,
        uint16 fuses,
        uint64 duration,
        bytes memory contentHash
    )
```
to get resume data after successful minting
```
curl --location 'http://localhost:3000/subdomain'
```

# Planned Architecture
![architecture](https://github.com/SKSudharsanan/id.cv/assets/131888858/ef844ad6-79d1-4984-9558-3a585975b860)