import { test, expect } from "@playwright/test";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

test("login, add to cart and place order", async ({ page, request }) => {
  // Login via backend API to get access token
  const login = await request.post(`${API_BASE}/auth/login`, {
    data: { email: "admin@local", password: "secret" },
  });
  expect(login.ok()).toBeTruthy();
  const loginBody = await login.json();
  const token = loginBody.accessToken;
  // Set token in localStorage before page load
  await page.addInitScript((t) => {
    window.localStorage.setItem("venux:token", t);
  }, token);

  // Visit catalog
  await page.goto("/");
  // Click first Add button
  const addBtn = page.locator("button", { hasText: "Adicionar" }).first();
  await expect(addBtn).toBeVisible();
  await addBtn.click();

  // Go to checkout and place order
  await page.goto("/checkout");

  const [response] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().endsWith("/api/orders") && r.request().method() === "POST"
    ),
    page.locator("button", { hasText: "Colocar pedido" }).click(),
  ]);

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.orderId).toBeTruthy();
});
