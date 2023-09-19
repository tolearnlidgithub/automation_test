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
    await page.locator("button[routerlink*='myorders']").click();
    
    await page.route ('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
      route => route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=650957237244490f95b2f18a"
    }))


    await page.locator('button:has-text("View")').first().click()
    const unathorized_text = await page.locator('.email-wrapper .blink_me')
    if  (await (`${unathorized_text}:has-text ("You are not authorize to view this order")`)) {
        console.log("it is found")
    }

    else { console.log("error")}


    // const text = unathorized_text.textContent()
    // console.log(text)
    //await expect(unathorized_text).toEqual("You are not authorize to view this order")
 
    await page.pause()
    
   
    
  
     
    
  })