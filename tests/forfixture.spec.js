const { test, expect } = require('@playwright/test');

const {customtest} = require('../TestData/fixture_file')

 
 

customtest (`TEST WITH FIXTURE`, async ({ page,testDataForOrder}) => {

   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(testDataForOrder.email);
   await page.locator("#userPassword").fill(testDataForOrder.password);
   
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');



   const productToFind = await page.locator(`.card-body h5:has-text("${testDataForOrder.productName}")`);
   await expect(productToFind).toBeVisible()


})





