import { DataTransform } from "../../src/dataTransform";

describe("string shake", () => {
  const factorFixture = [2, 3, 5, 6, 10, 15, 30];
  const plainTextFixture = ["1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ","🌍🤖😸🎉"];

  const inputFixture: string[][] = factorFixture.map((j) => plainTextFixture.map((q) => [q, `${j}`])).flat();

  let obj: DataTransform;
  beforeEach(() => {
    obj = new DataTransform();
  });

  it.each(inputFixture)("should shake '%s' with random factor %s", (input, num) => {
    obj.setData(input);
    const n = parseInt(num);
    const mix = obj.shake(n).toString();
    const reversed = obj.shake(n, true).toString();
    expect(reversed).toBe(input);
    expect(mix).not.toBe(input);
  });

});
