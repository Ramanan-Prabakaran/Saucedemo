// Screenshot helper
export async function takeStepScreenshot(page, stepName) {
  await page.screenshot({ path: `screenshots/${stepName}.png`, fullPage: true });
}
