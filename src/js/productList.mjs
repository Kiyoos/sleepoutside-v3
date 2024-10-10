import { getData} from "./productData.mjs"
import { renderListWithTemplate } from "./utils.mjs";
function productCardTemplate(product){
    if (product.Image === null) {
        console.log("IMAGE NOT FOUND");
    }
    else{
        return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}"
                alt="Image of ${product.Name}"/>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">${product.FinalPrice}</p>
            </a>
        </li>`;
    }
}

export default async function productList(selector, category){
    //get the element we will insert in the list from the selector
    const element = document.querySelector(selector);
    //get the list of products
    const products = await getData(category);
    console.log(products);
    //modify the list of products to display just the first 4 we need
    // const productsToDisplay = products.slice(0, 4);
    renderListWithTemplate(productCardTemplate, element, products, "afterbegin", true);
}
// function renderList(selector, products){
//     //create a string of HTML for the list of products
//     const el = document.querySelector(selector);
//     const htmlStrings =  products.map(productCardTemplate);
//     el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
// }