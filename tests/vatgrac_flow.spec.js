const { test, expect } = require('@playwright/test');

const testingData = JSON.parse(JSON.stringify(require('../TestData/vatgrac_testData.json')))

 
for (const datatotest of testingData)  {


test (`@Clieccnt App login ${datatotest.productName}`, async ({ page }) => {

   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(datatotest.email);
   await page.locator("#userPassword").fill(datatotest.password);
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');



   const productToFind = await page.locator(`.card-body h5:has-text("${datatotest.productName}")`);
   await expect(productToFind).toBeVisible()

   const addtocart = await page.locator('text = Add To Cart').first()
   
   await expect(addtocart).toBeVisible()
   await addtocart.click()


   await page.locator("[routerlink*='cart']").click();

   await page.locator("div li").first().waitFor();

   const bool = await page.locator(`.card-body h5:has-text("ZARA COAT 3")`).isVisible();
   const checkout = await page.locator('button:has-text("Checkout")').isVisible({ timeout: 10000 })
   await page.locator('button:has-text("Checkout")').click()

   await page.locator("[placeholder*='Country']").type("ind");

   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(datatotest.email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
})
}
