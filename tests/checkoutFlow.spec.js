import fs from "fs";
import path from "path";
import { test } from "@playwright/test";
import Papa from "papaparse";
import XLSX from "xlsx";

import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { OverviewPage } from "../pages/OverviewPage.js";
import { takeStepScreenshot } from "../utils/screenshotHelper.js";

// --------------------
// Helper to load users dynamically from JSON, CSV, or Excel
// --------------------
function loadUsers() {
  const jsonPath = path.join("data", "users.json");
  const csvPath = path.join("data", "users.csv");
  const excelPath = path.join("data", "users.xlsx");

  if (fs.existsSync(jsonPath)) {
    return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  } else if (fs.existsSync(csvPath)) {
    const csvFile = fs.readFileSync(csvPath, "utf8");
    const parsed = Papa.parse(csvFile, { header: true });
    return parsed.data;
  } else if (fs.existsSync(excelPath)) {
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  } else {
    throw new Error("No user data file found. Add JSON, CSV, or Excel in data/ folder.");
  }
}

// --------------------
// Load users dynamically
// --------------------
const users = loadUsers();

// --------------------
// Main Test Loop
// --------------------
for (const user of users) {
  test(`Checkout flow for ${user.username}`, async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const overview = new OverviewPage(page);

    // Open login page
    await login.open();
    await takeStepScreenshot(page, "login-page");

    // Login
    await login.login(user.username, user.password);

    // Handle locked out user
    if (user.username === "locked_out_user") {
      await login.verifyLockedOutUser();
      return;
    }

    // Add top 2 most expensive products
    await products.addTwoMostExpensive();
    await products.verifyCartCount(2);
    await takeStepScreenshot(page, "added-to-cart");

    // Cart validation
    await products.goToCart();
    await cart.verifyCartItems(2);
    await cart.removeOneItem();
    await takeStepScreenshot(page, "cart-after-remove");

    // Checkout
    await cart.goToCheckout();
    await checkout.fillCheckoutInfo("John", "Tester", "12345");

    // Overview & complete purchase
    await overview.verifyTotals();
    await overview.completePurchase();
    await takeStepScreenshot(page, "order-complete");
  });
}
