import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import lighthouse from '@lighthouse-web3/sdk';
import { encode } from '@ensdomains/content-hash';
import { ethers } from 'ethers';
import axios from 'axios';
import namehash from 'eth-ens-namehash';
import { load } from '@pspdfkit/nodejs';
import multer from 'multer';
const domain = process.env.DOMAIN;


let abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "runId",
				"type": "uint256"
			}
		],
		"name": "addMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOracleAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "chatId",
				"type": "uint256"
			}
		],
		"name": "ChatCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "chatId",
				"type": "uint256"
			}
		],
		"name": "ChatResponseErrored",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "chatId",
				"type": "uint256"
			}
		],
		"name": "ChatResponseUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "runId",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "functionName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "functionArguments",
						"type": "string"
					},
					{
						"internalType": "uint64",
						"name": "created",
						"type": "uint64"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "systemFingerprint",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "object",
						"type": "string"
					},
					{
						"internalType": "uint32",
						"name": "completionTokens",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "promptTokens",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "totalTokens",
						"type": "uint32"
					}
				],
				"internalType": "struct IOracle.OpenAiResponse",
				"name": "response",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "errorMessage",
				"type": "string"
			}
		],
		"name": "onOracleOpenAiLlmResponse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOracleAddress",
				"type": "address"
			}
		],
		"name": "OracleAddressUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOracleAddress",
				"type": "address"
			}
		],
		"name": "setOracleAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "imageUrls",
				"type": "string[]"
			}
		],
		"name": "startChat",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chatRuns",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "messagesCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "chatId",
				"type": "uint256"
			}
		],
		"name": "getMessageHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "role",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "contentType",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "value",
								"type": "string"
							}
						],
						"internalType": "struct IOracle.Content[]",
						"name": "content",
						"type": "tuple[]"
					}
				],
				"internalType": "struct IOracle.Message[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "oracleAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function splitIpfsUri(ipfsUri) {
    // Check if the input is a valid IPFS URI
    if (!ipfsUri.startsWith('ipfs://')) {
      throw new Error('Invalid IPFS URI');
    }
  
    // Split the URI into protocol and hash
    const [protocol, hash] = ipfsUri.split('://');
  
    return {
      protocol: protocol + '://',
      hash,
    };
  }

  function getChatId(receipt, contract) {
    let chatId
    console.log("receipt logs", receipt.logs)
    for (const log of receipt.logs) {
      try {
        const parsedLog = contract.interface.parseLog(log)
        if (parsedLog && parsedLog.name === "ChatCreated") {
          // Second event argument
          chatId = ethers.toNumber(parsedLog.args[1])
        }
      } catch (error) {
        // This log might not have been from your contract, or it might be an anonymous log
        console.log("Could not parse log:", log)
      }
    }
    return chatId;
  }

  async function getNewMessages(chatId) {
    const galadriel_provider = new ethers.JsonRpcProvider('https://devnet.galadriel.com');
    const galadriel_address = '0xE0717c3D864D82Ab062699ad87986944267d6Ce3';
    const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, galadriel_provider);
    const contract = new ethers.Contract(galadriel_address, abi, wallet);
    const messages = await contract.getMessageHistory(chatId);
  
    for (const message of messages) {
      const [role, contents] = message;
      if (role === 'assistant') {
        for (const [contentType, value] of contents) {
          if (contentType === 'text') {
            // Use regex to find JSON within triple backticks
            const jsonMatch = value.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch) {
              try {
                const parsedJson = JSON.parse(jsonMatch[1]);
                return parsedJson; // Return the parsed JSON content directly
              } catch (e) {
                console.error('Failed to parse JSON:', e);
              }
            }
          }
        }
      }
    }
    return null; // Return null if no JSON content is found
  }
    
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

