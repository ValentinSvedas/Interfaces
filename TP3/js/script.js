
let bird = document.querySelector('.bird');
let meteoro = document.getElementById("meteoro");
let volando = false;

function initGame(){
   
    startGame();
}

function startGame(){
    document.addEventListener('keydown', jump);
}

async function jump(){
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
        },1600)
    }
   
}


window.addEventListener('DOMContentLoaded', initGame)