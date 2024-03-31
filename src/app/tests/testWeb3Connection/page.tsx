"use client";
import { useState } from "react";
import { Web3 } from "web3";

function App() {
  async function testContract() {
    
    var abi = [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "myNumber",
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
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_myNumber",
            type: "uint256",
          },
        ],
        name: "setMyNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
      var address = "0x6ef9800C5a8e4A3b2F05BCa0b5e4F3b41280420f";
      
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const metacoin = new web3.eth.Contract(abi, address);
    const providersAccounts: string[] = await web3.eth.getAccounts();
      const defaultAccount: string = providersAccounts[0];
      setInfo(defaultAccount)

setInfo(await metacoin.methods.myNumber().call())
  }
  //state to store and show the connected account
  const [connectedAccount, setConnectedAccount] = useState("null");
  const [info, setInfo] = useState("null");
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
    </>
  );
}

export default App;
