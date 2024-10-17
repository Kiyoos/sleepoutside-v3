import { publishAlert } from "./alert.mjs";
import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

productList(".product-list", "tents");
loadHeaderFooter();

// NS uncomment out the below if you would like to see the alerts
// publishAlert();
