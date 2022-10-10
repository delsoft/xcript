import { DataTransform } from "../../src/dataTransform";

describe("string shuffle", () => {
  
  const fixtures = [
    ["123","132"],
    ["🌍🤖😸🎉","🌍😸🤖🎉"],
    ["ABCD1234","A1B2C3D4"],
  ];

  it.each(fixtures)("should shuffle '%s'  to '%s'",(input, expected)=>{
    const obj = new DataTransform();obj.setData(input);
    const result = obj.shuffle().toString();
    const reverse = obj.deshuffle().toString();

    expect(result).not.toBe(input);
    expect(result).toBe(expected);
    expect(reverse).toBe(input);
  });

});
