import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    const order1 = orders[0].items;
    console.log(orders);

    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}

function orderTemplate(order) {
  return `<tr>
      <td>${order.id}</td>
      <td>${order.fname} ${order.lname}</td>
      <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
      <td>${order.items.length}</td>
      <td>${order.orderTotal}</td>
    </tr>`;
}
