import { longestWorn } from "../stat-functions";

describe("longestWorn", () => {
  it("Returns the only item when there's only one", () => {
    const colours = [["cinnabar", "e44d2e", "1 Jun 2019"]];
    const output = longestWorn(colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });
});
