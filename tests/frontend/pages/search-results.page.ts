import { type Locator, type Page, expect } from '@playwright/test';

export class SearchResultsPage {
  private readonly minPriceInput: Locator;
  private readonly maxPriceInput: Locator;
  private readonly submitPriceButton: Locator;

  constructor(private readonly page: Page) {
    this.minPriceInput = this.page.getByRole('textbox', {
      name: 'Minimum Value in ',
    });
    this.maxPriceInput = this.page.getByRole('textbox', {
      name: 'Maximum Value in ',
    });
    this.submitPriceButton = this.page.getByRole('button', {
      name: 'Submit price range',
    });
  }

  async filterByBrand(brand: string): Promise<void> {
    await this.page.waitForTimeout(1000);
    await this.page.getByLabel(brand, { exact: true }).check();
  }

  async verifyBrandFilterApplied(brand: string): Promise<void> {
    await expect(
      this.page.getByRole('link', { name: `${brand} Remove filter` }),
    ).toBeVisible();
  }

  async setPriceRange(min: string, max: string): Promise<void> {
    await this.minPriceInput.click();
    await this.minPriceInput.fill(min);
    await this.maxPriceInput.click();
    await this.maxPriceInput.fill(max);
    await this.submitPriceButton.click();
  }

  async getProductTitle(index: number) {
    let productTitle = await this.page.locator(`ul.srp-results.srp-list.clearfix > li:nth-child(${index}) a`).nth(2).innerText();
    return productTitle.replace('Opens in a new window or tab', '');
  }

  async openResultByIndex(index: number): Promise<Page> {
    const productPagePromise = this.page.waitForEvent('popup');
    await this.page.locator(`ul.srp-results.srp-list.clearfix > li:nth-child(${index}) a`).first().click();
    const popup = await productPagePromise;
    return popup;
  }

  async validateFilterEnabled(filterValue: string) {
    let filterLocator = this.page.getByRole('link', { name: `${filterValue} Remove filter` })
      await expect(filterLocator).toBeVisible();

  }
}
