import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let products = [];

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  let currentCart = getLocalStorage("so-cart");
  console.log(currentCart);
  if (currentCart == null) {
    products.push(product);
    return addProductToCart(products);
  }
  currentCart.push(product);
  addProductToCart(currentCart);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
