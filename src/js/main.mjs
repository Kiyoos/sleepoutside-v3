import { publishAlert } from "./alert.mjs";
import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);

// NS uncomment out the below if you would like to see the alerts
// publishAlert();
