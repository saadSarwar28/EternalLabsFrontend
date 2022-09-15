import WHITELIST from './whitelist';

const {MerkleTree} = require('merkletreejs')
const keccak256 = require('keccak256')

const leafNodes = WHITELIST.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})

export const getHexRoot = () => {
    console.log(merkleTree.getHexRoot(), ' < hex root') // hex root to input in the contract
}

export const getMerkleProof = (address: string) => {
    return merkleTree.getHexProof(keccak256(address))
}
