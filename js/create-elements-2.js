// import data from external files
import productsData from "./products-data.js";
import { selectedProductKeyName } from "./settings.js";

window.addEventListener(("DOMContentLoaded"), () => {
    displayItems();
    selectItem();
});

function displayItems() {
    const body = document.body;
    const main = document.createElement("main");
    main.classList.add("container");

    // for(let data of productsData) {
    for(let index = 0; index < productsData.length; index++) {
        // article element
        const article = createProductCard(productsData, index);
        
        main.appendChild(article);
    }

    body.appendChild(main);
}


function createProductCard(productsData, index) {
    const article = document.createElement("article");
    article.classList.add("card__item");

    // figure element
    const figure = document.createElement("figure");
    figure.classList.add("card__image");

    const img = document.createElement("img");
    img.src = `${data.img}`;
    img.setAttribute("alt", "GSX 1300 Hayabusa");

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("card__maker");
    figcaption.innerText = `${data.title}`;

    // h4 element
    const h4 = document.createElement("h4");
    h4.classList.add("card__model");
    h4.innerText = `${data.description}`;

    // link element
    const link = document.createElement("a");
    link.addEventListener("click", (e) => {
        linkClickEvent(e, productsData, index);
    });

    link.classList.add("card__link");
    link.innerText = "Select Item";
    // link.href = "products.html";
    link.setAttribute("href", "products.html");
    link.setAttribute("target", "_self");

    figure.appendChild(img);
    figure.appendChild(figcaption);

    article.appendChild(figure);
    article.appendChild(h4);
    article.appendChild(link);


    return article;
}

function linkClickEvent(e, productsData, index) {
    const {id, img, title, description} = productsData[index];

        e.preventDefault();           
        // console.log(id, img, title, description);

        // localStorage.setItem("item_ID", productsData[index].id);
        
        let keyName = selectedProductKeyName(id);

        let registeredKey = localStorage.getItem(keyName);

        if(typeof registeredKey !== 'string' && registeredKey !== 'true') {
            localStorage.setItem("item_ID", id);
            localStorage.setItem(keyName, true);
            
        } 

        // window.location.href = `./products.html?id=${productsData[index].id}`;
        // window.location.href = `./products.html?id=${id}`;
        window.location = "./products.html";
}

const selectItem = () => {
    const links = document.querySelectorAll(".container a");

    links.forEach((link, index) => {
        const {id, img, title, description} = productsData[index];
        // const id = productsData[index].id;

        link.addEventListener("click", (e) => {
            e.preventDefault();           
            // console.log(id, img, title, description);

            // localStorage.setItem("item_ID", productsData[index].id);
            
            let keyName = selectedProductKeyName(id);

            let registeredKey = localStorage.getItem(keyName);

            if(typeof registeredKey !== 'string' && registeredKey !== 'true') {
                localStorage.setItem("item_ID", id);
                localStorage.setItem(keyName, true);
                
            } 

            // window.location.href = `./products.html?id=${productsData[index].id}`;
            // window.location.href = `./products.html?id=${id}`;
            window.location = "./products.html";
        });
    });
}