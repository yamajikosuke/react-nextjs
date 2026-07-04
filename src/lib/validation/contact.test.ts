import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validation/contact";

describe("contactSchema", () => {
  it("accepts valid email", () => {
    expect(contactSchema.safeParse({ email: "test@example.com" }).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(contactSchema.safeParse({ email: "invalid" }).success).toBe(false);
  });
});
