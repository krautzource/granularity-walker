// @ts-check
const { test, expect } = require('@playwright/test');

test('base setup', async ({ page }) => {
  await page.goto('http://localhost:5000/test.html/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tests/);
});

test('keyboard move down', async ({ page }) => {
  await page.goto('http://localhost:5000/test.html');

  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowDown');
  const locator = page.getByTestId('test12');
  await expect(locator).toBeFocused();
});
