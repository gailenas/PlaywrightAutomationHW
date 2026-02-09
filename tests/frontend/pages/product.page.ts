import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  private readonly addToCartButton: Locator;
  private readonly seeInCartLink: Locator;
  private readonly openedProductTitle: Locator;
  private readonly quantityInput: Locator;
  private readonly quantityWarning: Locator
  
  constructor(private readonly page: Page) {
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    this.seeInCartLink = this.page.getByRole('link', { name: 'See in cart' });
    this.openedProductTitle = this.page.locator('#RightSummaryPanel').getByTestId('x-item-title');
    this.quantityInput = this.page.getByRole('textbox', { name: 'Quantity:' });
    this.quantityWarning = this.page.getByText('Please enter a quantity of')
  }
  
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
  
  async goToCart(): Promise<void> {
    await this.seeInCartLink.click();
  }
  
  async verifyRightProductOpened(productTitle: string) {
    let openedProductTitle = (await this.openedProductTitle.innerText());
    expect(productTitle.replace('NEW LISTING', '').substring(0, 30)).toContain(openedProductTitle.replace('NEW LISTING', '').substring(0, 30))
  }

  async enterQuantity(quantity: string) {
    await this.quantityInput.click();
    await this.quantityInput.fill(quantity);
  }

  async verifyWarningIsVisible () {
    await expect(this.quantityWarning).toBeVisible();
  }
}

