//import { doc } from "prettier";
import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};
let products = [];

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

// async function addToCart() {
//   setLocalStorage("so-cart", product);
// }

// add to cart button event handler
// async function addToCartHandler(e) {}

async function addToCart() {
  // NS grabs current cart contents, so additional contents can be added.
  let currentCart = getLocalStorage("so-cart");
  // NS checks if the cart is empty, if it is then it will add the product to the products array
  if (currentCart == null) {
    products.push(product);
    console.log(`products: ${products}`);
    return setLocalStorage("so-cart", products);
  }
  // NS adds additional content to the existing cart
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);

  // NS use if you only want one item in the cart at a time.
  // setLocalStorage("so-cart", product);
}

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
