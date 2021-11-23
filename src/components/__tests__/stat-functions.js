import { filterByDate, longestWorn } from "../stat-functions";

describe("longestWorn", () => {
  it("Returns the only item when there's only one", () => {
    const colours = [["cinnabar", "e44d2e", "1 Jun 2019"]];
    const output = longestWorn(colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });
});

describe("filterByDate", () => {
  it("Handles no filters", () => {
    const colours = [["cinnabar", "e44d2e", "1 Jun 2019"]];
    const output = filterByDate({}, colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });

  it("Filters by year", () => {
    const colours = [["cinnabar", "e44d2e", "1 Jun 2019"]];
    const output = filterByDate({ year: 2019 }, colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });

  it("Filters by month", () => {
    const colours = [["cinnabar", "e44d2e", "1 Jun 2019"]];
    const output = filterByDate({ month: 6 }, colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });

  it("Filters by day", () => {
    const colours = [["cinnabar", "e44d2e", "1 Jun 2019"]];
    const output = filterByDate({ day: 1 }, colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });

  it("Filters by all", () => {
    const colours = [["cinnabar", "e44d2e", "1 Jun 2019"]];
    const output = filterByDate({ year: 2019, month: 6, day: 1 }, colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });

  it("Handles non-exact dates", () => {
    console.log("Non exact dates test");
    const colours = [
      ["red", "f00", "10 Jun 2019"],
      ["cinnabar", "e44d2e", "1 Jun 2019"]
    ];
    const output = filterByDate({ year: 2019, month: 6, day: 5 }, colours);
    expect(output).toEqual([["cinnabar", "e44d2e"]]);
  });
});
