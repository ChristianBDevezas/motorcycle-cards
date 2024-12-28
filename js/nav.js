const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector('.navigation');

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("change");
    navigation.classList.toggle("change");
});