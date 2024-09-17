import { HypersyncClient } from "@envio-dev/hypersync-client";



// Create hypersync client using the mainnet hypersync endpoint
export const client = HypersyncClient.new({
  url: "https://eth.hypersync.xyz",
  bearerToken: "TOKEN",
  /// other optional config
});


// Formatting:
export const unixToReadable = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  return date.toLocaleString(); // Returns a string with a human-readable format
}

export const getGenes = (hexString: string) => {
  // Check if the string starts with "0x0000" and is the expected length
  if (hexString.startsWith("0x0000") && hexString.length === 66) {
    return hexString.substring(6);
  } else {
    throw new Error(`Invalid input string format: ${hexString}}`);
  }
}
