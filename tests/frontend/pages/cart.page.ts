import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
  private readonly removeButton: Locator;
  private readonly emptyCartMessage: Locator;

  constructor(private readonly page: Page) {
    this.removeButton = this.page
      .getByRole('button', { name: 'Remove -', exact: false })
      .first();
    this.emptyCartMessage = this.page.getByText(
      "You don't have any items in",
    );
  }

  async removeItem(): Promise<void> {
    await this.removeButton.click();
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
  }
}
