import { Query, TraceField, BlockField } from "@envio-dev/hypersync-client";
import { decodeFunctionData } from 'viem';
import { client, getGenes } from "./lib/helpers";
import { geneScienceAbi, mixGenesFunctionSignature } from "./lib/Abis";

// The query to run
const query: Query = {
  // start from block 0 and go to the end of the chain (we don't specify a toBlock).
  fromBlock: 4605167,
  traces: [{
    sighash: [mixGenesFunctionSignature], to: [
      "0xf97e0A5b616dfFC913e72455Fde9eA8bBe946a2B", // set at 2017/11/23, 07:44:17 in block 4605182 transaction https://etherscan.io/tx/0xdbbd99dce58ca96756fd0768fd3a7dac4dd3d329ad9c0ae4e9d25f1cdf82b0b7)
      "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d", // set at 2017/12/04, 02:59:51 in block 4671368 transaction https://etherscan.io/tx/0x8f172af0c6f426658ab1a1545a100544ae011c77f86062f14a87cc5c08ea5ea3)
      "0x1697734Ae70c62b78A2d7eC18C666D794DF79f69", // set at 2017/12/04, 22:07:05 in block 4675923 transaction https://etherscan.io/tx/0xcd1ed32bd4b6d64163e724cea4d79e2c8ee00acc274fd73f1f9605b227012e64)
      "0xb77FeddB7e627a78140a2a32CAC65A49eD1DBa8E", // set at 2019/02/07, 03:15:31 in block 7185762 transaction https://etherscan.io/tx/0x790c7a8611b8d6f87b44c6891ebd58b8025494b6e010bb18fb14ba984b09220e)
      "0x4fcFd9f5fDa7b27DD731de6dFe15F7CAF79304fA", // set at 2023/12/21, 23:36:23 in block 18836962 transaction https://etherscan.io/tx/0x68b73865c7361bae8ffb83019e521d8c3801e446eef4daca067a3e492dd79863)
    ]
  }],
  fieldSelection: {
    trace: [TraceField.Input, TraceField.Output],
    block: [BlockField.Timestamp],
  },
};


async function main() {
  const receiver = await client.stream(query, {});

  while (true) {
    const res = await receiver.recv();

    if (!res) return;

    res?.data.traces.forEach(({ input, output }) => {
      // Note: the output is "0x" when the transaction fails, eg here: https://etherscan.io/tx/0xe8e00f38b856c3304a9fc1c8755c15df98379a0ae175765504850c197445fd91
      if (!input || !output || output == "0x") return;

      const { args } = decodeFunctionData({
        abi: geneScienceAbi,
        data: input as any,
      })
      console.log(`{"matron": ${args[0].toString(16)}, "sire": ${args[1].toString(16)}, "kitten": ${getGenes(output)}},`);
    });
  }
}

main()
