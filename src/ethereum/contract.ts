import { ethers } from 'ethers';

import { APP_CONTRACT_ABI } from '../utils/constants';

const provider = new ethers.JsonRpcProvider("https://devnet.galadriel.com/");
const privateKey: any = process.env.REACT_APP_ETH_PRIVATE_KEY;
const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS  || "";
const abi = APP_CONTRACT_ABI;

const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

export default contract;