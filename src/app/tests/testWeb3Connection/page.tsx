"use client";
import { useState } from "react";
import { Web3 } from "web3";

function App() {
  return (
    <>
      <BasicTextFields></BasicTextFields>
    </>
  );
}

export default App;
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function BasicTextFields() {
  const [result, setResult] = useState(0);
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="contractAddress" label="合约地址" variant="filled" />
        <Button onClick={handle}>执行</Button>
        <TextField id="filled-basic" label={result} variant="filled" />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="JSON-String" label="JSON字符串" variant="filled" />
        <Button onClick={store}>存储</Button>

        <TextField id="filled-basic" label={result} variant="filled" />
      </Box>
    </div>
  );

  async function store() {
    const data = String(document.getElementById("JSON-String").value);
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
      "0x20ce4E871Ef7441677D689d162170C3B08a97E06"
    );



    const receipt: any = await patientstorageContract.methods.store(data).send({
      from: "0xba4597c08ea2f46d50ecea77eccce4a7dce15080",
      gas: "1000000",
      gasPrice: "10000000000",
    });
  }

  async function handle() {
    const address = document.getElementById("contractAddress").value;
    const web3: Web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
    var storageContract = new web3.eth.Contract(
      [
        {
          inputs: [],
          name: "retrieve",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "num", type: "uint256" }],
          name: "store",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      address
    );

    const result = await storageContract.methods.retrieve().call();
    console.log(result);
  }
}
