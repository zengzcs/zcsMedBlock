import { Web3 } from "web3";
import { Base64 } from "js-base64";

export default async function HandleCommitToBlockChain(
  accountAddress = "0xba4597c08ea2f46d50ecea77eccce4a7dce15080",
  contractAddress = "0x20ce4E871Ef7441677D689d162170C3B08a97E06",
  key = "KEY"
) {
  const data = JSON.stringify("");
  console.log(data);

  const web3: Web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  );
  // console.log("ACCOUTS:" + String(web3.eth.accounts[0]))
  var patientstorageContract = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: "string",
            name: "info",
            type: "string",
          },
        ],
        name: "store",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "retrieve",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    contractAddress
  );

  const base64Encoded = Base64.encode(data);
  var CryptoJS = require("crypto-js");
  const encrypted = CryptoJS.AES.encrypt(base64Encoded, key);
  console.log(base64Encoded);
  const receipt: any = await patientstorageContract.methods.store(base64Encoded).send({
      from: "0xba4597c08ea2f46d50ecea77eccce4a7dce15080",
      gas: "1000000",
      gasPrice: "10000000000",
    });
}
