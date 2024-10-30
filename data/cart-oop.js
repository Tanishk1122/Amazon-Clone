function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
        loadFromStorage: function(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if(!this.cartItems){
                this.cartItems = [{
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
        }, 
        saveToStorage(){  //shortcut for: saveToStorage: function(){}
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        }, 
    
        //Function no. > First//
        addToCart(productId){
            let matchingItem;        
            this.cartItems.forEach((item) => {
                if(productId === item.productId){
                    matchingItem = item;
                }
            });
            // console.log(matchingItem);
            //------------------------------------------------//
            const quantitySelector = document.querySelector(  
                `.js-product-quantity-selector-${productId}`
            ); 
            const quantity = Number(quantitySelector);
            console.log(quantity);
            //------------------------------------------------//
            if(matchingItem){
                matchingItem.quantity += quantity;
            } else{
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId: '1'
                });
            }
            // console.log(cart);
            this.saveToStorage(); //to access the function inside an object
        },
    
        //Function no. > Second//
        updateCartQuantity(){
            let cartItems = 0;
            this.cartItems.forEach((cartItem)=>{ //This cartItem containes the ProductName and quantities//
                cartItems += cartItem.quantity;
            })
    
            let cartUpdation = document.querySelector('.js-cart-quantity');
            
            cartUpdation.innerHTML = cartItems;
            console.log(cartUpdation);
            this.saveToStorage();
        },
        removeFromCart(productId){
            let  newCart = [];
            this.cartItems.forEach(cartItem => {
                if(cartItem.productId !== productId){
                    newCart.push(cartItem);
                }
            });                                  
            this.cartItems = newCart
            this.saveToStorage();
        }, 
    
        // Ambiguous Lines of Code :( //
        updateDeliveryOptions(productId, deliveryOptionId){
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem
                }
            });                                          
            matchingItem.deliveryOptionId = deliveryOptionId;
    
            this.saveToStorage()
        }, 
        addingToCart(productId){
            // let  newCart = [];
            this.cartItems.forEach(cartItem => {
                if(cartItem.productId === productId){
                    cartItem.quantity+=1
                } 
        
            });
            this.saveToStorage();
        }, 
    
        updateQuantity(productId, newQuantity){
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem
                }
            });
        
            matchingItem.quantity = newQuantity
        
            this.saveToStorage();
        }
    };
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
cart.loadFromStorage();
//A different cart for Amazon business profile//
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);