// index.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true }); // headless for Replit
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Trivago
  await page.goto('https://www.trivago.in/');

  // Fill destination
  await page.getByTestId('search-form-destination').fill('Goa');
  await page.getByRole('option', { name: /Goa Region/i }).click();

  // Select check-in and check-out
  await page.getByTestId('valid-calendar-day-2025-06-02').click();
  await page.getByTestId('valid-calendar-day-2025-06-07').click();

  // Set 2 adults
  await page.getByTestId('adults-amount').fill('2');

  // Add 1 infant (age 1)
  await page.getByTestId('children-amount-plus-button').click();
  await page.getByTestId('child-age-select').selectOption('1');
  await page.getByTestId('guest-selector-apply').click();

  // Sort by price
  await page.getByRole('button', { name: /Sort by/i }).click();
  await page.getByRole('radio', { name: 'Price only' }).check();

  // Apply 5-star filter
  await page.getByRole('button', { name: /Filters/i }).click();
  await page.getByRole('button', { name: /Hotel rating/i }).click();
  await page.getByTestId('5-star-hotels-filter').click();
  await page.getByTestId('filters-popover-apply-button').click();

  // Wait for listings to load
  await page.waitForTimeout(5000); // Wait for results to appear

  // Extract the first hotel price
  const price = await page.locator('[data-testid="recommended-price"]').first().innerText();
  const name = await page.locator('[data-testid="item-name"]').first().innerText();

  console.log(`Hotel: ${name}`);
  console.log(`Lowest 5-night Price: ${price}`);

  await browser.close();
})();
