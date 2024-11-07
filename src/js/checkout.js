import checkoutProcess from "./checkoutProcess.mjs";
import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();
checkoutProcess.init("so-cart", ".checkoutSummary");

document
  .querySelector("#zip")
  .addEventListener("blur", checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

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
  }
});

// listening for click on the button
//document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
//  e.preventDefault();

//checkoutProcess.checkout(document.forms['checkout']);
//});
