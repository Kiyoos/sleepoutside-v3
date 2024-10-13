// This page done by Nina Saunders
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export function removeItem(itemId) {
  // NS grabs current cart contents
  let currentCart = getLocalStorage("so-cart");

  // NS finds the index of the item with a specfic ID
  const index = currentCart.findIndex((product) => product.Id === itemId);

  // NS removes indexed item from currentCart
  const removed = currentCart.splice(index, 1);

  // NS sets the cart with current items
  setLocalStorage("so-cart", currentCart);

  // NS reloads the page so it shows the current cart
  location.reload();
}

export function removeAll() {
  // console.log("Remove All clicked");
  let currentCart = getLocalStorage("so-cart");
  currentCart = [];
  setLocalStorage("so-cart", currentCart);
  location.reload();
}
