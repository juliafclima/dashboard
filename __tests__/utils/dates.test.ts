import { describe, it, expect } from "vitest";
import { formatDate, isWithinRange } from "../../src/utils/dates";
import { subDays } from "date-fns";

describe("formatDate", () => {
  const TEST_EPOCH = 1698393600000;

  it("should format the date using the default pattern 'dd/MM/yyyy'", () => {
    const result = formatDate(TEST_EPOCH);
    expect(result).toBe("27/10/2023");
  });

  it("should format the date using a custom pattern 'yyyy-MM-dd'", () => {
    const result = formatDate(TEST_EPOCH, "yyyy-MM-dd");
    expect(result).toBe("2023-10-27");
  });

  it("should format the date using a custom pattern with time 'HH:mm:ss'", () => {
    const result = formatDate(TEST_EPOCH, "HH:mm:ss");
    const expectedHours = new Date(TEST_EPOCH)
      .getHours()
      .toString()
      .padStart(2, "0");
    const expectedMinutes = new Date(TEST_EPOCH)
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const expectedSeconds = new Date(TEST_EPOCH)
      .getSeconds()
      .toString()
      .padStart(2, "0");
    expect(result).toBe(
      `${expectedHours}:${expectedMinutes}:${expectedSeconds}`
    );
  });
});

describe("isWithinRange", () => {
  const TARGET_DATE_EPOCH = new Date("2023-10-15T12:00:00Z").getTime();

  const START_RANGE = "2023-10-01";
  const END_RANGE = "2023-10-31";

  it("should return true when both 'from' and 'to' are undefined", () => {
    expect(isWithinRange(TARGET_DATE_EPOCH)).toBe(true);
    expect(isWithinRange(TARGET_DATE_EPOCH, undefined, undefined)).toBe(true);
  });

  it("should return true when epochMs is within the range [from, to]", () => {
    const result = isWithinRange(TARGET_DATE_EPOCH, START_RANGE, END_RANGE);
    expect(result).toBe(true);
  });

  it("should return false when epochMs is before the 'from' date", () => {
    const dateBefore = subDays(new Date(START_RANGE), 1)
      .toISOString()
      .split("T")[0];
    const result = isWithinRange(
      new Date(dateBefore).getTime(),
      START_RANGE,
      END_RANGE
    );
    expect(result).toBe(false);
  });

  it("should return true when epochMs is exactly the 'from' date", () => {
    const result = isWithinRange(
      new Date(START_RANGE).getTime(),
      START_RANGE,
      END_RANGE
    );
    expect(result).toBe(true);
  });

  it("should return true when epochMs is exactly the 'to' date (start of day)", () => {
    const result = isWithinRange(
      new Date(END_RANGE).getTime(),
      START_RANGE,
      END_RANGE
    );
    expect(result).toBe(true);
  });

  it("should return true when epochMs is equal to or after 'from', with no 'to'", () => {
    expect(isWithinRange(TARGET_DATE_EPOCH, START_RANGE, undefined)).toBe(true);
    expect(
      isWithinRange(new Date(START_RANGE).getTime(), START_RANGE, undefined)
    ).toBe(true);
    expect(
      isWithinRange(new Date("2023-09-30").getTime(), START_RANGE, undefined)
    ).toBe(false);
  });
});
