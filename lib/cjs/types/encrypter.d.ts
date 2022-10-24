export declare class Encrypter {
    private base64;
    private passIterator;
    private passObf;
    /**
     * custom random number array useful for uniquely scrambling data
     * @param s array of random numbers
     */
    constructor(scrambly?: number[]);
    /**
     * set password and optional salt
     * @param password user private key to access encrypted data.
     * @param salt additional input data to defend against attacks that use precomputed tables. Ex.: salt = 'it's a salt input, and I bet you can't guess who am i'
     */
    setPassword(password: string, salt?: string): void;
    /**
     * convert plainText to encrypted data
     * @param plainText data to encrypt
     * @returns encrypted data
     */
    encrypt(plainText: string): string;
    /**
     * convert encrypted data to plain text
     * @param cipherText encrypted data
     * @returns plain text
     */
    decrypt(cipherText: string): string;
}
//# sourceMappingURL=encrypter.d.ts.map