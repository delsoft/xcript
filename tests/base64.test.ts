import { Base64 } from "../src/base64";

describe("base 64", () => {
  let base64: Base64;

  beforeEach(() => {
    base64 = new Base64();
  });


  test('should encode "abc"',()=> expect(base64.encode('abc')).toBe('YWJj'));
  test('should encode "123"',()=> expect(base64.encode('123')).toBe('MTIz'));

  test('should decode "YWJj"',()=> expect(base64.decode('YWJj')).toBe('abc'));
  test('should decode "MTIz"',()=> expect(base64.decode('MTIz')).toBe('123'));

  describe('extension',()=>{
    test('should encode "ÿí"',()=> expect(base64.encode2('ÿí')).toBe('w702DrQ0505'));
    test('should decode "w702DrQ0505"',()=> expect(base64.decode2('w702DrQ0505')).toBe('ÿí'));
  })
});
