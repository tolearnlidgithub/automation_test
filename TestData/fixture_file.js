const {test} = require ('@playwright/test');
 
exports.customtest = test.extend (
    {
        testDataForOrder: {
      email: 'sss@mailinator.com',
      password: '123456Tt.',
      productName: 'ZARA COAT 3',
    },
}
  );
   
  
  
  
  