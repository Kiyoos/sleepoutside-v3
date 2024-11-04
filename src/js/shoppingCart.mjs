import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";
import { removeEvents } from "./remove.mjs";
import { cartTotal } from "./cartCalculations.mjs";

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
    <span>qty: ${item.Quantity}</span>
    <span class="remove" data-id="${item.Id}">&#10060;</span>
    <span class="decreaseQty">-</span>
    <span class="increaseQty">+</span>
  </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
