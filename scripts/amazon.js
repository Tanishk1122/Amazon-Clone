import {cart, addToCart, updateCartQuantity, loadFromStorage, saveToStorage} from "../data/cart.js";
import { products, Clothing, loadProducts } from "../data/products.js";   
import {formatCurrency} from "./utils/money.js"
// import {returnToHome} from "../scripts/checkout/orderSummary.js" 
import {favCart, saveToStorageFavItems} from "../scripts/favourites.js";


loadProducts(renderProductsGrid); 

export function renderProductsGrid(){ 
  /*a variable declared below to c ombine all the string into one 
  variable to make it render on the web page with the help of DOM \/ */
  let productsHTML = '';

  const url = new URL(window.location.href);
  // console.log(url);
  const search = url.searchParams.get('search');
  // console.log(search);

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
      product.name.toLowerCase().includes(search.toLowerCase());
    });
  }


  filteredProducts.forEach((product) => {
    productsHTML += ` 
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}                              
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <!--This is the First method of adding the Size Chart image link -->
          ${
            product instanceof Clothing //If a product is an instance of the clothing OR that particular product comes in the clothing class then just render the size chart link
            ? `<a href="${product.sizeChartLink}"> Size Chart  </a>`
            : ''
          }

          <!--This is the Second method of adding the Size Chart image link -->

          

          <div class="product-spacer"></div>
          <br>
          <div class="heart-shape js-heart-shape-${product.id}" data-product-id="${product.id}">
            &#9825;
          </div>
          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
  });
  document.querySelector('.js-product-grid').innerHTML = productsHTML; //Generating the HTML through productsHTML variable//
  /*A quick definition of Data attribute and its function
  >> How do we know which product to add?
  >>DATA ATTRIBUTE is just another HTML attribute
  which allows us to attch any information to an element
  */ 
 
  // console.log(favouriteProducts); 
  favProdsRender();


  //Breaking the code into smaller funcs  \/ //

  //FIRST and the SECOND Functions have been transferred into cart.js

  //Function no. > Third//
  function addedImgRender(productId){
    const addedImg = document.querySelector(`.js-added-to-cart-${productId}`);
    // console.log(addedImg);

    addedImg.classList.add('added-to-cart-visible');
    setTimeout(()=>{
        addedImg.classList.remove('added-to-cart-visible');
    }, 2000);
  }



  document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        addToCart(productId); //This param is to get the product.id from this function//
        // This below code is for the cartUpdation on the Web Page//

        updateCartQuantity();

        addedImgRender(productId);
        //excercise 13m is not done till yet!! 
        //continuation for the modules
    });
  }); 

};




export function returnToHome(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML =
  `${cartQuantity}`;

  return cartQuantity;
}
returnToHome(); 

// This code is not working real-time ;; Working now!:)
document.querySelectorAll('.js-cart-link').forEach((button) => {
  button.addEventListener('click', () => {
    // Recalculate the cart quantity before navigating
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    // Check the updated cart quantity
    if (cartQuantity === 0) {
      window.location.href = 'emptycart.html';
    } else {
      window.location.href = 'checkout.html';
    }
  });
});




document.querySelectorAll('.js-search-button').forEach((button) => {
  button.addEventListener('click', ()=>{
    let search = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${search}`;
    })
});


// export let favCart = [];
export let favouriteProducts = [];
// export let uniqueArray = [...new Set(favCart)];
// export let favCart = [];
function favProdsRender(){
  document.querySelectorAll('.heart-shape').forEach((heart) => {
    heart.addEventListener('click', () => {
      const productId = heart.dataset.productId;
      let likedprods = document.querySelector(`.js-heart-shape-${productId}`).innerHTML = '&#9829';
      // saveToStorageFavItems(likedprods);
      console.log(likedprods);
      products.forEach((product) => {
        if(productId === product.id){
          // console.log('Working!');
          favouriteProducts = product;
          // console.log(favouriteProducts);
          favCart.push(favouriteProducts);
          // console.log(favCart);
          saveToStorageFavItems();
        }
      });
      console.log(likedprods);
    });

  });
};






     











 