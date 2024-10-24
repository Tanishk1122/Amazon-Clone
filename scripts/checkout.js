// import { products } from '../data/products.js';
import {renderOrderSummary} from '../scripts/checkout/orderSummary.js';
import {renderPaymentSummary } from '../scripts/checkout/paymentSummary.js';
import { loadFromStorage } from '../data/cart.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import {cart, loadCartFetch, loadCart} from '../data/cart.js';
// import { Car } from '../data/car.js';
// 


// import '../data/cart-class.js';//another syntax for importing a file and run the whole file without any imoprting the variable;

async function loadPage(){ //returning a promise..
    try {
        // throw 'error 1';

         await Promise.all([ //Promise.all will run both of the function at the same time;
            loadProductsFetch(),
            loadCartFetch()
        ]);  //-> lets us write asynchronous code like normal code
        // const value = await new Promise ((resolve, reject) => { //reject() lets us create an error in future
        //     loadcartfetch(() => {
        //         reject('error 3')
        //         // resolve('value 3');
        //     });
        // });

    
    } catch (error) {
        console.log('Unexpected error. Please try again later.')
    }
    renderOrderSummary();
    renderPaymentSummary();
    // return 'value 2' //similar to resolve('value 2')
}
loadPage();
































// function returnToHome(){
//     let cartQuantity = 0;
//     cart.forEach((cartItem) => {
//     cartQuantity += cartItem.quantity;
//     });
  
//     document.querySelector('.js-return-to-home-link').innerHTML
//     = `${cartQuantity}`;
//   }
// returnToHome();  

/*
Promise.all([
    loadProductsFetch(), 
    new Promise ((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
new Promise((resolve)=>{
    console.log('Start promise');
    loadProducts(() => {
        console.log('finished loading');
        resolve('value1 ');
    });
}).then((value) => { 

    console.log(value);
    return new Promise ((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
})
*/



/* Main Idea of JavaScript:

1) Save the DATA (Model)
2) Generate the HTML (View)
3) Make it interactive (Controller)

MVC  --> Combination of these 3 properties 
*/
