/*
// Load cart from localStorage or initialize it with default values
export let cart;
loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [];
    }
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add a product to the cart
export function addToCart(productId) {
    let matchingItem = cart.find(item => item.productId === productId);
    
    const quantitySelector = document.querySelector(`.js-product-quantity-selector-${productId}`);
    const quantity = quantitySelector ? Number(quantitySelector.value) : 1;

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity: quantity, // Ensure quantity is passed correctly
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

// Update the cart quantity display
export function updateCartQuantity() {
    const cartItems = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    
    const cartUpdation = document.querySelector('.js-cart-quantity');
    if (cartUpdation) {
        cartUpdation.innerHTML = cartItems;
    }
    saveToStorage();
}

// Remove a product from the cart
export function removeFromCart(productId) {
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    saveToStorage();
}

// Increment product quantity
export function addingToCart(productId) {
    const matchingItem = cart.find(cartItem => cartItem.productId === productId);
    if (matchingItem) {
        matchingItem.quantity += 1;
    }
    saveToStorage();
}

// Update product quantity
export function updateQuantity(productId, newQuantity) {
    const matchingItem = cart.find(cartItem => cartItem.productId === productId);
    if (matchingItem) {
        matchingItem.quantity = newQuantity;
    }
    saveToStorage();
}

// Update delivery option for a product
export function updateDeliveryOptions(productId, deliveryOptionId) {
    const matchingItem = cart.find(cartItem => cartItem.productId === productId);
    if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
    }
    saveToStorage();
}

// Fetch cart data from backend using Fetch API
export async function loadCartFetch() {
    try {
        const response = await fetch('https://supersimplebackend.dev/cart');
        const data = await response.json(); // Assuming the response is JSON
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

// Load cart data using XMLHttpRequest
export function loadCart(callback) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        callback();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}

// Send localStorage cart data to the backend
export async function sendCartToBackend() {
    try {
        const response = await fetch('https://supersimplebackend.dev/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });
        
        const result = await response.json();
        console.log('Cart data sent successfully:', result);
    } catch (error) {
        console.error('Error sending cart data:', error);
    }
}
*/

export let cart;
loadFromStorage();
export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart){
        cart = [{
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }, 
        {
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        },
        {
            productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
            quantity: 6,
            deliveryOptionId: '3'
        }];
    }
};


export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
//Function no. > First//
export function addToCart(productId){
    let matchingItem;        
    cart.forEach((item) => {
        if(productId === item.productId){
            matchingItem = item;
        }
    });
    // console.log(matchingItem);
    // //------------------------------------------------//
        const quantitySelector = document.querySelector(`.js-product-quantity-selector-${productId}`); 
        const quantity = Number(quantitySelector.value);
    // console.log('Here is the quantity', quantity);
// //------------------------------------------------//
    if(matchingItem){
        matchingItem.quantity += quantity;
    } else{
        cart.push({
            productId,
            quantity: quantity,
            deliveryOptionId: '1'
        });
    }
    // console.log(cart);
    saveToStorage();
}



//Fu nction no. > Second//
export function updateCartQuantity(productId, newQuantity){
    let cartItems = 0;
    cart.forEach((cartItem)=>{ //This cartItem containes the ProductName and quantities//
        cartItems += cartItem.quantity;
    })

    let cartUpdation = document.querySelector('.js-cart-quantity');
    
    cartUpdation.innerHTML = cartItems;
    console.log(cartUpdation);
    saveToStorage();
}
 
export function removeFromCart(productId){
    let  newCart = [];
    cart.forEach(cartItem => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });                                  
    cart = newCart
    saveToStorage();
}



export function addingToCart(productId){
    // let  newCart = [];
    cart.forEach(cartItem => {
        if(cartItem.productId === productId){
            cartItem.quantity+=1
        } 

    });
    saveToStorage();
}


export function updateQuantity(productId, newQuantity){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem
        }
    });
    matchingItem.quantity = newQuantity
    saveToStorage();
}


// Ambiguous Lines of Code :( //
export function updateDeliveryOptions(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem
        }
    });                                          
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage()
}

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text
}   

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => { 
      console.log(xhr.response);
      fun();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}
  
// export async function fetchLocalStorage(cart){

//     const stepOne = await fetch('https://supersimplebackend.dev/cart', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         }, 
//         body: JSON.stringify({key1: cart})
//     }).then((response) => {
//         response.text();
//     }).then(result => {
//         console.log(result)
//     }).catch(){
//         console.log('Error is There!')
//     }
// }
// fetchLocalStorage();