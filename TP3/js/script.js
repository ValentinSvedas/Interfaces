let bird = document.querySelector('.bird');
let meteoro = document.querySelector(".meteoro");
let menu = document.querySelector(".menu");
let fin= document.querySelector(".fin");
let tableroP = document.querySelector(".points");
let gameTxt= document.querySelector(".gameTxt");
let volando = false;
let puntos = 0;

function initGame(){
    let bPlay = document.querySelector(".play");
    bPlay.addEventListener("click", startGame);

    fin.style.display = "none";
    meteoro.style.display = "none";
    bird.style.display = "none";
    
}

function startGame(){
    loadBackgraundMove(true);
    document.addEventListener('keydown', jump);
    
    bird.style.display = "block";
    bird.classList.add("bird");
    bird.classList.remove("pjdead");

    fin.style.display = "none";
    menu.style.display = "none";
    meteoro.style.display = "block";
    puntos = 0;

    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
   if ((Utils.isInside(bird.getBoundingClientRect(),meteoro.getBoundingClientRect()))) {
    endGame(false);
    window.cancelAnimationFrame();
   }
   if (puntos > 1000) {
       loadBackgraundMove(false);
       endGame(true);
       window.cancelAnimationFrame();
    }else{
        tableroP.innerHTML =  puntos++ + "/1000" ;
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
function showRestart(){
    fin.style.display = "block";
    restartB = document.querySelector(".restart"); 
    restartB.addEventListener("click", startGame);
}

function endGame(cond) {
    meteoro.style.display = "none";
    
    if (cond) {
        gameTxt.innerHTML="Ganaste"
        showRestart();
    }else{
        bird.classList.add("pjdead");
        setTimeout(()=>{
            gameTxt.innerHTML="Perdiste"
             loadBackgraundMove(false);
            showRestart();
        },800);    
    }
}
function loadBackgraundMove(activar) {
    let l5 = document.querySelector(".layer5");
    let l4 = document.querySelector(".layer4");
    let l3= document.querySelector(".layer3");
    let l2 = document.querySelector(".layer2");
    let l1 = document.querySelector(".layer1");
    if (activar) {
        l1.classList.add("l1Animation");
        l2.classList.add("l2Animation");
        l3.classList.add("l3Animation");
        l4.classList.add("l4Animation");
        l5.classList.add("l5Animation");
    }else{
        l1.classList.remove("l1Animation");
        l2.classList.remove("l2Animation");
        l3.classList.remove("l3Animation");
        l4.classList.remove("l4Animation");
        l5.classList.remove("l5Animation");
    }
}



window.addEventListener('DOMContentLoaded', initGame)