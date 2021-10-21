
let bird = document.querySelector('.bird');


function initGame(){
   
    startGame();
}

function startGame(){
    document.addEventListener('keydown', jump);
}

async function jump(){
    bird.classList.add("pjVolar")
    setTimeout(()=>{
         bird.classList.remove("pjVolar")
    },500)
}

window.addEventListener('DOMContentLoaded', initGame)