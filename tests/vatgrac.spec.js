const { test, expect } = require('@playwright/test');
 
 
 
 
test('@Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "sss@mailinator.com";
    
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("123456Tt.");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');



   const productToFind = await page.locator(`.card-body h5:has-text("ZARA COAT 3")`);
   await expect(productToFind).toBeVisible()

 const addtocart =  await page.locator('text = Add To CArt').first()
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
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
})