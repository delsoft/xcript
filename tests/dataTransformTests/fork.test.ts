import { DataTransform } from "../../src/dataTransform";

describe("string fork", () => {
  const fixture = [["1"], ["12"], ["123"], ["πΈπ"], ["ππ€πΈπ"], ["π"]];
  let obj: DataTransform;

  beforeEach(() => (obj = new DataTransform()));

  it.each(fixture)("should fork '%s'", (input) => {
    obj.setData(input);
    obj.fork(1);
    const left = obj.toString("left");
    const right = obj.toString("right");
    const all = obj.toString("all");
    const def = obj.toString();

    expect(def).toBe(all);
    expect(left + right).toBe(all);
    expect(right).not.toBe(left);
  });
});
