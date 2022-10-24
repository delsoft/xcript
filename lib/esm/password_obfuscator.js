import { DataTransform } from "./dataTransform";
export class PasswordObfuscator {
    passShaker = new DataTransform();
    varistor;
    constructor(n) {
        this.varistor = n || [1, 2, 3, 5, 7, 11, 13, 21];
    }
    execute(password, salt) {
        salt =
            salt ||
                "Those who can imagine anything, can create the impossible. -- Alan Turing";
        const passW = Array.from(salt + password + "dcec5934-5029-4403-94fb-3931cf223b93");
        this.passShaker.setData(passW);
        this.varistor.forEach((v) => {
            this.passShaker.shake(v);
        });
        return this.passShaker.toArray();
    }
}
