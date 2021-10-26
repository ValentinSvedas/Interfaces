let bird = document.querySelector('.bird');
let meteoro = document.querySelector(".meteoro");
let menu = document.querySelector(".menu");
let l6 = document.querySelector(".layer6");
let volando = false;
let puntos = 0;

function initGame(){
    let bPlay = document.querySelector(".play");
    let l7 = document.querySelector(".layer7");
    let l5= document.querySelector(".layer5");
    let l4 = document.querySelector(".layer4");
    meteoro.style.display = "none";
    bPlay.addEventListener("click", startGame);
}

function startGame(){
    menu.style.display = "none";
    meteoro.style.display = "block";
    document.addEventListener('keydown', jump);
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
   if ((Utils.isInside(bird.getBoundingClientRect(),meteoro.getBoundingClientRect()))) {
    bird.classList.add("pjdead");
   }
   window.requestAnimationFrame(gameLoop);
}

function jump(e){
    if (Utils.checkKey(e)) {
        if (volando == false) {
            volando = true;
            bird.classList.add("pjvolar")
            setTimeout(()=>{
                 bird.classList.remove("pjvolar")
                 bird.classList.add("pjcaer")
            },1000)
            setTimeout(()=>{
                bird.classList.remove("pjcaer")
                volando=false;
            },1400)
        }
    }
}



window.addEventListener('DOMContentLoaded', initGame)