// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {INameWrapper, PARENT_CANNOT_CONTROL, IS_DOT_ETH} from "@ensdomains/ens-contracts/contracts/wrapper/INameWrapper.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IENSResolver {
    function setContenthash(bytes32 node, bytes memory hash) external;
    function contenthash(bytes32 node) external view returns (bytes memory);
}

contract IdCVResumeMinter is Ownable, ReentrancyGuard {
    INameWrapper public immutable wrapper;
    uint256 public constant PRICE = 0.001 ether;
    IENSResolver public immutable resolver;

    event SubdomainRegistered(bytes32 indexed parentNode, string label, address indexed newOwner, bytes contentHash);

    constructor(INameWrapper _wrapper, IENSResolver _resolver) Ownable(msg.sender){
        wrapper = _wrapper;
        resolver = _resolver;
    }

    function register(
        bytes32 parentNode,
        string calldata label,
        address newOwner,
        uint16 fuses,
        uint64 duration,
        bytes memory contentHash
    ) public payable nonReentrant {
        require(msg.value == PRICE, "Incorrect payment amount");

        // Create the subdomain
        wrapper.setSubnodeRecord(parentNode, label, newOwner, address(resolver), 0, fuses, duration);

        // Set the content hash for the new subdomain
        bytes32 node = keccak256(abi.encodePacked(parentNode, keccak256(abi.encodePacked(label))));
        resolver.setContenthash(node, contentHash);

        emit SubdomainRegistered(parentNode, label, newOwner, contentHash);
    }

    function updateContentHash(bytes32 parentNode, string calldata label, bytes memory contentHash) external {
        bytes32 node = keccak256(abi.encodePacked(parentNode, keccak256(abi.encodePacked(label))));
        resolver.setContenthash(node, contentHash);
    }

    function getResume(bytes32 parentNode, string calldata label) external view returns(bytes memory){
        bytes32 node = keccak256(abi.encodePacked(parentNode, keccak256(abi.encodePacked(label))));
        return resolver.contenthash(node);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
 