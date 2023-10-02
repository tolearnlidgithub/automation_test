const { test, expect } = require('@playwright/test');
 
const {DashboardPage}= require('../PAGE_OBJECT/DashboardPage')
 
 
test(' @Web Client App login', async ({ page }) => {
    const email = "sss@mailinator.com";
    
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("123456Tt.");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');


   const dashboardPage = new DashboardPage(page);

   // Use the DashboardPage methods
   await dashboardPage.findProductAddToCart();


   
    await page.locator("[routerlink*='cart']").click();
 
   await page.locator("div li").first().waitFor();

 
   const bool = await page.locator(`.card-body h5:has-text("ZARA COAT 3")`).isVisible();
})