class CheckoutPage  {
    

constructor (page) {

this.cartLink = page.locator("[routerlink*='cart']")
this.checkProduct = page.locator(`.card-body h5:has-text("ZARA COAT 3")`)
this.checkoutButton = page.locator('button:has-text("Checkout")')
this.country = page.locator("[placeholder*='Country']")
this.dropdown = page.locator(".ta-results")
this.submitButton = page.locator(".action__submit")
this.cartProductList  =   page.locator("div li").first()
this.dropdownResult = page.locator(".ta-results")
 
 

}

async clickonCart ()  {
    await this.cartLink.click()
}


async checkingCheckoutPAge () {

                
                        await this.cartProductList.waitFor();


                        const bool = await this.checkProduct.isVisible();
                        const checkout = await this.checkoutButton.isVisible({ timeout: 10000 })
                        await this.checkoutButton.click()

                        await this.country.type("ind");

                        
                        await this.dropdown.waitFor();

                        const optionsCount = await this.dropdown.locator("button").count();
                        for (let i = 0; i < optionsCount; ++i) {
                           const text = await this.dropdown.locator("button").nth(i).textContent();
                           if (text === " India") {
                              await this.dropdown.locator("button").nth(i).click();
                              break;
                           }
                        }
}



 async placeOrder () {


    await this.submitButton.click()
 }

}


module.exports = { CheckoutPage };
