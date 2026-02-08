import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page.js';
import { SearchResultsPage } from '../../pages/search-results.page.js';
import { ProductPage } from '../../pages/product.page.js';
import { CartPage } from '../../pages/cart.page.js';

test('search for headphones, filter by Sony and price, add to cart and remove', async ({
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
  
  const cartPage = new CartPage(page);
  await cartPage.removeItem();
  await cartPage.verifyCartIsEmpty();
});
