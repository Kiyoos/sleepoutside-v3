import { loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "../js/auth.mjs";
import currentOrders from "../js/currentOrders.mjs";

loadHeaderFooter();

const token = checkLogin();
currentOrders("#orders", token);
