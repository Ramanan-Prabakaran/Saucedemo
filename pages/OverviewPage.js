// Overview Page Object
import { expect } from "@playwright/test";

export class OverviewPage {
  constructor(page) {
    this.page = page;
    this.itemTotal = page.locator(".summary_subtotal_label");
    this.tax = page.locator(".summary_tax_label");
    this.total = page.locator(".summary_total_label");
    this.finishButton = page.locator("#finish");
    this.completeHeader = page.locator(".complete-header");
  }

  async verifyTotals() {
    const itemTotalText = await this.itemTotal.innerText();
    const taxText = await this.tax.innerText();
    const totalText = await this.total.innerText();
    console.log(itemTotalText, taxText, totalText);
  }

  async completePurchase() {
    await this.finishButton.click();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }
}
