import { cartQty } from "./cartQuantity.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// gets needed parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  //clear out the element provided if clear is true.
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  //clear out the element provided if clear is true.
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.getElementById("main-header");
  const footerEl = document.getElementById("main-footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
  // NS loads the carty quantity with page load
  setTimeout(cartQty, 200);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      main.removeChild(alert);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) {
    window.scrollTo(0, 0);
  }
  setTimeout(() => {
    main.removeChild(alert);
  }, duration);
}
export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    document.querySelector("main").removeChild(alert);
  });
}

// NS moved event listensers for the checkout process to here
// code needed to be an enclosed function, to stop errors on success page
export function loadCheckoutEventListeners() {
  // NS added this if function, so the event listeners would only run on the checkout page
  if (window.location.pathname.includes("success")) {
    return;
  }

  // Total does not show unless the zip code has been clicked or tabbed through
  document
    .querySelector("#zip")
    .addEventListener("blur", checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

  // Submits the information in the form, validates, and clears cart
  document.forms["checkout"].addEventListener("submit", (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {
      checkoutProcess.checkout(e.target);
      window.location.href = "/checkout/success.html";
      const clearCart = [];
      setLocalStorage("so-cart", clearCart);
      let bagIcon = document.querySelectorAll(".bagIcon");
      bagIcon.removeClass("bagIconActive");
    }
  });

  //NS added customer registration
  document.getElementById("register").addEventListener("click", () => {
    window.location.href = "/users/index.html";
  });

  // listening for click on the button
  //document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  //  e.preventDefault();

  //checkoutProcess.checkout(document.forms['checkout']);
  //});
}
