class LoginPage {
    constructor(page) {
      this.page = page;
      this.userName = page.locator("#userEmail");
      this.password = page.locator("#userPassword");
      this.login = page.locator("[value='Login']");
    }
  
    async GoTo() {
      try {
        await this.page.goto('https://rahulshettyacademy.com/client');
      } catch (error) {
        console.error("Error navigating to the page:", error);
      }
    }
  
    async validLogin(userName, password) {
      try {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.login.click();
        await this.page.waitForLoadState("networkidle");
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  }
  


 

module.exports ={LoginPage};