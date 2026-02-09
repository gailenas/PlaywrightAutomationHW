import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { SearchResultsPage } from '../pages/search-results.page.js';
import { ProductPage } from '../pages/product.page.js';
import { CartPage } from '../pages/cart.page.js';

test('Search for headphones, filter by Sony and price, add to cart and remove', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigate();
  await homePage.searchFor('headphones');
  await searchResultsPage.filterByBrand('Sony');
  await searchResultsPage.setPriceRange('50', '200');

  page = await searchResultsPage.openResultByIndex(3);
  const productPage = new ProductPage(page);

  await productPage.addToCart();
  await productPage.goToCart();

  // Disabled due to captha to often
  // const cartPage = new CartPage(page);
  // await cartPage.removeItem();
  // await cartPage.verifyCartIsEmpty();
});

test('Search for headphones, filter by Sony, confirm filter works', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigate();
  await homePage.searchFor('headphones');
  await searchResultsPage.filterByBrand('Sony');
  await searchResultsPage.validateFilterEnabled('Sony');
});

test('Search for headphones, filter by Sony, confirm if right product opened', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigate();
  await homePage.searchFor('headphones');
  await searchResultsPage.filterByBrand('Sony');
  let productTitle = await searchResultsPage.getProductTitle(3);
  page = await searchResultsPage.openResultByIndex(3);
  const productPage = new ProductPage(page);
  await productPage.verifyRightProductOpened(productTitle);
});

test('Search for headphones, filter by Sony and price, try to purchase more than available', async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigate();
  await homePage.searchFor('headphones');
  await searchResultsPage.filterByBrand('Sony');
  await searchResultsPage.setPriceRange('200', '300');
  page = await searchResultsPage.openResultByIndex(3);
  const productPage = new ProductPage(page);
  await productPage.enterQuantity("10000");
  await productPage.verifyWarningIsVisible();
});
