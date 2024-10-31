import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary: function () {
    // NS sums the FinalPrice from each item in the cart
    const items = this.list;
    const sumTotal = items.reduce((total, item) => {
      return total + item.FinalPrice;
    }, 0);
    console.log(sumTotal);
    const element = document.getElementById("itemTotal");
    // NS formats the total to USD
    const formatTotal = sumTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const itemQty = items.length;
    return (element.innerHTML = `Item Subtotal(${itemQty}): ${formatTotal}`);
  },
  calculateOrderTotal: function () {
    this.displayOrderTotals();
  },

  displayOrderTotals: function () {},
};

export default checkoutProcess;
