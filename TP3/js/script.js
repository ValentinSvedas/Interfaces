
let bird = document.querySelector('.bird');

function initGame(){
   
    startGame();
}

function startGame(){
    document.addEventListener('keydown', jump);
}

async function jump(){
    bird.classList.add("pjvolar")
    setTimeout(()=>{
         bird.classList.remove("pjvolar")
         bird.classList.add("pjcaer")
    },1000)
    setTimeout(()=>{
        bird.classList.remove("pjcaer")
    },1600)
}


window.addEventListener('DOMContentLoaded', initGame)