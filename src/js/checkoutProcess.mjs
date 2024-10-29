import { getLocalStorage } from "./utils.mjs";
import { }



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

    },
    calculateOrderTotal: function () {


        this.displayOrderTotals();

    },

    displayOrderTotals: function () {

    }

}

export default checkoutProcess;