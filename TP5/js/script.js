let body = document.querySelector(".allBody");
let contenedor_loader = document.querySelector(".contenedor_loader")
window.addEventListener('DOMContentLoaded', hidePage);



function hidePage() {
    setTimeout(hideDots, 1500);
    setTimeout(showPage, 2000);
}

function hideDots() {

    contenedor_loader.style.opacity = 0;
    contenedor_loader.style.visibility = "hidden";
}

function showPage() {
    body.classList.remove('allBody');
}