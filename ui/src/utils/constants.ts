export const APP_NAME = "ID.CV | Next-gen resumes: private, owner-controlled, decentralized";

export const APP_USER = "idcv_app_user";

export const APP_MY_DATA = "idcv_app_my_data";

export const APP_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"name": "contenthash",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "hash",
				"type": "bytes"
			}
		],
		"name": "setContenthash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
