
import { Web3 } from "web3";

export interface web3Interface{
    getContract(abi: any, contractAddress: string): Promise<any>
    getWeb3(): Promise<any>
}

export class Web3Service implements web3Interface {
    private web3: Web3 | undefined;
    getContract(abi: any, contractAddress: string): Promise<any> {
        this.web3= new Web3(
          new Web3.providers.HttpProvider("http://localhost:8545")
        );
        
        const contract=new this.web3.eth.Contract(abi,contractAddress);
        return Promise.resolve(contract);
    }
    getWeb3(): Promise<any> {
        return Promise.resolve(this.web3);
    }

}
const instance = new Web3Service();
export default instance;