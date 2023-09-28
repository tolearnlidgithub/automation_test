const { test, expect } = require('@playwright/test');

const { DashboardPage } = require('../PAGE_OBJECT/DashboardPage')
const { CheckoutPage } = require('../PAGE_OBJECT/CheckoutPage')



test('@Client App login', async ({ page }) => {
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

    const checkoutPage = new CheckoutPage(page)


    // Use the checkoutPage methods

    await  checkoutPage.clickonCart()

    await checkoutPage.checkingCheckoutPAge()




    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);



    await checkoutPage.placeOrder();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);






})








