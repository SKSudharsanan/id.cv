# zk-verifiable-credentials
This repository consists of the circom and snark.js essentials for creating verifiable credentials

## Installing circom in your system
### Install rust
```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```
### clone the circom directory and compile
```bash
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
cargo install --path circom
circom --help
```
### Install snark.js
```bash
npm install -g snarkjs
```

### Testing circom 
```rust
pragma circom 2.0.0;

/*This circuit template checks that c is the multiplication of a and b.*/  

template Multiplier2 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;  
   signal output c;  

   // Constraints.  
   c <== a * b;  
}
```
save it inside src/circom/multiplier2.circom

to compile circom
```bash
circom src/circom/multiplier2.circom --r1cs --wasm --sym --c
```
if it compiled successfully, you might get two folders namely multiplier2_cpp and multiplier2_js
```bash
cd multiplier2_js
```
creating a input file called input.json inside here
```json
{"a": "3", "b": "11"}
```

```bash
node generate_witness.js multiplier2.wasm input.json witness.wtns
```
### proving circuits with zk
We are going to use groth-16 zk-snark protocol to prove this.
First we start a new "powers of tau" ceremony
```bash
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
```
Then, we contribute to the ceremony:
```bash
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
```
it will prompt a random text, i have added "test" here, you can try out different processes
Now, we have the contributions to the powers of tau in the file pot12_0001.ptau and we can proceed with the Phase 2.

#### Phase-2
The phase 2 is circuit-specific. Execute the following command to start the generation of this phase:

```bash
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
snarkjs groth16 setup multiplier2.r1cs pot12_final.ptau multiplier2_0000.zkey
snarkjs zkey contribute multiplier2_0000.zkey multiplier2_0001.zkey --name="1st Contributor Name" -v
snarkjs zkey export verificationkey multiplier2_0001.zkey verification_key.json
```
#### Generating a Proof
lets try to generate proof
```bash
snarkjs groth16 prove multiplier2_0001.zkey witness.wtns proof.json public.json
```
#### Verifying the Proof
```bash
snarkjs groth16 verify verification_key.json public.json proof.json
```
### Generating the Solidity verifier contract
```bash
snarkjs zkey export solidityverifier multiplier2_0001.zkey verifier.sol
```
It will generate the verifier.sol, we can use remix.ethereum.org in order to deploy the contract in solidity. I am using **Ethereum Sepolia** to deploy the contract

You can use the quicknode sepolia faucet for getting funds
https://faucet.quicknode.com/ethereum/sepolia?utm_source=faucet&utm_medium=twitter&utm_content=social-share&utm_term=sepolia-eth
the contract which is deployed can be found in ethereum sepolia at this address
0x5e3565934209B3F04E03bA7FA78BAdc9b3cf0578

then we can able to generate the call using 
```bash
snarkjs generatecall
```
copy the result and paste it as a param to the verifyProof method and hit the button,
if everything went fine, the bool will return as true