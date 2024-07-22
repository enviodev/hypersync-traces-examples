import { parseAbi, toFunctionSelector } from "viem";

// CryptoKitties Contract
export const kittyAbi = parseAbi([
  'function setGeneScienceAddress(address to)',
]);

export const setGeneScienceFunctionSignature = toFunctionSelector("function setGeneScienceAddress(address _address) external")

// Gene Science Contract
const mixGenesFunction = 'function mixGenes(uint256 genes1, uint256 genes2, uint256 targetBlock) public returns (uint256)';
export const geneScienceAbi = parseAbi([
  mixGenesFunction
]);
export const mixGenesFunctionSignature = toFunctionSelector(mixGenesFunction)
