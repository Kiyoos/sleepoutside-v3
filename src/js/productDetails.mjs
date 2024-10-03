//import { doc } from "prettier";
import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = [];

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

async function addToCart() {
  const product = await findProductById(e.target.dataset.id);
  let currentCart = getLocalStorage("so-cart");
  if (currentCart == null) {
    product.push(product);
    return addToCart(product);
  }
  currentCart.push(product);
  addToCart(currentCart);
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
// async function addToCartHandler(e) {

// }

function renderProductDetails() {
  document.querySelector("#productBrand").innerText = product.Brand.Name;
  document.querySelector("#productName").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#finalPrice").innerText = product.FinalPrice;
  document.querySelector("#colorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#descriptionSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
