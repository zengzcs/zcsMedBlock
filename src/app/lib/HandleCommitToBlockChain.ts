import { Web3 } from "web3";
import { getPatientInfoJSON } from "../components/HandleCommit";
import { Base64 } from "js-base64";

export default async function HandleCommitToBlockChain() {
  const data=JSON.stringify(getPatientInfoJSON());
  console.log(data);



  const web3: Web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  );

  var patientstorageContract = new web3.eth.Contract(
    [
      {
        inputs: [],
        name: "retrieve",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "string", name: "info", type: "string" }],
        name: "store",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    "0x98a22f4f477c20285F6CCE511AdFFD8c2700393E"
  );
  const base64Encoded = Base64.encode(data);
  const key = "0x98a22f4f477c20285F6CCE511AdFFD8c2700393E";
  var CryptoJS=require("crypto-js");
  const encrypted = CryptoJS.AES.encrypt(base64Encoded, key);
  console.log(base64Encoded);
  const receipt: any = await patientstorageContract.methods.store(encrypted).send({
    from: "0xba4597c08ea2f46d50ecea77eccce4a7dce15080",
    gas: "1000000",
    gasPrice: "10000000000",
  });
}
