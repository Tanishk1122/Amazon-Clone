import {cart, removeFromCart, addingToCart, saveToStorage, updateQuantity, updateCartQuantity, updateDeliveryOptions, loadFromStorage} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js" //Example of Default Export//
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// const today = dayjs();
// const inFuture = today.add(7, 'day');
// console.log(inFuture.format('dddd, MMMM, d'));

// products.forEach(price => {
//     console.log(price.priceCents)
// })

export function renderOrderSummary(){
    let cartSummaryHTML = '';

    cart.forEach(cartItem => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId); 
    

        //-----//

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate =  today.add(
            deliveryOption.deliveryDays, 
            'days'
        );
        const datestring = deliveryDate.format(
            'dddd MMMM D'
        );
        //-----//

        // console.log(matchingProduct);
        cartSummaryHTML +=
        `<div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}"> ${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-add-link" data-product-id ="${matchingProduct.id}">
                    Update
                    </span>

                    <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id}"> 
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id ="${matchingProduct.id}">Save</span>

                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id ="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)} 
                <!--we are looping thorugh the delivery options---the line no. 94 for the function - deliveryOptionsHTML(matchingProduct)-->
                </div>
            </div>
            </div>
        `;
        let checkout = document.querySelector('.js-checkout-section');
        checkout.value = cartItem.quantity;
        // console.log(checkout); 
    });

    //Function rendering the delivery option day & date *SOME POINTS TO BE KEPT IN MIND* //
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach(deliveryOption => {
        const today = dayjs();
        const deliveryDate =  today.add(
            deliveryOption.deliveryDays, 
            'days'
        );
        const datestring = deliveryDate.format(
            'dddd MMMM D'
        );
        const priceString = deliveryOption.priceCents === 0
        ? 'Free'
        : `₹ ${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html += 
        `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked 
                ? 'checked' 
                : ''
            }
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${datestring}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
            </div>
        </div>
        `});
        return html
    }

    //DOM Selection//-----
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    // console.log(orderSummary);
    let cartQuantity; //Globally defining the cartQuantity
    document.querySelectorAll('.js-delete-link')
    .forEach(link => {
        link.addEventListener('click', ()=>{
            let productId = link.dataset.productId;
            removeFromCart(productId);
            console.log('Here is the Updated cart', cart);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            // console.log(container)
            container.remove(); 
            renderPaymentSummary();
            renderOrderSummary();
            returnToHome(); //Gonna show the real time n items updation
        })


        //This below code is for changing the checkout items:-

        function returnToHome(){
            cartQuantity = 0;
            cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
            });

            document.querySelector('.js-return-to-home-link').innerHTML
            = `${cartQuantity} items`;
            loadFromStorage();
            // renderOrderSummary();
        }
        returnToHome();        
    });

    //If the cartQuantity is zero, then the following page will get rendered//
    //Method one//
    if(!cartQuantity){
        window.location.href = 'emptyCartReatlTime.html';
    }

    //Second Method: Currently working this :)//
  

    document.querySelectorAll('.js-add-link')
    .forEach(link => {
        link.addEventListener('click', ()=>{
            let productId = link.dataset.productId;  

            let cartcont = document.querySelector(`.js-cart-item-container-${productId}`)

            cartcont.classList.add('is-editing-quantity');
        });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach(link => {
        link.addEventListener('click', ()=>{
            let productId = link.dataset.productId;

            let cartcont = document.querySelector(`.js-cart-item-container-${productId}`);

            cartcont.classList.remove('is-editing-quantity');

            let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

            // quantityInput = Number(quantityInput.value);

            const newQuantity = Number(quantityInput.value);

            updateQuantity(productId, newQuantity);

            const quantityLabel =document.querySelector(
            `.js-quantity-label-${productId}`
            );

            quantityLabel.innerHTML = newQuantity;
            // updateDeliveryOptions(productId, deliveryOptionId);
            renderPaymentSummary();
            renderOrderSummary();
        });  
    });

    console.log(deliveryOptions);

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        const {productId, deliveryOptionId} = element.dataset; //ShortHand Property//
        element.addEventListener('click', ()=>{
            updateDeliveryOptions(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

};



/*The techinique we are using above is MVC technique i.e  Model - View - Controller
1) We are updating the data
2) Regenerate all the HTML */


