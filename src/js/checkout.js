import checkoutProcess from "./checkoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
checkoutProcess.init("so-cart", "checkout-summary");
