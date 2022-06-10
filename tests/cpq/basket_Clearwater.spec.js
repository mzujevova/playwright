// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://clearwatercpdqa2.vendavocpq.com');
});

test.describe('User', () => {
  test('can login', async ({ page }) => {
    await page.fill('input#loginName', 'mzujevova');
    await page.locator('input#loginName').press('Tab');

    await page.fill('input#Password', 'M1losMacourek!!!');
    await page.locator('input#Password').press('Enter');

    await expect(page.locator('div.page-header h1.screen-title')).toHaveText('Quotes');
    await page.click('a:has-text("Create Quote")');
    await page.selectOption('#SelectedTeamId', { label: 'Sales Team' });

    const dropdown1 = page.locator('#SelectedPriceLevelId option[selected=selected]');
    await expect(dropdown1).toHaveText('Current Price');

    const dropdown2 = page.locator('#SelectedCurrencyId option[selected=selected]');
    await expect(dropdown2).toHaveText('USD');

    await page.click('span[aria-labelledby=select2-Basket_CustomerId-container]');
    await page.click('#select2-Basket_CustomerId-results li:nth-child(5)');
    await expect(page.locator('#select2-Basket_CustomerId-container')).toHaveText('BIG LOTS');

    await page.click('a:has-text("Next: Explore")');

    await page.click('div[data-entity2-name="Existing Products"] a');
    
    await page.click('span#select2-sel-22-container');
    await page.click('li:has-text("BRT")');

    await page.click('span#select2-sel-34-container');
    await page.click('li:has-text("PRM")');
    
    const addButton = await page.locator('div[data-entity="Answer"] button');
    await addButton.click();
    await page.click('#spp-15');
    await page.click('#Finish');
    await page.click('#ShipToPopap0');
    await page.click('#shipTochckbx0');
    await page.selectOption('#sourceSelector0', { label: 'LEWISTON-ID80' });
    await page.selectOption('#convertingSelector0', { label: 'GREEN BAY-WI84SERV' });
    await page.selectOption('#shipFromSelector0', { label: 'LEWISTON-ID80' });
    await page.click('#editSpancurrentAlloc0');
    await page.type('#editSpancurrentAlloc0', '123');
    await page.click('#shipToSaveAllButton');
    await page.click('#WaterfallPopup0');
    await page.click('#hrefLinkDivlabelcaseTransfer');
    await page.click('#editSpanfreightTonsTrack0');
    await page.type('#editInputfreightTonsTrack0', '5');
    await page.locator('#editInputfreightTonsTrack0').press('Enter');

    await expect(page.locator('#FreightCostContents>div:last-child span')).toHaveText('$ 4.19');

  

  })
})