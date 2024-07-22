import { Query } from "@envio-dev/hypersync-client";
import { decodeFunctionData } from 'viem';
import { kittyAbi, setGeneScienceFunctionSignature } from "./lib/Abis";
import { client, unixToReadable } from "./lib/helpers";

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
