import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';



export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents = productPriceCents + (product.priceCents * cartItem.quantity);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents = shippingPriceCents + deliveryOption.priceCents;
    });
    
    const totalbeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalbeforeTaxCents * 0.1;
    const totalcents = totalbeforeTaxCents + taxCents;
    // console.log(productPriceCents); 
    // console.log(shippingPriceCents);
   
    const paymentSummaryHTML = 
    `
            <div class="payment-summary-title">
            Order Summary
            </div>

            <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">₹${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${formatCurrency(totalbeforeTaxCents)}</div>
            </div>

            <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${formatCurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${formatCurrency(totalcents)}</div>
            </div>
            <label class="container"> Cash on Delivery <br>
            <input type="checkbox">
            <span class="checkmark"></span>
            <p1 class="css-important-note"><i>*this website is in development phase <br>
                currently we're only accepting COD orders</i></p1>
            </label>
            </label>
            
            <button class="place-order-button button-primary js-place-order">
            Place your order
            </button>
        `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;


    //This section needs to be review//
    document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: { //headers gives the backend more information about our request & it is needed for sending more data to the backend.
                    'Content-Type': 'application/json' //This tells what type of data we can send to the backend and here we're sending json  
                }, 
                body: JSON.stringify({
                    cart: cart //We cant send an object directly. We need to convert it into JSON string
                })
            });
    
            const order = await response.json(); //using await so that js can wait for this promise to finish and the ngo to the next code
            addOrder(order);
        } catch(error){
            console.log('Unexpected error. Try again later.');
        }

        window.location.href = 'orders.html' //This is a file path
    });
}



