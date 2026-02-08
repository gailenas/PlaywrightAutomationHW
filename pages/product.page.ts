import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  private readonly addToCartButton: Locator;
  private readonly seeInCartLink: Locator;

  constructor(private readonly page: Page) {
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    this.seeInCartLink = this.page.getByRole('link', { name: 'See in cart' });
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goToCart(): Promise<void> {
    await this.seeInCartLink.click();
  }
}
