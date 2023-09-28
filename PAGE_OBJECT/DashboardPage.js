class DashboardPage {
    constructor(page) {
      this.page = page; // Store the page object
  
      this.productToFind = page.locator('.card-body h5:has-text("ZARA COAT 3")');
      this.addToCart = page.locator('text=Add To Cart').first();
      this.cartLink = page.locator('[routerlink*="cart"]');
    }
  
    async findProductAddToCart() {
      await (this.productToFind).isVisible();
      await (this.addToCart).isVisible()
      await this.addToCart.click();
    }
  }
  
  module.exports = { DashboardPage };
  