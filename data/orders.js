
export const orders = JSON.parse(localStorage.getItem('orders')) || []; //gettig the array of the prders which we have saved into the local storage.

export function addOrder(order) {
  orders.unshift(order);  // Add the new order to the beginning of the array
  saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if(order.id === orderId) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
};

