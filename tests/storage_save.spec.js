const { test, expect } = require('@playwright/test');

let web_context;

test.beforeAll("login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
 // await page.route("**/*.css", route => route.abort()) ------- kpaki css filery
  await page.goto("https://rahulshettyacademy.com/client/")
  await page.locator('#userEmail').fill("test+33@mailinator.com")
  await page.locator('#userPassword').fill('123456Tt@')
  await page.locator(`[value="Login"]`).click()
  await page.waitForLoadState('networkidle')
  await context.storageState({ path: "storage.json" })
  web_context = await browser.newContext({ storageState: "storage.json" })
})

//'article:has-text("Playwright")'

test("titles", async () => {
  const page = await web_context.newPage()
  await page.goto("https://rahulshettyacademy.com/client/")
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});


