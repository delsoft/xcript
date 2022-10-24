import { Base64 } from "./base64";
import { DataTransform } from "./dataTransform";
import { PasswordIterator } from "./password_iterator";
import { PasswordObfuscator } from "./password_obfuscator";
export class Encrypter {
    base64;
    passIterator;
    passObf;
    /**
     * custom random number array useful for uniquely scrambling data
     * @param s array of random numbers
     */
    constructor(scrambly) {
        this.passObf = new PasswordObfuscator(scrambly);
        this.passIterator = new PasswordIterator(this.passObf.execute("admin"));
        this.base64 = new Base64();
    }
    /**
     * set password and optional salt
     * @param password user private key to access encrypted data.
     * @param salt additional input data to defend against attacks that use precomputed tables. Ex.: salt = 'it's a salt input, and I bet you can't guess who am i'
     */
    setPassword(password, salt) {
        const passObf = new PasswordObfuscator();
        this.passIterator = new PasswordIterator(passObf.execute(password, salt));
        this.base64 = new Base64();
    }
    /**
     * convert plainText to encrypted data
     * @param plainText data to encrypt
     * @returns encrypted data
     */
    encrypt(plainText) {
        this.passIterator.reset();
        // 1-  create array
        const obfuscator = new DataTransform();
        obfuscator.setData(plainText);
        // 2 - calc n
        const shift = Math.trunc(Math.random() * 128);
        const shiftChar = String.fromCodePoint(shift);
        // 3 - shake n
        obfuscator.shake(shift);
        // 4 -set delta
        this.passIterator.delta = Math.trunc(Math.random() * 128);
        this.passIterator.step = this.passIterator.delta & 7;
        const deltaChar = String.fromCodePoint(this.passIterator.delta);
        // 5- remap
        const items = obfuscator.toArray().map((v) => {
            var c = this.passIterator.next() + (v.codePointAt(0) || 0);
            return String.fromCodePoint(c);
        });
        // 6- add r
        items.unshift(shiftChar, deltaChar);
        const encripted = items.join("");
        // 7- base 64
        let encoded = this.base64.encode2(encripted);
        // 8-shake
        obfuscator.setData(encoded);
        obfuscator.rotate(5).shuffle().reverse();
        // 9 output
        return obfuscator.toString();
    }
    /**
     * convert encrypted data to plain text
     * @param cipherText encrypted data
     * @returns plain text
     */
    decrypt(cipherText) {
        this.passIterator.reset();
        // 9- input
        const desobfuscator = new DataTransform();
        desobfuscator.setData(cipherText);
        //8- shake
        const encoded = desobfuscator
            .reverse()
            .deshuffle()
            .rotate(5, true)
            .toString();
        //7- base 64
        let decoded = this.base64.decode2(encoded);
        let items = Array.from(decoded);
        // 6- shift r
        const shiftChar = items.shift() || "";
        const shift = shiftChar.codePointAt(0);
        // 5- remap
        this.passIterator.delta = (items.shift() || "").codePointAt(0);
        this.passIterator.step = this.passIterator.delta & 7;
        items = items.map((v) => {
            var c = (v.codePointAt(0) || 0) - this.passIterator.next();
            return String.fromCodePoint(c);
        });
        // 3 - shake n
        desobfuscator.setData(items);
        desobfuscator.shake(shift, true);
        return desobfuscator.toString();
    }
}
