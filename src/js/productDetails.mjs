import { cartQty } from "./cartQuantity.mjs";
import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";

let product = {};
let products = [];

export default async function productDetails(productId) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);

  //AB - error handling
  if (!product) {
    showError("Product not found.");
    return;
  }

  // once we have the product details we can render out the HTML
  renderProductDetails();
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", function(){
    addToCart();
    alertMessage(`${product.NameWithoutBrand} added to cart!`);
  }, false);
}

async function addToCart() {
  // NS grabs current cart contents, so current contents aren't lost when additional contents are added.
  let currentCart = getLocalStorage("so-cart");

  // NS checks if the cart is empty, if it is then it will add the product to the products array
  if (currentCart === null || currentCart.length === 0) {
    //NS adds the Quantity element at a value of 1 each time a new item is added to a cart.
    product["Quantity"] = 1;
    products.push(product);
    setLocalStorage("so-cart", products);
    cartQty();
    return;
  }

  // NS finds the index number of the existing item in cart
  const itemIndex = currentCart.findIndex((item) => item.Id === product.Id);

  if (itemIndex >= 0) {
    // console.log(`The cart already has product id: ${product.Id}`);
    currentCart[itemIndex].Quantity++;
    console.log(currentCart);
    setLocalStorage("so-cart", currentCart);
    cartQty();
    return;
  }

  // NS adds additional content to the existing cart or "current cart"
  product["Quantity"] = 1;
  currentCart.push(product);
  console.log(currentCart);
  setLocalStorage("so-cart", currentCart);
  cartQty();
}

function renderProductDetails() {
  document.querySelector("#productBrand").innerText = product.Brand.Name;
  document.querySelector("#productName").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#finalPrice").innerText = product.FinalPrice;
  document.querySelector("#colorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#descriptionSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

//function to display an error image
function showError(message) {
  const errorContainer = document.querySelector("#error-message");
  errorContainer.innerText = message;

  //hide add to cart button
  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.style.display = "none";
  }
}
