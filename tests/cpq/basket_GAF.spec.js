// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://gafdev.vendavocpq.com/');
});

test.describe('User', () => {
  test('can login', async ({ page }) => {
    await page.fill('input#loginName', 'MZujevova');
    await page.locator('input#loginName').press('Tab');

    await page.fill('input#Password', 'Sloth3Otter2');
    await page.locator('input#Password').press('Enter');

    await expect(page.locator('div.page-header h1.screen-title')).toHaveText('Quotes');
    await page.click('a:has-text("Create Single-Ply")');

    await page.type('#editGroup_25', '5');
    await page.click('#select2-sel-33-container');
    await page.click('ul li:has-text("Tear Off")');
    await page.click('input[value="PVC"]');

  
  })
});