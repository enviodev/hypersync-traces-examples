// mixGenes(uint256 genes1, uint256 genes2, uint256 targetBlock)

import { HypersyncClient, JoinMode, Query } from "@envio-dev/hypersync-client";
import { decodeFunctionData, parseAbi, toFunctionSelector } from 'viem';

function unixToReadable(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  return date.toLocaleString(); // Returns a string with a human-readable format
}

const kittyAbi = parseAbi([
  'function setGeneScienceAddress(address to)',
]);

const setGeneScienceFunctionSignature = toFunctionSelector("function setGeneScienceAddress(address _address) external")
// const functionSignature = toFunctionSelector("function mixGenes(uint256 genes1, uint256 genes2, uint256 targetBlock) public returns (uint256)")

console.log(setGeneScienceFunctionSignature);

// Create hypersync client using the mainnet hypersync endpoint
const client = HypersyncClient.new({
  url: "https://eth.hypersync.xyz",
  maxNumRetries: 3,
});

// The query to run
const query: Query = {
  // start from block 0 and go to the end of the chain (we don't specify a toBlock).
  fromBlock: 4605182,
  traces: [{ sighash: [setGeneScienceFunctionSignature], to: ["0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"] }],
  fieldSelection: {
    trace: ["input", "block_number", "transaction_hash"],
    block: ["timestamp"],
  },
};


async function main() {
  const receiver = await client.stream(query, {});
  while (true) {
    const res = await receiver.recv();

    if (!res) return;

    const traces = res.data.traces || [];
    const blocks = res.data.blocks || [];

    for (let index in traces) {
      let { input, transactionHash, blockNumber } = traces[index];
      let { timestamp } = blocks[index];

      if (!input || !timestamp || !transactionHash || !blockNumber)
        continue;

      const { functionName: _, args } = decodeFunctionData({
        abi: kittyAbi,
        data: input as any,
      })
      console.log(`"${args[0]}", // set at ${unixToReadable(parseInt(timestamp || "0") as number)} in block ${blockNumber} transaction https://etherscan.io/tx/${transactionHash || "unkown"}`);
    }
  }
}

main()
