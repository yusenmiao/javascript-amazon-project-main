export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

/**
 * Function: store all the cart data into local
 */
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 Function: Loop through the items in cart to find if the current new productId,
if it's in the cart, we find the matchingItem, then we only 
need to update the quantity of that item
**/
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }
  saveToStorage();
}

/**
 * Function: remove the item from cart list
 */
export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

/**
 * Function: calculate the cart quanatity
 */

export function calculateCartQuantity() {
  let cartquantity = 0;

  cart.forEach((cartItem) => {
    cartquantity += cartItem.quantity;
  });
  return cartquantity;
}

/**
 * Function: update cart quantity based on "update button"
 */
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;

  saveToStorage();
}
