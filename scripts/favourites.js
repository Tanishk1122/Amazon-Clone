// import {getProduct, loadProductsFetch, products} from '../data/products.js';
import {getProduct, loadProductsFetch, products, Product} from '../data/products.js';
import {cart, updateCartQuantity, saveToStorage} from '../data/cart.js';
import formatCurrency from './utils/money.js';
import { favouriteProducts } from './amazon.js';
// Array to hold favorite products
export let favCart = [];

// Load favorite items from localStorage on page load
loadFromStorageFavItems();

// Save favCart array to localStorage
export function saveToStorageFavItems() {
    localStorage.setItem('favCart', JSON.stringify(favCart));
}

// Load favCart from localStorage
export function loadFromStorageFavItems() {
    favCart = JSON.parse(localStorage.getItem('favCart')) || [];
}

// Function to remove a product from favCart and update localStorage
function removeFromFavCart(productId) {
    // Filter out the product with the matching productId
    favCart = favCart.filter(cartItem => cartItem.id !== productId);
    
    // Save the updated favCart back to localStorage
    saveToStorageFavItems();
}

// Ensure unique products in favCart
function uniqueByKeepLast(data, key) {
    return [
        ...new Map(
            data.map(x => [key(x), x])
        ).values()
    ]
}

let newfavCart = uniqueByKeepLast(favCart, it => it.name);
console.log(newfavCart);

// Function to load the page and render favorite products
async function loadPage() {
    await loadProductsFetch();

    try {
        // Loop through each favorite product and create the HTML structure
        newfavCart.forEach((favProds) => {
            let html = `
            <div class="card-main js-Favcart-item-container-${favProds.id}">
                <div class="card-cols first-col"><img src="${favProds.image}" class="product-image">
                </div>
                <div class="card-cols second-col">
                    <div>${favProds.name}</div>
                    <div class="css-ratings js-ratings">
                        View Ratings <br>
                        <div class="on-hover-ratings">
                       ${favProds.rating.count} ratings
                    </div>
                    </div>
                    
                    <div>Price: ₹ ${favProds.priceCents}</div>
                </div>
                <div class="third-col">
                    <button class="js-add-to-cart" data-product-id="${favProds.id}"> Add to cart </button> <br><br>
                    <button class="js-remove-from-wishlist" data-product-id="${favProds.id}">Remove From Wish List</button>
                </div>
            </div>
            `;
            document.querySelector('.js-main').innerHTML += html;
        });
    } catch (error) {
        console.log('Nothing to show!', error);
    }

    // Set up remove event listeners for each product
    document.querySelectorAll('.js-remove-from-wishlist').forEach((button) => {
        const productId = button.dataset.productId;
        button.addEventListener('click', () => {
            // Remove the item from favCart and update localStorage
            removeFromFavCart(productId);

            // Remove the product card from the DOM
            const container = document.querySelector(`.js-Favcart-item-container-${productId}`);
            container.remove(); 
        });
    });

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        const productId = button.dataset.productId;
        button.addEventListener('click', () => {
            removeFromFavCart(productId);
            // // Remove the product card from the DOM
            const container = document.querySelector(`.js-Favcart-item-container-${productId}`);
            container.remove(); 

            // let productId = button.dataset.productId;
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
            updateCartQuantity();
        })  
        // updateCartQuantity();
        // saveToStorage();
    });
    updateCartQuantity();
    saveToStorage();
}
//     document.querySelectorAll('.js-ratings').forEach((button) => {
//         button.addEventListener('click', ()=>{
//             button.classList.add('on-hover-ratings');
//             button.classList.remove('js-ratings');
//         })
//     })
// }

// Call the loadPage function to render the page
loadPage();



