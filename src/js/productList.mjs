import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // NS if function no longer needed after Team5 activity
  // if (product.Id != "880RT" && product.Id != "989CG") {
  return `<li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}"/>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">${product.FinalPrice}</p>
            </a>
        </li>`;
  // }
}

export default async function productList(selector, category) {
  //get the element we will insert in the list from the selector
  const element = document.querySelector(selector);
  //get the list of products
  const products = await getProductsByCategory(category);
  // console.log(products);
  //render the products for the main page
  renderListWithTemplate(
    productCardTemplate,
    element,
    products,
    "afterbegin",
    true
  );
  document.querySelector(".title").innerHTML = category;
}

// function renderList(selector, products){
//     //create a string of HTML for the list of products
//     const el = document.querySelector(selector);
//     const htmlStrings =  products.map(productCardTemplate);
//     el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
// }
