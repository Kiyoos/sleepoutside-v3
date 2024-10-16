import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";
import { removeEvents } from "./remove.mjs";
import { cartTotal } from "./cartCalculations.mjs";

export default function shoppingCart() {
  let cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");

  // NS removes the "Remove All" text and Cart Total and adds message if the cart is empty
  if (cartItems == null || cartItems.length == 0) {
    document.querySelector("#removeAll").innerHTML = "";
    document.querySelector("#cart-footer").innerHTML = "";
    cartItems = `<p>Cart is empty. Please add product to see it here.</p>`;
    document.querySelector(".product-list").innerHTML = cartItems;
    return;
  }

  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  cartTotal(cartItems);
  removeEvents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1 
    <span class="remove" data-id="${item.Id}">&#10060;</span>
  </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
