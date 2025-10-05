// Products Page Object
export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async addTwoMostExpensive() {
    const prices = await this.page.$$eval(".inventory_item_price", els =>
      els.map(e => parseFloat(e.innerText.replace("$", "")))
    );
    const sorted = [...prices].sort((a, b) => b - a);
    const top2 = sorted.slice(0, 2);

    for (const price of top2) {
      const item = this.page.locator(`.inventory_item:has-text("$${price}")`);
      const addBtn = item.locator("button:has-text('Add to cart')");
      if (await addBtn.count() > 0) {
        await addBtn.click();
      } else {
        console.log(`Item $${price} out of stock`);
      }
    }
  }

  async verifyCartCount(expected) {
    const count = await this.cartBadge.innerText();
    if (parseInt(count) !== expected) throw new Error("Cart count mismatch!");
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
