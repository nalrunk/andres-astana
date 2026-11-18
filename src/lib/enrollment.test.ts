import { describe, expect, it } from "vitest";
import { enrollmentSchema } from "./enrollment";

const valid = {
  fullName: "Аружан Ермекова",
  age: "19",
  height: "174",
  contact: "+7 701 123 45 67",
  course: "base-almaty-dec",
  consent: true,
};

describe("course enrollment form", () => {
  it("accepts a complete enrollment with a phone number", () => {
    expect(enrollmentSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts a Telegram username instead of a phone", () => {
    expect(enrollmentSchema.safeParse({ ...valid, contact: "@aruzhan_model" }).success).toBe(true);
  });

  it("requires both first and last name", () => {
    expect(enrollmentSchema.safeParse({ ...valid, fullName: "Аружан" }).success).toBe(false);
  });

  it("requires a selected course", () => {
    expect(enrollmentSchema.safeParse({ ...valid, course: "" }).success).toBe(false);
  });

  it("requires consent to personal data processing", () => {
    expect(enrollmentSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("accepts ages 7–35 only", () => {
    expect(enrollmentSchema.safeParse({ ...valid, age: "6" }).success).toBe(false);
    expect(enrollmentSchema.safeParse({ ...valid, age: "36" }).success).toBe(false);
    expect(enrollmentSchema.safeParse({ ...valid, age: "7" }).success).toBe(true);
  });
});
