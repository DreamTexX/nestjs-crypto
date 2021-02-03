import { Inject, Injectable } from '@nestjs/common';
import { CryptoOptions } from './interfaces/crypto-options';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  constructor(@Inject('CRYPTO_OPTIONS') private options: CryptoOptions) {}

  /**
   * Generates a hash from the given string.
   * 
   * @param password String that should be hashed.
   * @returns Hash containing key and salt separated by the given delimiter.
   */
  public hash(password: string): string {
    const salt = crypto.randomBytes(this.options.saltLength || 16).toString('hex');
    const key = crypto
      .scryptSync(`${this.options.pepper}${password}`, salt, this.options.keyLength || 64)
      .toString('hex');
    return `${key}${this.options.delimiter || ':'}${salt}`;
  }

  /**
   * Checks if the given password matches the given hash.
   * 
   * @param password String that should be matched.
   * @param hash Hash (key and salt sperated by the delimiter) that should match the given password.
   * @returns true if they match, otherwise false.
   */
  public verify(password: string, hash: string): boolean {
    const [hashKey, salt] = hash.split(this.options.delimiter || ':');
    const pwdKey = crypto
      .scryptSync(`${this.options.pepper}${password}`, salt, this.options.keyLength || 64)
      .toString('hex');
    return hashKey === pwdKey;
  }
}
