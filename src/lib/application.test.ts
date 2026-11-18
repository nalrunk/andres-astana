import { describe, expect, it } from "vitest";
import { applicationSchema } from "./application";

const valid = { name: "Аружан", city: "Алматы", height: "176", contact: "@anna_model" };

describe("quick application form", () => {
  it("accepts a complete application with a Telegram username", () => {
    expect(applicationSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts a social network link instead of Telegram", () => {
    expect(applicationSchema.safeParse({ ...valid, contact: "https://instagram.com/anna" }).success).toBe(true);
  });

  it("rejects a height outside 140–210 cm", () => {
    expect(applicationSchema.safeParse({ ...valid, height: "120" }).success).toBe(false);
    expect(applicationSchema.safeParse({ ...valid, height: "230" }).success).toBe(false);
  });

  it("rejects an empty name or city", () => {
    expect(applicationSchema.safeParse({ ...valid, name: " " }).success).toBe(false);
    expect(applicationSchema.safeParse({ ...valid, city: "" }).success).toBe(false);
  });
});
