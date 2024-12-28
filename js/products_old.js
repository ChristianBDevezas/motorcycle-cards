// import data products
import productsData from "./products-data.js";
import {selectedProductKeyName, getProductSelectedById, getCardAnimationClass, cardAnimationOccured} from "./settings.js";

// create variable to store the id of selected item
// const selectIdProduct = localStorage.getItem("item_ID");
const selectIdProduct = getProductSelectedById();
console.log(selectIdProduct, typeof(selectIdProduct));

// body element
const body = document.body;

// main element
const main = document.createElement("main");
main.classList.add("container");

// message element
const message = document.querySelector(".title h3");
message.style.display = "none";

// check if some product is selected
if(selectIdProduct === null) {
    message.style.display = "block";
    message.innerHTML = "None card is selected!";
    main.style.display = "none";
    throw new Error("None card is selected!");
}

// create variable to convert the id of selected item to number type
const itemId = +(selectIdProduct);
console.log(itemId, typeof(itemId));

// let deleteProductID = selectedProductKeyName(itemId);
let selectProductId = selectedProductKeyName(itemId);
console.log(selectProductId, typeof(selectProductId));

// article element
const article = document.createElement("article");
// article.classList.add("card__item");
article.classList.add("card__item", "card-effect");

// figure element
const figure = document.createElement("figure");
// figure.classList.add("card__image");
figure.classList.add("card__image", "image-effect");

function createCard() {
    // get current item and loop through productsData
    let currentItem;

    for(let item of productsData) {
        if(item.id == itemId) {
            currentItem = item;
        }
    }

    // card image
    const img = document.createElement("img");
    // img.src = "img/gsx-1300r.jpg";
    img.src = currentItem.img;
    // img.setAttribute("src", currentItem.img);
    img.setAttribute("alt", currentItem.description);
    // img.alt = currentItem.description;
    // img.classList.add("image-effect");

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("card__maker", "text-effect");
    // figcaption.classList.add("card__maker");
    // figcaption.innerText = "Suzuki";
    figcaption.innerText = currentItem.title;

    // h4 element
    const h4 = document.createElement("h4");
    // h4.classList.add("card__model");
    h4.classList.add("card__model", "text-effect");
    // h4.innerText = "GSX 1300 Hayabusa";
    h4.innerText = currentItem.description;

    // div element
    const div = document.createElement("div");
    div.classList.add("card__buttons");

    const link = document.createElement("a");
    link.classList.add("card__link");
    link.innerText = "Back to Home";
    link.href = "index.html";
    link.setAttribute("target", "_self");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("card__delete");
    deleteBtn.innerText = "Delete";

    figure.appendChild(img);
    figure.appendChild(figcaption);

    div.appendChild(link);
    div.appendChild(deleteBtn);

    article.appendChild(figure);
    article.appendChild(h4);
    article.appendChild(div);

    main.appendChild(article);

    return main;
}

// body.appendChild(main);
body.appendChild(createCard());

// get some elements from selected card
const cardArticle = document.querySelector("article");
const cardDeleteBtn = document.querySelector("button.card__delete");

// remove selected item
cardDeleteBtn.addEventListener("click", () => {
    cardArticle.remove();

    localStorage.removeItem("item_ID");
    // localStorage.removeItem(deleteProductID);
    localStorage.removeItem(selectProductId);
    // localStorage.clear();
    
    window.location.href = "./index.html";
});

window.addEventListener("DOMContentLoaded", () => {
    executeAnimation(selectProductId);
});

function executeAnimation(selectProductId) {
    let selectedProduct = itemId;    
    console.log(selectedProduct, typeof(selectedProduct));
    
    if(selectedProduct === null) return;
    
    // let selectedProductName = selectedProductKeyName(selectedProduct);
    // console.log(selectedProductName);
    
    let hasAnimation = cardAnimationOccured(selectedProduct);
    console.log(hasAnimation, typeof(hasAnimation));
    
    if(hasAnimation) {
        figure.classList.remove(getCardAnimationClass());
    }
    else {
        // localStorage.setItem(selectedProductName, true);
        localStorage.setItem(selectProductId, true);
    }
}