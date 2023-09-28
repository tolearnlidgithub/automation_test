const {test} =  require ('@playwright/test')

const {LoginPage} =  require('../pageobject/LoginPage')


test('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "sss@mailinator.com";
    const password = "123456Tt."

    const login = new LoginPage (page)  
    
   await  login.GoTo()
    await login.validLogin(email, password)




 
     

})