export interface CryptoOptions {
    /**
     * String that will be appended to the password before hashing to prevent brut forcing the salt.
     * It should be randomized, at least 32 chars long and can contain ascii characters.<br>
     * <br>
     * This string should not be stored along with the hashed passwords or with the salt.
     * <br>
     * More info about peppers: https://wikipedia.org/wiki/Pepper_(cryptography)
     */
    pepper: string;
    
    /**
     * Length of the random bytes that will be generated for the Salt. Default is 16.<br>
     * The salt is unique for each generated hash, should not be reused and can be stored in
     * the database.<br>
     * <br>
     * Shorter salts will result in weaker hashes.
     */
    saltLength?: number;
    
    /**
     * Length of the key that will be generated. Defaults is 64.
     */
    keyLength?: number;

    /**
     * Delimiter used to split the hash into key and salt. Default is ':'.
     */
    delimiter?: string;
}