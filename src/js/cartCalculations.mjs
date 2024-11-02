// NS use this file for math in the cart

export function cartTotal(items) {
  // NS sums the FinalPrice from each item in the cart
  const sumTotal = items.reduce((total, item) => {
    return total + item.FinalPrice * item.Quantity;
  }, 0);

  const element = document.getElementById("cart-total");
  // NS formats the total to USD
  const formatTotal = sumTotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (element.innerHTML = `Total: ${formatTotal}`);
}
