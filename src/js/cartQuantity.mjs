// NS add quantity to backpack icon
import { getLocalStorage } from "./utils.mjs";

export async function cartQty() {
  let cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  // NS only creates the cartQty if the cart has something in it
  if (cartItems.length > 0) {
    const cartQtyEl = document.querySelector(".cart a");
    const spanEl = document.createElement("span");
    spanEl.setAttribute("id", "cartQty");
    spanEl.innerText = cartItems.length;
    cartQtyEl.appendChild(spanEl);
  }
}
