class Api {

constructor (api_context,loginPayload) {

        this.api_context = api_context;
        this.loginPayload = loginPayload;
}



    async getToken () {
        const api_response = await this.api_context.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
          });
        
          //await expect(api_response.ok()).toBeTruthy();
          const responseToJson = await api_response.json();
         const  token_value = responseToJson.token;
          console.log(token_value);
          return token_value
    }

    async createOrder (order_payload) { 
         
      let order_id; 
        const order_response = await this.api_context.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
          data: order_payload,
          headers: { // Use lowercase 'headers' here
            "Authorization":  await this.getToken (),
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
return order_id 
    }
}

module.exports = {Api};