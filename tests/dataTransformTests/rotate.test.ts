import { DataTransform } from "../../src/dataTransform";

describe("string rotate", () => {

  const fixture = [
    ["",""],
    ["1","1"], 
    ["12","21"], 
    ["123","231"],
    ["😸🎉","🎉😸"],
    ["🌍🤖😸🎉","🤖😸🎉🌍"],
    ["😂","😂"]
  ];

  it.each(fixture)('should rotate \'%s\' to \'%s\'',(input,expected)=>{

    const obj = new DataTransform();obj.setData(input);
    const result = obj.rotate(1).toString();
    const reverse = obj.rotate(1,true).toString();
    expect(result).toBe(expected);
    expect(reverse).toBe(input);

  });

  

});
