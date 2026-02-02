import { describe, it, expect } from "vitest";
import { formatNGN } from "../../utils/format";

describe("formatNGN", () => {
  it("formats NGN currency", () => {
    expect(formatNGN(200000)).toContain("₦");
  });
});
