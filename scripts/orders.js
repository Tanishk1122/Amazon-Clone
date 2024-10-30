import {getProduct, loadProductsFetch} from '../data/products.js';
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import {cart, addToCart, addingToCart, updateCartQuantity, saveToStorage} from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach((order) => {
    // Check if order exists and has orderTime before trying to format
    if (order && order.orderTime) {
      const orderTimeString = dayjs(order.orderTime).format('MMMM D');

      ordersHTML += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>₹${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
            ${productsListHTML(order)}
          </div>
        </div>
      `;
    } else {
      // If the order is null or doesn't have orderTime, display a fallback message
      ordersHTML += `
        <div class="order-error">
          <p>Order details are missing or incomplete.</p>
        </div>
      `;
    }
  });

  function productsListHTML(order) {
    let productsListHTML = '';

    // Check if order.products is defined and is an array
    if (Array.isArray(order.products)) {
      order.products.forEach((productDetails) => {
        const product = getProduct(productDetails.productId);

        // Check if product exists before trying to access its properties
        if (product) {
          productsListHTML += `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>
            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${
                  dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
                }
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again"
            data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                <button class="track-package-button button-secondary examplary-js">
                  Track package
                </button>
              </a>
            </div>
          `;
        } else {
          // If product not found, handle it (you can add a placeholder or error message)
          productsListHTML += `
            <div class="product-not-found">
              Product not found for ID: ${productDetails.productId}
            </div>
          `;
        }
      });
    } else {
      // If order.products is undefined or not an array, handle it gracefully
      productsListHTML += `
        <div class="no-products-found">
          No products found for this order.
        </div>
      `;
    }

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;


  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      let productId = button.dataset.productId;
      let quantity = 1;
      // console.log(productId);
      let matchingItem;
        cart.forEach((item) => {
          if(productId === item.productId){
              matchingItem = item;
          }
        });
  
        if(matchingItem){
          matchingItem.quantity += quantity;
          document.querySelector('.js-cart-quantity').innerHTML = matchingItem.quantity;
        }

        if(!matchingItem){
          cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
          });
          document.querySelector('.js-cart-quantity').innerHTML = quantity += 1;
        }

      // (Optional) display a message that the product was added,
      // then change it back after a second.
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 2000);
      updateCartQuantity();
    });
    updateCartQuantity();
    saveToStorage();
  });

}
loadPage();