//wildcard
app.use((req, res, next) => {
    const host = req.headers.host;
    const subdomain = host.split('.')[0];
  
    // Check if the host is a subdomain
    if (host !== domain && host.endsWith(`.${domain}`)) {
      const redirectUrl = `https://${domain}/${subdomain}${req.originalUrl}`;
      return res.redirect(301, redirectUrl);
    }
  
    next();
  });
  

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Templates
const templates = {
  modern: 'templates/modern.hbs',
  blue: 'templates/blue.hbs',
  black: 'templates/black.hbs',
  burgundy: 'templates/burgundy.hbs',
  cyan: 'templates/cyan.hbs',
  night: 'templates/night.hbs',
  dark: 'templates/dark.hbs',
  creative: 'templates/creative.hbs',
  elegant: 'templates/elegant.hbs',
  green: 'templates/green.hbs',
};

// Generate resume endpoint
app.post('/generate_resume', async (req, res) => {
  const { resumeData, theme } = req.body;
  if (!resumeData || !theme || !templates[theme]) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Load the Handlebars template
    const templatePath = path.join(__dirname, templates[theme]);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    // Generate HTML
    const html = template(resumeData);

    // Write the HTML to a file
    const filePath = path.join(__dirname, 'resume.html');
    fs.writeFileSync(filePath, html);

    // Upload HTML to Lighthouse
    const uploadResponse = await lighthouse.upload(filePath, process.env.LIGHTHOUSE_API_KEY);
    const ipfsHash = uploadResponse.data.Hash;
    const encoded = encode('ipfs',ipfsHash);

    res.json({ contentHash:encoded });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

// Fetch resume endpoint
app.get('/:ensName', async (req, res) => {
  const { ensName } = req.params;
  if (!ensName) {
    return res.status(400).json({ error: 'ENS name is required' });
  }

  try {
    // Fetch content hash from ENS
    // const node = namehash.hash(ensName);
    const infuraProvider = new ethers.InfuraProvider(
        "sepolia",
        process.env.INFURA_API_KEY,
      );
    const resolver = await infuraProvider.getResolver(ensName);
    const contentHash = await resolver.getContentHash();
    const { protocol, hash } = splitIpfsUri(contentHash);
    const response = await axios.get(`https://ipfs.io/ipfs/${hash}`);
    const html = response.data;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Generate image endpoint
app.post('/get_resume_data', upload.single('pdf'), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ error: 'PDF file is required' });
  }

  try {
    const doc = fs.readFileSync(file.path);

    const instance = await load({ document: doc });
    const pageWidth = instance.getDocumentInfo().pages[0].width;
    const result = await instance.renderPage(0, { width: pageWidth });

    // Write the image to a file
    const imagePath = path.join(__dirname, 'image.png');
    fs.writeFileSync(imagePath, Buffer.from(result));

    // Upload image to Lighthouse
    const uploadResponse = await lighthouse.upload(imagePath, process.env.LIGHTHOUSE_API_KEY);
    const galadriel_provider = new ethers.JsonRpcProvider('https://devnet.galadriel.com');
    let galadriel_address = '0x31DdAF7889966c7EeECb12f9a957f7d67Df2C5df';
    const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, galadriel_provider);
    let abi = [
        'function startChat(string memory message, string[] memory imageUrls) public returns (uint i)',
        "function getMessageHistory(uint chatId) public view returns (IOracle.Message[] memory)",
        "event ChatCreated(address indexed sender, uint256 indexed chatId)", 
    ];
    const contract = new ethers.Contract(galadriel_address, abi, wallet);
    let prompt = "change this resume image to json resume format from https://jsonresume.org/schema, please give only json no additional format";
    const tx = await contract.startChat(prompt,[`https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`]);
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log(receipt)
    console.log('Transaction was mined in block:', receipt.logsBloom);
    let chatId = getChatId(receipt,contract);
    console.log(chatId);
    // res.json({chatId});
    setTimeout(async function() {
        let newMessages = await getNewMessages(chatId)
        res.json({ chatId, newMessages });
    }, 30000)
    instance.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate image' });
  } finally {
    // Clean up uploaded PDF file
    fs.unlinkSync(file.path);
  }
});

app.get('/getResumeData/:chatId', async (req, res) => {
    const { chatId } = req.params;
    try {
      const newMessages = await getNewMessages(chatId);
      if (newMessages) {
        res.json(newMessages);
      } else {
        res.status(404).send('No JSON content found in assistant messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).send('Error fetching messages');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
