import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = this.page.getByRole('combobox', { name: 'Search for anything' });
    this.searchButton = this.page.locator('#gh-search-btn');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.ebay.com/');
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.click();
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }
}
