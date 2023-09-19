const { test, expect, request } = require('@playwright/test')
let token_value
let api_context
const loginPAyload = {
    userEmail: "test+33@mailinator.com",
    userPassword: "123456Tt@"
}

test.beforeAll(async () => {

    api_context = await request.newContext()
    const api_response = await api_context.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPAyload
        })
    await expect(api_response.ok()).toBeTruthy()
    const responseJson = await api_response.json()
    token_value = responseJson.token
    console.log(token_value)

})


test.beforeEach(async ({ page }) => {

    await page.addInitScript((token) => {
        window.localStorage.setItem("token", token)
    }, token_value)

})

test('Api for place an order', async ({ page }) => {

    const order_payload = {
        orders: [{
            country: "Eritrea",
            productOrderedId: "6262e990e26b7e1a10e89bfa"
        }]
    }

    await page.goto('https://rahulshettyacademy.com/client')
    const order_response = await api_context.post('https://rahulshettyacademy.com/api/ecom/order/create-order',

        {
            data: order_payload,
            headers: {
                "Authorization": token_value,
                "Content-Type": "application/json"
            }
        })

    const order_json = await order_response.json()
    console.log(order_json)
    const order_id = await order_json.orders[0]
    const order_id_count = await order_id.length
    console.log(order_id)
    const numberOfOrders = order_json.orders.length
    console.log(numberOfOrders)

    await page.locator("button[routerlink*='myorders']").click();  //click on orders
    await page.locator(`tbody`).waitFor()  // wait for table
    await page.pause()
    const order_id_columns = await page.locator('tbody tr th').allInnerTexts()
    console.log(order_id_columns)
    let total_id = 0;

    for (let i = 0; i < order_id_columns.length; i++) {
        if (order_id_columns[i].includes(order_id)) {
            total_id += 1;
        }

        if (total_id === numberOfOrders) {
            console.log("Orders are found");
            console.log(total_id)
            console.log(order_id_columns[i])
            break; // Exit the loop early since the count matches
        }
    }

    if (total_id !== numberOfOrders) {
        console.log("Failure");
    }

    await page.pause()




})