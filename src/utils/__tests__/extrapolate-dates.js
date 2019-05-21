import extrapolateDates from "../extrapolate-dates";

describe("extrapolateDates", () => {
  it("Empty list should return empty list", () => {
    const input = [];
    const output = extrapolateDates(input);
    expect(output).toEqual([]);
  });

  it("Single item list should return same list", () => {
    const input = [["mikado yellow", "ffc40c", "1 Apr 2019"]];
    const output = extrapolateDates(input);
    expect(output).toEqual(input);
  });

  it("Should extrapolate between dates", () => {
    const input = [
      ["green", "00ff00", "6 Apr 2019"],
      ["red", "ff0000", "3 Apr 2019"],
      ["mikado yellow", "ffc40c", "1 Apr 2019"]
    ];
    const output = extrapolateDates(input);
    expect(output).toEqual([
      ["green", "00ff00", "6 Apr 2019"],
      ["red", "ff0000", "5 Apr 2019"],
      ["red", "ff0000", "4 Apr 2019"],
      ["red", "ff0000", "3 Apr 2019"],
      ["mikado yellow", "ffc40c", "2 Apr 2019"],
      ["mikado yellow", "ffc40c", "1 Apr 2019"]
    ]);
  });

  it("Should extrapolate dates to given date string if specified", () => {
    const input = [
      ["green", "00ff00", "6 Apr 2019"],
      ["red", "ff0000", "3 Apr 2019"],
      ["mikado yellow", "ffc40c", "1 Apr 2019"]
    ];
    const output = extrapolateDates(input, "8 Apr 2019");
    expect(output).toEqual([
      ["green", "00ff00", "8 Apr 2019"],
      ["green", "00ff00", "7 Apr 2019"],
      ["green", "00ff00", "6 Apr 2019"],
      ["red", "ff0000", "5 Apr 2019"],
      ["red", "ff0000", "4 Apr 2019"],
      ["red", "ff0000", "3 Apr 2019"],
      ["mikado yellow", "ffc40c", "2 Apr 2019"],
      ["mikado yellow", "ffc40c", "1 Apr 2019"]
    ]);
  });

  it("Should extrapolate dates to given date object if specified", () => {
    const input = [
      ["green", "00ff00", "6 Apr 2019"],
      ["red", "ff0000", "3 Apr 2019"],
      ["mikado yellow", "ffc40c", "1 Apr 2019"]
    ];
    const output = extrapolateDates(input, new Date(2019, 3, 8));
    expect(output).toEqual([
      ["green", "00ff00", "8 Apr 2019"],
      ["green", "00ff00", "7 Apr 2019"],
      ["green", "00ff00", "6 Apr 2019"],
      ["red", "ff0000", "5 Apr 2019"],
      ["red", "ff0000", "4 Apr 2019"],
      ["red", "ff0000", "3 Apr 2019"],
      ["mikado yellow", "ffc40c", "2 Apr 2019"],
      ["mikado yellow", "ffc40c", "1 Apr 2019"]
    ]);
  });
});
