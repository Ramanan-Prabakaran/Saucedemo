// Custom wait utility
export async function waitForElement(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
  } catch {
    console.warn(`⚠️ Element ${selector} took too long to appear`);
  }
}
