import { describe, it, expect } from "vitest";
import { formatCurrency } from "../../src/utils/currency"; 

describe("formatCurrency", () => {
  it("should format a positive number to BRL currency with default locale", () => {
    const result = formatCurrency(1234.56);
    expect(result).toMatch(/R\$\s?1\.234,56/);
  });

  it("should format zero correctly", () => {
    const result = formatCurrency(0);
    expect(result).toMatch(/R\$\s?0,00/);
  });

  it("should format a negative number correctly", () => {
    const result = formatCurrency(-100.5);
    expect(result).toMatch(/-R\$\s?100,50/);
  });

  it("should format a number to USD currency with en-US locale", () => {
    const result = formatCurrency(5000.75, "USD", "en-US");
    expect(result).toBe("$5,000.75");
  });

  it("should format a number to EUR currency with pt-BR locale", () => {
    const result = formatCurrency(99.99, "EUR", "pt-BR");
    expect(result).toMatch(/€\s?99,99/);
  });

  it("should format an integer number correctly", () => {
    const result = formatCurrency(2000);
    expect(result).toMatch(/R\$\s?2\.000,00/);
  });
});
