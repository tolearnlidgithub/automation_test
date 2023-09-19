const { test, expect, request } = require('@playwright/test');
const { Api } = require('../tapi/Api')

const loginPayload = {
  userEmail: "sss@mailinator.com",
  userPassword: "123456Tt."
};

const order_payload = { orders: [{ country: "Spain", productOrderedId: "6262e9d9e26b7e1a10e89c04" }] };
const product_name1 = 'ADIDAS ORIGINAL';                                                                      ///orderna



test("try to place an order with api", async ({ page }) => {
  const api_context = await request.newContext(); // Initialize api_context
  
  const api = new Api(api_context, loginPayload)
  const token = await api.getToken()

  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client');

  const order_id = await api.createOrder(order_payload)

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
                                                              //expect(await page.screenshot()).toMatchSnapshot("spanshot.png")                    ////VISUAL SCRENNSHOT

  const rows = await page.locator("tbody tr");

  await page.pause()

  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (rowOrderId.includes(order_id)) { // Reverse the order of comparison
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
})