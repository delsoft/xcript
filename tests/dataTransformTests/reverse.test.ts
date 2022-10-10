import { DataTransform } from "../../src/dataTransform";

describe("string reverse", () => {
  [
    ["",""],
    ["1","1"], 
    ["12","21"], 
    ["123","321"],
    ["😸🎉","🎉😸"],
    ["🌍🤖😸🎉","🎉😸🤖🌍"],
    ["😂","😂"]
  ].forEach(([input, expected]) => {
    test(`should '${input}' reverse to be '${expected}'`,()=>{
         const obj = new DataTransform(); obj.setData(input);
         const reversed = obj.reverse().toString();
         expect(reversed).toBe(expected);
    })
   
  });
});
