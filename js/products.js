// import productsData from "./products-data.js";
import {selectedProductKeyName, getProductSelectedById, cardAnimationOccured, getRegisteredProductList} from "./settings.js";

// create variable to store the id of selected item
const selectIdProduct = getProductSelectedById();

// body element
const body = document.body;

// main element
const main = document.createElement("main");
main.classList.add("container");
body.appendChild(main);

// body.appendChild(main);
// body.appendChild(createCard());

let registeredProductList = getRegisteredProductList();

// check if some product is selected
if(registeredProductList.length === 0) {
    // message element
    const message = document.querySelector(".title h3");
    message.style.display = "none";
    message.style.display = "block";
    message.innerHTML = "None card is selected!";
    
    localStorage.removeItem("item_ID");
    // throw new Error("None card is selected!");
}
else {
    for(let item of registeredProductList) {
        // body.appendChild(createCard(item));
        main.appendChild(createCard(item));
    }
}

// create variable to convert the id of selected item to number type
const itemId = +(selectIdProduct);
// console.log(itemId, typeof(itemId));

function createCard(currentItem) {
    let classToEasyToSelection = selectedProductKeyName(currentItem.id);

    // article element
    const article = document.createElement("article");    
    article.classList.add("card__item", "card-effect", classToEasyToSelection);

    // figure element
    const figure = document.createElement("figure");    
    figure.classList.add("card__image", classToEasyToSelection);

    // card image
    const img = document.createElement("img");    
    img.src = currentItem.img;    
    img.setAttribute("alt", currentItem.description);    
    
    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("card__maker", classToEasyToSelection);    
    figcaption.innerText = currentItem.title;

    // h4 element
    const h4 = document.createElement("h4");    
    h4.classList.add("card__model",  classToEasyToSelection);    
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

    deleteBtn.addEventListener("click", (e) => deleteCard(article, currentItem));    

    figure.appendChild(img);
    figure.appendChild(figcaption);

    div.appendChild(link);
    div.appendChild(deleteBtn);    
    
    article.appendChild(figure);
    article.appendChild(h4);
    article.appendChild(div);

    // main.appendChild(article);
    // return main;

    return article;
}

function deleteCard(article, currentItem) {
    article.remove();

    localStorage.removeItem("item_ID");
    
    let keyName = selectedProductKeyName(currentItem.id);
    localStorage.removeItem(keyName);

    let registeredProductList = getRegisteredProductList();
    let countRegisteredProductList = registeredProductList.length;        
    
    if(countRegisteredProductList === 0) {
        window.location.href = "./index.html";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let selectProductId = selectedProductKeyName(itemId);
    
    const selectIdProduct = getProductSelectedById();
    console.log("DOMContentLoaded selectIdProduct", selectIdProduct);

    if(selectIdProduct !== null) {
        const itemId = +(selectIdProduct);

        executeAnimation(selectProductId, itemId);
    }
});

function executeAnimation(selectProductId, itemId) {
    let selectedProduct = itemId;   
    
    console.log("executeAnimation selectProductId", selectProductId);
    console.log("executeAnimation itemId", itemId);
    
    if(selectedProduct === null) return;

    let figure = document.querySelector(`figure.${selectProductId}`);
    figure.classList.add("image-effect");
    console.log("figure", figure);    

    let figcaption = document.querySelector(`figcaption.${selectProductId}`);
    figcaption.classList.add("text-effect");
    console.log("figcaption", figcaption);    

    let h4 = document.querySelector(`h4.${selectProductId}`);
    h4.classList.add("text-effect");
    console.log("h4", h4);
    
    let hasAnimation = cardAnimationOccured(selectedProduct);    
    // console.log("hasAnimation", hasAnimation);

    if(typeof hasAnimation === "string") {
        localStorage.removeItem("item_ID");
    }
    else {
        localStorage.setItem(selectProductId, true);
    }
}