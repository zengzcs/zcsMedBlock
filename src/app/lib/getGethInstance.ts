
import { Web3 } from "web3";

export interface web3Interface {
    getContract(abi: any, contractAddress: string): Promise<any>
    getWeb3(): Promise<any>
    createNewAccount(password: string): Promise<any>
    getContractAddress(): Promise<any>
    getContractAbi(): Promise<any>
    transferFundsToAddress(recipient: string, amount: number, password: string): Promise<any>
    getBaseAccountAddress(): Promise<any>
}
export class Web3Service implements web3Interface {
    private web3:Web3
    constructor() {
        this.web3= new Web3(
          new Web3.providers.HttpProvider("http://localhost:8545")
        );
    }
    getBaseAccountAddress(): Promise<any> {
        const baseAddress = "0xba4597c08ea2f46d50ecea77eccce4a7dce15080";
        return Promise.resolve(baseAddress);
    }
    getContract(abi: any, contractAddress: string): Promise<any> {
        const contract=new this.web3.eth.Contract(abi,contractAddress);
        return Promise.resolve(contract);
    }
    getWeb3(): Promise<any> {
        return Promise.resolve(this.web3);
    }
    async transferFundsToAddress(recipient: string, amount: number,password :string): Promise<any> {
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
            console.log(recipient+":UNLOCKED:"+ await this.web3.eth.personal.unlockAccount(recipient,password,300))
            const someInfo=await this.web3.eth.sendTransaction(info)
            return Promise.resolve(someInfo);
        }
        catch (error) {
            console.log(error);
            return Promise.resolve(error);
        }
        
    }
    async createNewAccount(password: string): Promise<string> {
        
        const add:string=String(await this.web3.eth.personal.newAccount(password).then((address) => {
            console.log('New account address:', address);
            
            return address;
        }).catch((err) => {console.log(err)}))
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
            name: "addPatientInfo",
            outputs: [],
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
        const address = "0xA9Db149f9E9a76fcFcf72D6296B93D0A4BF7Db81";
        return Promise.resolve(address);
    }
}
const instance = new Web3Service();
export default instance;