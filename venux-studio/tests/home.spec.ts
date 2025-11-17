import { test, expect } from "@playwright/test";

test("homepage has title and catalog", async ({ page, baseURL }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(/Catálogo|Venux Bijoux/i);
});
