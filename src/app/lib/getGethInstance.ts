import { Base64 } from "js-base64";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Web3 } from "web3";

export interface web3Interface {
  getContract(): Promise<any>;
  getWeb3(): Promise<any>;
  createNewAccount(password: string): Promise<any>;
  getContractAddress(): Promise<any>;
  getContractAbi(): Promise<any>;
  transferFundsToAddress(
    recipient: string,
    amount: number,
    password: string
  ): Promise<any>;
  getBaseAccountAddress(): Promise<any>;
  createAccountBy10EhtersAndGetAddAndCrypto(obj: Object): Promise<any>;
  addPatientInfo(obj: Object): Promise<any>;
  addDoctorInfo(obj: Object): Promise<any>;
  addInstitutionInfo(obj: Object): Promise<any>;
  authorizedPatientInfoToDoctor(json: string): Promise<any>;
  addAdminInfo(obj: Object): Promise<any>;
  getAccountBalance(address: string): Promise<any>;
  unlockAccount(address: string, password: string): Promise<any>;
}
export class Web3Service implements web3Interface {
  private web3: Web3;
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
  }
  async unlockAccount(address: string, password: string): Promise<any> {
    console.log(
      address +
        ":UNLOCKED:" +
        (await this.web3.eth.personal.unlockAccount(address, password, 300))
    );
  }
  async authorizedPatientInfoToDoctor(json: string): Promise<any> {
    const session = await getSession();
    const obj = JSON.parse(json);
    try {
      return this.getContract().then(async (res) => {
        const presponse = await fetch(
          "http://localhost:3000/api/getPatientById",
          {
            method: "POST",
            body: JSON.stringify({
              patientId: obj.patientId,
              password: "1",
            }),
          }
        );
        const pdat = await presponse.json();
        console.log("pdat.data");
        console.log(pdat.data);
        const patientAddress = pdat.data.accountAddress;

        const dresponse = await fetch(
          "http://localhost:3000/api/getDoctorById",
          {
            method: "POST",
            body: JSON.stringify({
              doctorId: obj.doctorId,
              password: "1",
            }),
          }
        );

        const ddat = await dresponse.json();
        console.log("ddat");
        console.log(ddat.data);
        const doctorAddress = ddat.data.accountAddress;

        console.log("ADDRESS");
        console.log(patientAddress);
        console.log(doctorAddress);

        const paddress = this.web3.utils.toChecksumAddress(patientAddress);
        const daddress = this.web3.utils.toChecksumAddress(doctorAddress);
        console.log("auth:");
        console.log("paddress:", paddress);
        console.log("daddress:", daddress);
        const password = String(session?.user?.image);
        console.log("password");
        console.log(password);
        await this.unlockAccount(paddress, password);
        // await this.unlockAccount(daddress, ddat.data.password);
        try {
          const result = await res.methods
            .patientAuthorizeDoctorInfo(paddress, daddress)
            .send({
              from: patientAddress,
              gas: "1000000",
              gasPrice: "10000000000",
            })
            .then((re) => {
              console.log(re);
            });
          return Promise.resolve("ok")
        } catch (e) {
          console.log("授权错误")
          console.log(e)
          return Promise.resolve("failed");
        }
      });
    } catch (error) {
      console.error("There was a problem with the auth operation:", error);
    }
  }
  async getAccountBalance(address: string): Promise<any> {
    const balance = await this.web3.eth.getBalance(address);
    const balanceInEther = this.web3.utils.fromWei(balance, "ether");
    return Promise.resolve(balanceInEther);
  }
  async addAdminInfo(obj: Object): Promise<any> {
    const [jsonPayload, encrypted] =
      await this.createAccountBy10EhtersAndGetAddAndCrypto(JSON.stringify(obj));
    this.getContract().then((res) => {
      res.methods
        .addAdminInfo(encrypted)
        .send({
          from: JSON.parse(jsonPayload).accountAddress,
          gas: "1000000",
          gasPrice: "10000000000",
        })
        .then((re) => {
          console.log(re);
        });
    });
    return Promise.resolve(jsonPayload);
  }
  async addInstitutionInfo(obj: Object): Promise<any> {
    const [jsonPayload, encrypted] =
      await this.createAccountBy10EhtersAndGetAddAndCrypto(JSON.stringify(obj));
    this.getContract().then((res) => {
      res.methods
        .addMedicalInstitutionInfo(encrypted)
        .send({
          from: JSON.parse(jsonPayload).accountAddress,
          gas: "1000000",
          gasPrice: "10000000000",
        })
        .then((re) => {
          console.log(re);
        });
    });
    return Promise.resolve(jsonPayload);
  }
  async addDoctorInfo(obj: Object): Promise<any> {
    const [jsonPayload, encrypted] =
      await this.createAccountBy10EhtersAndGetAddAndCrypto(JSON.stringify(obj));
    this.getContract().then((res) => {
      res.methods
        .addDoctorInfo(encrypted)
        .send({
          from: JSON.parse(jsonPayload).accountAddress,
          gas: "1000000",
          gasPrice: "10000000000",
        })
        .then((re) => {
          console.log(re);
        });
    });
    return Promise.resolve(jsonPayload);
  }
  async addPatientInfo(obj: Object): Promise<string> {
    const [jsonPayload, encrypted] =
      await this.createAccountBy10EhtersAndGetAddAndCrypto(JSON.stringify(obj));
    this.getContract().then((res) => {
      res.methods
        .addPatientInfo(encrypted)
        .send({
          from: JSON.parse(jsonPayload).accountAddress,
          gas: "1000000",
          gasPrice: "10000000000",
        })
        .then((re) => {
          console.log(re);
        });
    });
    return Promise.resolve(jsonPayload);
  }
  async createAccountBy10EhtersAndGetAddAndCrypto(
    info: string
  ): Promise<[string, string]> {
    try {
      const obj = JSON.parse(info);
      if (obj.password === undefined || obj.password === "") {
        throw new Error("Password is required");
      }

      const accountAddress = this.createNewAccount(obj.password);
      var add = "";
      await accountAddress.then((res) => {
        console.log("AA" + res);
        add = res;
      });

      obj.accountAddress = add;

      const jsonPayload = JSON.stringify(obj);

      console.log("jsonPayload:" + jsonPayload);

      const abi = await this.getContractAbi().then();
      const contractAddress = await this.getContractAddress().then();
      const contract = this.getContract();
      const isAllocateEtherSuccess = await this.transferFundsToAddress(
        obj.accountAddress,
        10,
        obj.password
      );
      console.log("isAllocateEtherSuccess:" + isAllocateEtherSuccess);
      const base64Encoded = Base64.encode(jsonPayload);
      var CryptoJS = require("crypto-js");
      const encrypted = String(
        Base64.encode(String(CryptoJS.AES.encrypt(base64Encoded, obj.password)))
      );
      console.log("base64Encoded:" + base64Encoded);
      console.log("encrypted:" + encrypted);

      return Promise.resolve([jsonPayload, encrypted]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  getBaseAccountAddress(): Promise<any> {
    const baseAddress = "0xba4597c08ea2f46d50ecea77eccce4a7dce15080";
    return Promise.resolve(baseAddress);
  }
  async getContract(): Promise<any> {
    const contract = new this.web3.eth.Contract(
      await this.getContractAbi(),
      await this.getContractAddress()
    );
    return Promise.resolve(contract);
  }
  getWeb3(): Promise<any> {
    return Promise.resolve(this.web3);
  }
  async transferFundsToAddress(
    recipient: string,
    amount: number,
    password: string
  ): Promise<any> {
    try {
      const info = {
        from: await this.getBaseAccountAddress(),
        to: recipient,
        value: this.web3.utils.toWei(amount, "ether"),
        gas: "1000000",
        gasPrice: "10000000000",
      };
      console.log(info);
      console.log(
        (await this.getBaseAccountAddress()) +
          ":UNLOCKED:" +
          (await this.web3.eth.personal.unlockAccount(
            await this.getBaseAccountAddress(),
            "zhao",
            300
          ))
      );
      console.log(
        recipient +
          ":UNLOCKED:" +
          (await this.web3.eth.personal.unlockAccount(recipient, password, 300))
      );
      const someInfo = await this.web3.eth.sendTransaction(info);
      return Promise.resolve(someInfo);
    } catch (error) {
      console.log(error);
      return Promise.resolve(error);
    }
  }
  async createNewAccount(password: string): Promise<string> {
    const add: string = String(
      await this.web3.eth.personal
        .newAccount(password)
        .then((address) => {
          console.log("New account address:", address);

          return address;
        })
        .catch((err) => {
          console.log(err);
        })
    );
    return Promise.resolve(add);
  }
  getContractAbi(): Promise<any> {
    const abi = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_pb64i",
            type: "string",
          },
        ],
        name: "addAdminInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_pb64i",
            type: "string",
          },
        ],
        name: "addDoctorInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_pb64i",
            type: "string",
          },
        ],
        name: "addMedicalInstitutionInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_pb64i",
            type: "string",
          },
        ],
        name: "addPatientInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "padd",
            type: "address",
          },
          {
            internalType: "address",
            name: "dadd",
            type: "address",
          },
        ],
        name: "patientAuthorizeDoctorInfo",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "padd",
            type: "address",
          },
          {
            internalType: "address",
            name: "iadd",
            type: "address",
          },
        ],
        name: "patientAuthorizeInstitution",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "add",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "PatientInfoCreate",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "add",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "PatientInfoReaded",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "padd",
            type: "address",
          },
          {
            internalType: "address",
            name: "dadd",
            type: "address",
          },
        ],
        name: "patientRevokeAuthorizationDoctorInfo",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "padd",
            type: "address",
          },
        ],
        name: "PatientInfoRead",
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
      {
        inputs: [],
        name: "testConnection",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "toString",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "toString",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "toString",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "value",
            type: "bytes32",
          },
        ],
        name: "toString",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
    ];
    return Promise.resolve(abi);
  }
  getContractAddress(): Promise<any> {
    const address = "0x6b2F1252aB0E82A4f3804450159a9adF454f0004";
    return Promise.resolve(address);
  }
}
const instance = new Web3Service();
export default instance;
