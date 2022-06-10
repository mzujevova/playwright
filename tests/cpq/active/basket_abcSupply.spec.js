// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('User', () => {
  test('can login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://abcsupplytest2.vendavocpq.com/');
    await page.fill('input#loginName', 'mzujevova');
    await page.locator('input#loginName').press('Tab');

    await page.fill('input#Password', 'P@ssword!');
    await page.locator('input#Password').press('Enter');

    await page.waitForSelector('div.page-header h1.screen-title');
    await expect(page.locator('div.page-header h1.screen-title')).toHaveText('My Quotes');
    await page.waitForSelector('text="Create Quote"');
    await page.click('a:has-text("Create Quote")');
    await page.waitForLoadState();
    await page.waitForSelector('#SelectedTeamId');
    await page.selectOption('#SelectedTeamId', {label:'P_16 - CHICAGO'});
    
    const dropdown1 = page.locator('#SelectedPriceLevelId');
    await expect(dropdown1).toHaveText('MSRP');
    
    const dropdown2 = page.locator('#SelectedCurrencyId');
    await expect(dropdown2).toHaveText('USD');
    
    await page.click('a:has-text("Select Customer...")');
    await page.click('input[value="100001-1_P_16"]');
    await page.click('#btnSelectPCCustomer');
    
    await page.selectOption('#Basket_Branch', { label: '7102 Chicago, IL' });
    
    const StartDate = page.locator('#Basket_ValidityStartDate');
    await expect(StartDate).not.toBeEmpty();
    
    const EndDate = page.locator('#Basket_ValidityEndDate');
    await expect(EndDate).not.toBeEmpty();
    
    await page.waitForSelector('text="Next: Explore"');
    await page.click('a:has-text("Next: Explore")');
    await page.waitForLoadState();
    await page.waitForSelector('text="Product Selection"');
    await page.click('a:has-text("Product Selection")');
    await page.waitForLoadState();
    
    await page.waitForSelector('#select2-sel-22-container');
    await page.click('#select2-sel-22-container');
    await page.click('ul li:has-text("Access Doors and Panels")');
    await page.waitForLoadState();
    
    await page.click('#select2-sel-83-container');
    await page.click('ul li:has-text(\'12" x 12"\')');
    
    await page.click(':light(:nth-match(table, 1) > tbody > tr:nth-child(2) input[type="checkbox"])');
    await page.click(':light(:nth-match(table, 1) > tbody > tr:nth-child(3) input[type="checkbox"])');
    await page.click('a:has-text("Update")');
    
    await page.waitForSelector(':nth-match(table, 2)');
    const addedProductsFirstStep = await page.locator(':nth-match(table, 2) tbody tr').count();
    await expect(addedProductsFirstStep).toEqual(2);

    await page.waitForLoadState('domcontentloaded');

    await page.click('#select2-sel-35-container');
    await page.click('ul li:has-text(\'14" x 14"\')');
   
    await page.click(':light(:nth-match(table, 1) > tbody > tr:nth-child(1) input[type="checkbox"])');
    await page.click(':light(:nth-match(table, 1) > tbody > tr:nth-child(2) input[type="checkbox"])');
    await page.click('a:has-text("Update")');

    await page.waitForSelector(':nth-match(table, 2) tbody tr:nth-child(4)');
    const addedProductsSecondStep = await page.locator(':nth-match(table, 2) tbody tr').count();
    await expect(addedProductsSecondStep).toEqual(4);
    
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    
    await page.click('a:has-text("Add to Quote")');
    
    await page.waitForSelector('div[data-entity="BasketConfiguration"]');
    await page.waitForLoadState('domcontentloaded');
    
    await page.waitForSelector(':light(tr td:nth-child(9) span)');
    await expect(page.locator(':light(tr td:nth-child(9) span)')).toHaveCount(4);
    
    await page.click('#btn-basket-AdvancedSearch');
    await page.selectOption('#Property', {label:'Size Profile'} );
    await page.selectOption('#Operators', {label:'Contains'} );
    
    await page.type('#CustomFieldContainer input', '12');
    await page.press('#CustomFieldContainer input', 'Tab');
    
    await page.click('button#GetAdvancedSearchResults');
    
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');

    const allResults = await page.locator(':light(tr td:nth-child(9) span)').count();
    const correctResults = await page.locator(':light(tr td:nth-child(9) span:has-text("12"))').count();
    
    await expect(allResults).toEqual(correctResults);

    const FirstProduct = page.locator('span#displayValue_Configurations_313');
    await expect(FirstProduct).toHaveText('$ 0.0000');
    
    const SecondProduct = page.locator('span#displayValue_Configurations_412');
    await expect(SecondProduct).toHaveText('$ 0.0000');
    
    await page.click('a:has-text("Select Results and Mass Edit")');
    await page.type('#MassEditDialog-3', '100');
    await page.click('#btnSubmitMassEdit');

  
  })
});