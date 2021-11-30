function showChat() {
    chat.classList.add(".hide")
}

let chatA = document.querySelector('.chatA');
chatA.addEventListener("click", showChat);
var mql = window.matchMedia('(max-width: 1000px)');
var chat = document.querySelector(".chat");

mql.onchange = (e) => {
    if (e.matches) {
        chat.style.display = "none"
    } else {
        chat.style.display = "block"
    }
}



function showChat() {
    if (chat.style.display == "none") {
        chat.style.display = "block"
    } else {
        chat.style.display = "none"
    }
}