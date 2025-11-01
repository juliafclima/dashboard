import { describe, it, expect } from "vitest";
import { parseAmount } from "../../src/utils/parse";

describe("parseAmount", () => {
  it("should convert a valid numeric string (in cents) to a float amount", () => {
    const raw = "123456";
    const expected = 1234.56;
    expect(parseAmount(raw)).toBe(expected);
  });

  it("should handle strings with leading zeros correctly", () => {
    const raw = "0050";
    const expected = 0.5; 
    expect(parseAmount(raw)).toBe(expected);
  });

  it("should return 0 when the input string is empty", () => {
    const raw = "";
    expect(parseAmount(raw)).toBe(0);
  });

  it("should return 0 when the input is null or undefined (if allowed by runtime)", () => {
    expect(parseAmount(null as unknown as string)).toBe(0);
    expect(parseAmount(undefined as unknown as string)).toBe(0);
  });

  it("should return 0 when the input string is not a valid number", () => {
    const raw = "abc123";
    expect(parseAmount(raw)).toBe(0);
  });

  it("should return 0 for strings containing non-numeric characters like dots or commas", () => {
    expect(parseAmount("1.23")).toBe(0.0123);
    expect(parseAmount("1,234")).toBe(0);
  });

  it("should return 0 when the input string is '0'", () => {
    const raw = "0";
    expect(parseAmount(raw)).toBe(0);
  });
});
