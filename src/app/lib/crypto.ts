
import argon2 from 'argon2'
export interface ICryptoService {
  hashPassword(plaintext: string): Promise<string>
  passwordMatches(plaintext: string, hash: string): Promise<boolean>

}

export class CryptoService implements ICryptoService {

  async hashPassword(plaintext: string): Promise<string> {
    return await argon2.hash(plaintext)
  }
  async passwordMatches(plaintext: string, hash: string) {
    return await argon2.verify(hash, plaintext)
  }
}

const instance = new CryptoService()
export default instance
