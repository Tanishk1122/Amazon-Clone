
import {getOrder, orders} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {cart, saveToStorage, updateCartQuantity, updateQuantity} from '../data/cart.js';
// import { returnToHome } from './amazon.js';

async function loadPage() {
  await loadProductsFetch();
  console.log(orders)
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId); 
  const product = getProduct(productId);
  
  //Now have to subtract orderTime from deliveryTime//


  // Get additional details about the product like
  // the estimated delivery time.

  //This below code is working as the main engine to generate the particular projects//
  let productDetails;
  order.products.forEach((details) => {
    console.log(order); 
    /* Our order consist of {id, orderTime, totalCostcents, products}*/ 
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  console.log(percentProgress);

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      Arriving on ${
        dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label" ${
        percentProgress < 50 ?'current-status' : ''
      }>
        Preparing
      </div>
      <div class="progress-label"  ${
        (percentProgress >= 50 || percentProgress < 100) ?'current-status' : ''
      }>
        Shipped
      </div>
      <div class="progress-label"  ${
         (percentProgress >= 100) ?'current-status' : ''
      }>
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  updateCartQuantity();
  saveToStorage();
}
loadPage();





// console.log(currentTime - orders.orderTime);
// console.log(currentTime);


