pragma circom 2.0.0;

include "poseidon.circom";

template multipier2() {
    // Public inputs
    signal input credentialHash;
    signal input expirationDate;
    signal input currentDate;

    // Private inputs
    signal input credentialData;

    // Poseidon hash function for credential data
    signal credentialHashCalculated;
    credentialHashCalculated <== Poseidon([credentialData]);

    // Constraints
    // Verify the credential hash
   //  credentialHash === credentialHashCalculated;

    // Verify the credential has not expired
   //  currentDate < expirationDate;
}

component main = multipier2();
