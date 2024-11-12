import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";
import { removeEvents } from "./remove.mjs";
import { cartTotal, qtyEvents } from "./cartCalculations.mjs";

export default function shoppingCart() {
  let cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");

  // NS gives a message if the cart is empty;
  if (cartItems == null || cartItems.length == 0) {
    outputEl.innerHTML = `<p>Cart is empty. Please add product to see it here.</p>`;
    return;
  }

  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  addRemoveAll();
  cartTotal(cartItems);
  removeEvents();
  qtyEvents();
  checkoutButton();
}

function addRemoveAll() {
  const sectionEl = document.getElementById("removeAll");
  sectionEl.innerText = "Remove All";
  return;
}

function cartItemTemplate(item) {
  //console.log(item.Images.PrimaryMedium);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">
    <span class="decreaseQty" data-id="${item.Id}">&minus;</span>
    <span class="currentQty" >${item.Quantity}</span>
    <span class="increaseQty" data-id="${item.Id}">&plus;</span>
  </p>
  <p class="cart-card__price">
    $${item.FinalPrice} each
    <span class="remove" data-id="${item.Id}">&#10060;</span>
  </p>
</li>`;

  return newItem;
}

function checkoutButton() {
  const cartEl = document.getElementById("cart-total");
  const checkoutButtonEl = `<button id="checkout" onclick="location.href='/checkout/index.html'">Checkout</button>`;
  return cartEl.insertAdjacentHTML("afterend", checkoutButtonEl);
}
