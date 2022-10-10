import { Encrypter } from "../src/encrypter";

describe("encrypter", () => {
  let encrypter: Encrypter;
  const fixtures = [
    [""],
    ["a"],
    ["1"],
    ["@"],
    ["á"],
    ["abababababababababababababab"],
    ["a1#a1#a1#a1#a1#a1#a1#a1#a1#a1#"],
  ];

  beforeEach(() => {
    encrypter = new Encrypter();
    encrypter.setPassword("my salt", "my password");
  });


  it.each(fixtures)("`should encrypt/decrypt %s`", (v) => {
      const e = encrypter.encrypt(v);
      const d = encrypter.decrypt(e);

      expect(d).toBe(v);
  });

  it.each(fixtures)("should not repeat encrypt hash'%s'", (v) => {
      let e = encrypter.encrypt(v);
      let d = encrypter.encrypt(v);
      let f = encrypter.encrypt(v);
      expect(d).not.toBe(e);
      expect(e).not.toBe(f);

      e = encrypter.decrypt(e);
      d = encrypter.decrypt(d);
      f = encrypter.decrypt(f);
      expect(d).toBe(e);
      expect(e).toBe(f);
      expect(f).toBe(v);
  });

});
