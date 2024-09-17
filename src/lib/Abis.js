"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixGenesFunctionSignature = exports.geneScienceAbi = exports.setGeneScienceFunctionSignature = exports.kittyAbi = void 0;
const viem_1 = require("viem");
// CryptoKitties Contract
exports.kittyAbi = (0, viem_1.parseAbi)([
    'function setGeneScienceAddress(address to)',
]);
exports.setGeneScienceFunctionSignature = (0, viem_1.toFunctionSelector)("function setGeneScienceAddress(address _address) external");
// Gene Science Contract
const mixGenesFunction = 'function mixGenes(uint256 genes1, uint256 genes2, uint256 targetBlock) public returns (uint256)';
exports.geneScienceAbi = (0, viem_1.parseAbi)([
    mixGenesFunction
]);
exports.mixGenesFunctionSignature = (0, viem_1.toFunctionSelector)(mixGenesFunction);
