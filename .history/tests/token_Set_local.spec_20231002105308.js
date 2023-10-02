
const { test, expect, request } = require('@playwright/test');

let token_value;
let api_context; // Define api_context here
let order_id

const loginPayload = {
  userEmail: "sss@mailinator.com",
  userPassword: "123456Tt."
};

test.beforeAll(async () => {
  api_context = await request.newContext(); // Initialize api_context
  const api_response = await api_context.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: loginPayload
  });

  await expect(api_response.ok()).toBeTruthy();
  const responseToJson = await api_response.json();
  token_value = responseToJson.token;
  console.log(token_value);
});

test.beforeEach(async ({ page }) => {
  // Set the token in local storage before each test.
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token_value);
});

test("try to place an order with api", async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  const order_payload = { orders: [{ country: "Spain", productOrderedId: "6262e9d9e26b7e1a10e89c04" }] };
  const product_name1 = 'ADIDAS ORIGINAL';

  const order_response = await api_context.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    data: order_payload,
    headers: { // Use lowercase 'headers' here
      "Authorization": token_value,
      "Content-Type": "application/json"
    }
  });

  const order_response_json = await order_response.json();
  if (order_response_json.orders && order_response_json.orders.length > 0) {
    order_id = order_response_json.orders[0];
    console.log("Order ID:", order_id);
  } else {
    console.error("No order found in the response.");
  }

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
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

//hlynahyi/
