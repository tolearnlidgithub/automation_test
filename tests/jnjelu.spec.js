const { test, expect, request } = require('@playwright/test');
const {Api} =   require ('../tapi/Api')

const loginPayload = {
  userEmail: "sss@mailinator.com",
  userPassword: "123456Tt."
};

const order_payload = { orders: [{ country: "Spain", productOrderedId: "6262e9d9e26b7e1a10e89c04" }] };
const product_name1 = 'ADIDAS ORIGINAL';                                                                      ///orderna

let fakeorderpayload = {"data":[],"message":"No Orders"}

test("try to place an order with api", async ({ page }) => {
  const api_context = await request.newContext(); // Initialize api_context
  const api = new Api(api_context,loginPayload)
  const token = await api.getToken() 

  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  },token );

  await page.goto('https://rahulshettyacademy.com/client');
 


await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
async route => {
    const response = await page.request.fetch(route.request())
    let body = JSON.stringify(fakeorderpayload)
    route.fulfill({
        response,
        body: body
    })
})




   await page.locator("button[routerlink*='myorders']").click()
   await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
   const text = await page.locator ('.mt-4 ') 
   const thione = await text.allInnerTexts()
   console.log(thione)
await page.pause()


   }
  )









