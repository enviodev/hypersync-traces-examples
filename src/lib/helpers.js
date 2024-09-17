"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenes = exports.unixToReadable = exports.client = void 0;
const hypersync_client_1 = require("@envio-dev/hypersync-client");
// Create hypersync client using the mainnet hypersync endpoint
exports.client = hypersync_client_1.HypersyncClient.new({
    url: "https://eth.hypersync.xyz",
    bearerToken: "TOKEN",
    /// other optional config
});
// Formatting:
const unixToReadable = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Returns a string with a human-readable format
};
exports.unixToReadable = unixToReadable;
const getGenes = (hexString) => {
    // Check if the string starts with "0x0000" and is the expected length
    if (hexString.startsWith("0x0000") && hexString.length === 66) {
        return hexString.substring(6);
    }
    else {
        throw new Error(`Invalid input string format: ${hexString}}`);
    }
};
exports.getGenes = getGenes;
