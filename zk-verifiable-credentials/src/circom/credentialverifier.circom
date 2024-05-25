pragma circom 2.0.0;

include "poseidon.circom";
include "comparators.circom";

template CredentialVerifier() {
    // Public inputs
    signal input credentialHash;
    signal input expirationDate;
    signal input currentDate;

    // Private inputs
    signal input credentialData;

    // Instantiate Poseidon hash
    component hasher = Poseidon(1);

    // Assign the inputs to the Poseidon hasher
    hasher.inputs[0] <== credentialData;

    // Poseidon hash function for credential data
    signal credentialHashCalculated;
    credentialHashCalculated <== hasher.out;

    // Verify the credential hash
    credentialHash === credentialHashCalculated;

    // Verify the credential has not expired
    component isExpired = LessThan(32);
    isExpired.in[0] <== currentDate;
    isExpired.in[1] <== expirationDate;
    signal isNotExpired;
    isNotExpired <== isExpired.out;

    // Expose the public signals
    signal output pubCredentialHash;
    signal output pubExpirationDate;
    signal output pubCurrentDate;
    signal output pubIsNotExpired;

    pubCredentialHash <== credentialHash;
    pubExpirationDate <== expirationDate;
    pubCurrentDate <== currentDate;
    pubIsNotExpired <== isNotExpired;
}

component main = CredentialVerifier();
