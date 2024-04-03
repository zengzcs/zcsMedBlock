import { Web3 } from "web3";
import { getDoctorInfo } from "../components/RegisterDoctor";
import { Base64 } from "js-base64";

export default async function HandleDoctorInfoCommitToBlockChain(
  accountAddress = "0xba4597c08ea2f46d50ecea77eccce4a7dce15080",
  contractAddress = "0xB1fc4D2A7d5326EBEd4B397128c83bb6ce46238f",
  key = "KEY"
) {
  const data = JSON.stringify(getDoctorInfo());
  console.log(data);

  const web3: Web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  );

  var doctorstorageContract = new web3.eth.Contract(
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
  //   console.log(base64Encoded);
  const stringdata = base64Encoded.toString();
  console.log(stringdata);
  console.log(String(encrypted));

  const decrypted = CryptoJS.AES.decrypt(encrypted, key);
  console.log(decrypted.toString(CryptoJS.enc.Utf8));
  console.log(Base64.decode(decrypted.toString(CryptoJS.enc.Utf8)));
  const receipt: any = await doctorstorageContract.methods
    .store(encrypted.toString())
    .send({
      from: "0xba4597c08ea2f46d50ecea77eccce4a7dce15080", //需要写字符串地址，传变量进来会导致堆栈反复调用溢出
      gas: "1000000",
      gasPrice: "10000000000",
    });
}
