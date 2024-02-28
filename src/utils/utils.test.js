import { describe, it, expect } from "vitest";
import { formatDate } from "./utils";

describe("formatDate", () => {
  it('formats a given date string to "dd.MM.yyyy"', () => {
    const inputDate = "2023-04-01"; // ISO format
    const expectedOutput = "01.04.2023";

    const result = formatDate(inputDate);

    expect(result).toBe(expectedOutput);
  });

  it("handles Date objects", () => {
    const inputDate = new Date("2023-04-01T00:00:00Z");
    const expectedOutput = "01.04.2023";

    const result = formatDate(inputDate);

    expect(result).toBe(expectedOutput);
  });
});
