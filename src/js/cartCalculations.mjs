// NS use this file for math in the cart
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export function cartTotal(items) {
  // NS sums the FinalPrice from each item in the cart
  const sumTotal = items.reduce((total, item) => {
    return total + item.FinalPrice * item.Quantity;
  }, 0);

  const element = document.getElementById("cart-total");
  // NS formats the total to USD
  const formatTotal = sumTotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (element.innerHTML = `Total: ${formatTotal}`);
}

export function increaseQty(itemId) {
  // NS grabs current cart contents
  let currentCart = getLocalStorage("so-cart");

  // NS finds the index of the item with a specfic ID
  const itemIndex = currentCart.findIndex((product) => product.Id === itemId);

  // NS increase quantity of the item
  currentCart[itemIndex].Quantity++;

  // NS sets the cart with current items
  setLocalStorage("so-cart", currentCart);

  // NS reloads the page so it shows the current cart
  location.reload();
}

export function decreaseQty(itemId) {
  // NS grabs current cart contents
  let currentCart = getLocalStorage("so-cart");

  // NS finds the index of the item with a specfic ID
  const itemIndex = currentCart.findIndex((product) => product.Id === itemId);

  // NS increase quantity of the item
  currentCart[itemIndex].Quantity--;

  // NS removes the item from the cart if the quantity is zero
  if (currentCart[itemIndex].Quantity === 0) {
    currentCart.splice(itemIndex, 1);
  }

  // NS sets the cart with current items
  setLocalStorage("so-cart", currentCart);

  // NS reloads the page so it shows the current cart
  location.reload();
}

export function qtyEvents() {
  // NS adds a click event to all "+" in the cart then calls the increaseQty function
  document.querySelectorAll(".increaseQty").forEach((item) => {
    item.addEventListener("click", (event) => {
      const clickedItem = event.target;
      const attributeValue = clickedItem.getAttribute("data-id");
      return increaseQty(attributeValue);
    });
  });

  // NS adds a click event to all "-" in the cart then calls the decreaseQty function
  document.querySelectorAll(".decreaseQty").forEach((item) => {
    item.addEventListener("click", (event) => {
      const clickedItem = event.target;
      const attributeValue = clickedItem.getAttribute("data-id");
      return decreaseQty(attributeValue);
    });
  });
}
