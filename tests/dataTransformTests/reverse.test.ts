import { DataTransform } from "../../src/dataTransform";

describe("string reverse", () => {
  [
    ["",""],
    ["1","1"], 
    ["12","21"], 
    ["123","321"],
    ["πΈπ","ππΈ"],
    ["ππ€πΈπ","ππΈπ€π"],
    ["π","π"]
  ].forEach(([input, expected]) => {
    test(`should '${input}' reverse to be '${expected}'`,()=>{
         const obj = new DataTransform(); obj.setData(input);
         const reversed = obj.reverse().toString();
         expect(reversed).toBe(expected);
    })
   
  });
});
