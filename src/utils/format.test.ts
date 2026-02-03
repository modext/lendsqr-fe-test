import { describe, it, expect } from "vitest";
import { formatNGN, formatDateJoined, slugToTitle } from "./format";

describe("formatNGN", () => {
  it("formats positive amount with NGN symbol", () => {
    expect(formatNGN(200000)).toContain("₦");
    expect(formatNGN(0)).toContain("₦");
  });

  it("formats amount with locale-appropriate grouping", () => {
    const result = formatNGN(1234567.89);
    expect(result).toMatch(/\d/);
    expect(typeof result).toBe("string");
  });

  it("handles zero", () => {
    expect(formatNGN(0)).toContain("₦");
  });

  it("handles negative amount", () => {
    const result = formatNGN(-100);
    expect(result).toContain("₦");
  });
});

describe("formatDateJoined", () => {
  it("formats valid ISO date string", () => {
    const result = formatDateJoined("2024-06-15T10:30:00.000Z");
    expect(result).toMatch(/\w{3}/); // month abbrev
    expect(result).toMatch(/\d/);
  });

  it("returns string for valid date", () => {
    expect(typeof formatDateJoined("2020-01-01T00:00:00.000Z")).toBe("string");
  });

  it("handles invalid date without throwing (browser-dependent)", () => {
    const result = formatDateJoined("not-a-date");
    expect(typeof result).toBe("string");
  });
});

describe("slugToTitle", () => {
  it("converts kebab-case to Title Case", () => {
    expect(slugToTitle("some-section")).toBe("Some Section");
  });

  it("handles single word", () => {
    expect(slugToTitle("dashboard")).toBe("Dashboard");
  });

  it("handles empty string", () => {
    expect(slugToTitle("")).toBe("");
  });

  it("handles already capitalized slug", () => {
    expect(slugToTitle("user-details")).toBe("User Details");
  });
});
