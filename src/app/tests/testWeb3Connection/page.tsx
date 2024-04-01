"use client";
import { useState } from "react";
import { Web3 } from "web3";

function App() {
  async function testContract() {
    var abi = [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "num",
            type: "uint256",
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
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    var address = "0xE08255E9f64AfA9D63c87ac3837dc7A6Ec30210d";

    const web3: Web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:9545")
    );
    const metacoin = new web3.eth.Contract(abi, address);
    const providersAccounts: string[] = await web3.eth.getAccounts();
    const defaultAccount: string = providersAccounts[0];
    // setInfo(defaultAccount)
    const myNumber = await metacoin.methods.retrieve().call();
    console.log(myNumber);
    setInfo(await metacoin.methods.retrieve().call());
  }
  //state to store and show the connected account
  const [connectedAccount, setConnectedAccount] = useState("null");
  const [info, setInfo] = useState(233);
  async function connectMetamask() {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      alert("Please download metamask");
    }
  }

  return (
    <>
      {/* Button to trigger Metamask connection */}
      <button onClick={() => connectMetamask()}>Connect to Metamask</button>

      {/* Display the connected account */}
      <h2>{connectedAccount}</h2>
      <button onClick={() => testContract()}>testContract</button>
      <h2>{info}</h2>

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
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="contractAddress" label="合约地址" variant="filled" />
      <Button onClick={handle} >执行</Button>
      <TextField id="filled-basic" label={result} variant="filled" />
    </Box>
  );
  async function handle() {
  
    const address = document.getElementById("contractAddress").value;
    const web3: Web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
   

    const abi = [
      {
        inputs: [],
        name: "retrieve",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
   
     console.log("add" + address);
    const myContract = new web3.eth.Contract(abi, address);
    const a = await myContract.methods.retrieve().call()
    console.log(a)
    setResult(Number(a))
  }
}