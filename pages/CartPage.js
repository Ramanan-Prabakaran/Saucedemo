// Cart Page Object
import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
  }

  async verifyCartItems(count) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeOneItem() {
    const removeBtns = await this.page.$$("button:has-text('Remove')");
    if (removeBtns.length > 0) await removeBtns[0].click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