/*
export let favCart = [];
loadFromStorageFavItems();


// loadFromStorageFavItems(favouriteProducts);
export function saveToStorageFavItems(){
    localStorage.setItem('favCart', JSON.stringify(favCart));

}

// saveToStorageFavItems();

export function loadFromStorageFavItems(){
    favCart = JSON.parse(localStorage.getItem('favCart'));

    if(!favCart){
        favCart = [];
        /*favCart = [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: [
              "socks",
              "sports",
              "apparel"
            ]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: [
              "sports",
              "basketballs"
            ]
        }]
    }
    
};

//This is for making the Favourite cart unique;
function uniqueByKeepLast(data, key){
    return [
        ...new Map(
            data.map(x => [key(x), x])
        ).values()
    ]
};

let newfavCart = uniqueByKeepLast(favCart, it => it.name);
console.log(newfavCart);
// loadFromStorageFavItems(favCart); 
async function loadPage(){
    await loadProductsFetch();
    // setTimeout(() => {
    //     console.log('Step 1 completed...');
    // }, 3000);
    // setTimeout(() => {
    //     console.log('Waiting for the next step to be executed...');
    // }, 7000);

   
    try{
        newfavCart.forEach((favProds) => {
            let html = ``;
            html += `
            <div class="card-main js-Favcart-item-container-${favProds.id}">
                <div class="card-cols first-col"><img src="${favProds.image}" class="product-image"> </div>
                <div class="card-cols second-col">
                    <div>${favProds.name}</div>
                    <div class="product-rating-container">
                        <img class="product-rating-stars"
                        src="">
                        <div class="product-rating-count link-primary">
                        ${favProds.rating.count}
                        </div>
                    </div>
                    <div>${favProds.priceCents}</div>
                </div>
                <div class="third-col">
                    <button> Add to cart </button>
                    <button class="js-remove-from-wishlist" data-product-id="${favProds.id}"> Remove From Wish List </button>
                </div>
            </div>
            `
            document.querySelector('.js-main ').innerHTML += html;
        })
    }catch(error){
        // document.querySelector('.js-main ').innerHTML = console.log('Nothing to show!');
        console.log(error);
        
    }

    document.querySelectorAll('.js-remove-from-wishlist').forEach((button) => {
        let productId = button.dataset.productId;
        button.addEventListener('click', () => {
            removeFromFavCart(productId);
            const container = document.querySelector(`.js-Favcart-item-container-${productId}`);
            // console.log(container)
            container.remove(); 
            // saveToStorageFavItems();
        })
    })
};

loadPage();

function removeFromFavCart(productId){
    let  newCart = [];
    newfavCart.forEach(cartItem => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });                                  
    favCart = newCart
    saveToStorageFavItems(newCart);
}
*/

// let matchingItem;
// export function getFavProd(productId){
//     console.log('here is the productId', productId);
//     let matchingItem;
//     products.forEach(prod => {
//         let html = ``;
//         if(productId === prod.id){
//             console.log('yes');
//             matchingItem = prod;
//             html += `
//             <div class="card-main">
//                 <div class="card-cols first-col"><img src="${matchingItem.image}" class="product-image"> </div>
//                 <div class="card-cols second-col">
//                     <div>${matchingItem.name}</div>
//                     <div class="product-rating-container">
//                         <img class="product-rating-stars"
//                         src="${matchingItem.getStarsUrl()}">
//                         <div class="product-rating-count link-primary">
//                         ${matchingItem.rating.count}
//                         </div>
//                     </div>
//                     <div>${matchingItem.priceCents}</div>
//                 </div>
//                 <div class="third-col">
//                     <button> Add to cart </button>
//                 </div>
//             </div>
//             `
//             console.log(html);
//             document.querySelector('.js-main').innerHTML += html;
//             saveToStorageFavItems(favouriteProducts);
//         }
//     });
// };






// function addToFavs(productId, products){
    //     let fetchedFavProds;
//     favouriteProducts.forEach((favProdsId) => {
//         console.log(products.id)
//         // if(favProdsId === products.id){
//         //     console.log('YEs');
//         // }
//         console.log(favProdsId);
//     });
// };
// console.log(favouriteProducts);




// function loadFavProductsOne(){
//     let html = ``;
//     products.forEach((prods) => {
//         console.log(prods);
//         // console.log(prods);
//         html += `
//             <div class="card-main">
//                 <div class="card-cols first-col"><img src="${prods.image}" class="product-image"> </div>
//                 <div class="card-cols second-col">
//                     <div>${prods.name}</div>
//                     <div class="product-rating-container">
//                         <img class="product-rating-stars"
//                         src="${prods.getStarsUrl()}">
//                         <div class="product-rating-count link-primary">
//                         ${prods.rating.count}
//                         </div>
//                     </div>
//                     <div>${prods.priceCents}</div>
//                 </div>
//                 <div class="third-col">
//                     <button> Add to cart </button>
//                 </div>
//             </div>
//         `
//         document.querySelector('.js-main').innerHTML = html;
//     });
//     // addToFavs(products.id,  products)
// }
// loadFavProductsOne ();
