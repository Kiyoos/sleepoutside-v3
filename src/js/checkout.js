import checkoutProcess from "./checkoutProcess.mjs";
import { loadCheckoutEventListeners, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
checkoutProcess.init("so-cart", ".checkoutSummary");

// NS moved event listener code to utils.mjs
loadCheckoutEventListeners();
