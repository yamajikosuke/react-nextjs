import { expect, test } from "@playwright/test";

test("home page renders starter title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Next.js 15 + React 19 Starter" })).toBeVisible();
});
