import argon2 from "argon2";
import { randomBytes } from "crypto";
export interface ICryptoService {
  hashPassword(plaintext: string): Promise<string>;
  passwordMatches(plaintext: string, hash: string): Promise<boolean>;
  verifyUsers(userid: string, password: string): Promise<boolean>;
  createRandomPassword(): Promise<string>;
}

export class CryptoService implements ICryptoService {
  async hashPassword(plaintext: string): Promise<string> {
    return await argon2.hash(plaintext);
  }
  async createRandomPassword(): Promise<string> {
    return Promise.resolve(randomBytes(32).toString("hex"));
  }
  async passwordMatches(plaintext: string, hash: string) {
    return await argon2.verify(hash, plaintext);
  }
  async verifyUsers(userid: string, password: string): Promise<boolean> {
    const responseData = await fetch(
      "/api/getUserInfoByUserId?userid=" + userid
    );
    const jsonData = await responseData.json();
    
    console.log("user json");
    console.log(jsonData);
    return Promise.resolve(
      await this.passwordMatches(jsonData.userId, jsonData.password)
    );
  }
}

const instance = new CryptoService();
export default instance;
