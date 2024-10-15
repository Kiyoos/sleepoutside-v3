import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
// import { removeAll, removeItem } from "./remove.mjs";
import shoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();
shoppingCart();

// NS MOVE CODE TO SHOPPINGCART.MJS
// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   let htmlItems = ``;
//   // NS removes the Remove All text and addes message if the cart is empty
//   if (cartItems == null || cartItems.length == 0) {
//     htmlItems = `<p>Cart is empty. Please add product to see it here.</p>`;
//     document.querySelector("#removeAll").innerHTML = "";
//     document.querySelector(".product-list").innerHTML = htmlItems;
//     return;
//   }
//   htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1
//     <span class="remove" data-id="${item.Id}">&#10060;</span>
//   </p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();

// // NS adds a click event to all items in the cart then calls the removeItem function
// document.querySelectorAll(".remove").forEach((item) => {
//   item.addEventListener("click", (event) => {
//     const clickedItem = event.target;
//     const attributeValue = clickedItem.getAttribute("data-id");
//     return removeItem(attributeValue);
//   });
// });

// // NS adds click event to remove all items
// document.querySelector("#removeAll").addEventListener("click", removeAll);
