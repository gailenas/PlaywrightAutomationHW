import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  private readonly addToCartButton: Locator;
  private readonly seeInCartLink: Locator;
  private readonly openedProductTitle:Locator;

  constructor(private readonly page: Page) {
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    this.seeInCartLink = this.page.getByRole('link', { name: 'See in cart' });
    this.openedProductTitle = this.page.locator('#RightSummaryPanel').getByTestId('x-item-title');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goToCart(): Promise<void> {
    await this.seeInCartLink.click();
  }

  async verifyRightProductOpened(productTitle: string) {
    let openedProductTitle = await this.openedProductTitle.innerText();
    expect(productTitle).toContain(openedProductTitle)
  }
}
