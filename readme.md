# Id.cv
## Decentralised Resumes with Verifiable credentials using ZKSnark 

## Project developed during
![HackFS 2024](https://storage.googleapis.com/ethglobal-api-production/events%2Fcrxnz%2Flogo%2F1713889751835_hackfs2024logo.svg)


## What is Id.cv
Id.cv is **Decentralised AI Powered Resume system** along with verifiable credential badges using **ZkSnark**. These resumes can be accessed through the subdomains of id.cv domains. These resumes are generated through AI and we are planning to auto populate the verifiable badges.

Our Planned **Tech stack** includes

 - **Next.js** - Frontend
 - **Node.js** - Backend
 - **Circom and Circomlib** - for zk circuits
 - **Snark.js** - for generating zkproofs and verifier contract
 - **Lighthouse.storage** - for encrypted storage 
 - **Ens** - for launching subdomains 

We are planning to use three different blockchains for this project for specific purposes

 - **Ethereum Sepolia** - for launcing ens subdomains
 - **Filecoin Calibrated Testnet** - for verifiable credentials and storage
 - **Galadriel** - for AI services

# Planned Architecture
![architecture](https://github.com/SKSudharsanan/id.cv/assets/131888858/ef844ad6-79d1-4984-9558-3a585975b860)