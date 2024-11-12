// NS add quantity to backpack icon
import { getLocalStorage } from "./utils.mjs";

export async function cartQty() {
  // console.log("cartQty is called");
  let cartItems = getLocalStorage("so-cart");
  // NS error handling if cart is null
  if (cartItems === null || cartItems.length === 0) {
    return;
  }

  //NS sums the quantity items in the cart
  const cartItemTotal = cartItems.reduce((total, item) => {
    return total + item.Quantity;
  }, 0);

  console.log(cartItems);
  // NS only creates the cartQty if the cart has something in it
  if (cartItemTotal > 0) {
    const cartQtyEl = document.querySelector(".cart a");
    const spanEl = document.createElement("span");
    spanEl.setAttribute("id", "cartQty");
    spanEl.innerText = cartItemTotal;
    cartQtyEl.appendChild(spanEl);
    let bagIcon= document.getElementById("bagIcon");
    bagIcon.classList.add("bagIconActive");
  }
}
