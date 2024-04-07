
import { Web3 } from "web3";

export interface web3Interface {
    getContract(abi: any, contractAddress: string): Promise<any>
    getWeb3(): Promise<any>
    createNewAccount(password: string): Promise<any>
}
export class Web3Service implements web3Interface {
    private web3:Web3
    constructor() {
        this.web3= new Web3(
          new Web3.providers.HttpProvider("http://localhost:8545")
        );
    }
    getContract(abi: any, contractAddress: string): Promise<any> {
        const contract=new this.web3.eth.Contract(abi,contractAddress);
        return Promise.resolve(contract);
    }
    getWeb3(): Promise<any> {
        return Promise.resolve(this.web3);
    }
    async createNewAccount(password: string): Promise<string> {
        
        const add:string=String(await this.web3.eth.personal.newAccount(password).then((address) => {
            console.log('New account address:', address);
            
            return address;
        }).catch((err) => {console.log(err)}))
        return Promise.resolve(add);
    }

}
const instance = new Web3Service();
export default instance;