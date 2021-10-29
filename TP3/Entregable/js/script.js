let bird = document.querySelector('.bird');
let meteoro = document.querySelector(".meteoro");
let meteoro2 = document.querySelector(".meteoro2");
let menu = document.querySelector(".menu");
let fin= document.querySelector(".fin");
let tableroP = document.querySelector(".points");
let gameTxt= document.querySelector(".gameTxt");
let pluma = document.querySelector(".feather");
let volando = false;
let puntos = 0;
let gameOver = false;

function initGame(){
    let bPlay = document.querySelector(".play");
    bPlay.addEventListener("click", startGame);

    fin.style.display = "none";
    meteoro.style.display = "none";
    meteoro2.style.display = "none";
    bird.style.display = "none";
    pluma.style.display ="none";
    
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
    setTimeout(()=>{
        meteoro2.style.display = "block";
    }, 1500)
    pluma.style.display ="block";
    gameOver = false;
    puntos = 0;
    var loop = window.requestAnimationFrame(gameLoop);

}

/**
 * Hace un loop del juego mateniendo los puntos contando y si comprobando si es que toca una calabaza o pluma
 */
function gameLoop() {
   if ((Utils.isInsidePumpkin(bird.getBoundingClientRect(),meteoro.getBoundingClientRect())) || Utils.isInsidePumpkin2(bird.getBoundingClientRect(),meteoro2.getBoundingClientRect()) ) {
       endGame(false);
       window.cancelAnimationFrame(loop);
   }
   if ((Utils.isInsidePluma(bird.getBoundingClientRect(),pluma.getBoundingClientRect()))) {
        puntos+=40
        puntos.innerHTML  = puntos++ + "/1500" 
        pluma.style.display = "none"
        setTimeout(()=>{
                if (!gameOver) {
                pluma.style.display = "block"
                }
            }, Math.random()*5000)
   }
   if (puntos > 2000) {
       loadBackgraundMove(false);
       endGame(true);
       window.cancelAnimationFrame(loop);
    }else{
        tableroP.innerHTML =  puntos++ + "/2000" ;
    } 
   window.requestAnimationFrame(gameLoop);
}
/**
 * Hace que el personaje salte, si es que esta saltando no puede volver a hacer la accion
 * @param {*} e 
 */
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
/**
 * Muestra el botón de restart
 */
function showRestart(){
    fin.style.display = "block";
    restartB = document.querySelector(".restart"); 
    restartB.addEventListener("click", startGame);
}

/**
 * Termina el juego dependiendo si ganaste o perdiste
 * @param {*} cond 
 */
function endGame(cond) {
    meteoro.style.display = "none";
    meteoro2.style.display = "none";
    pluma.style.display = "none";
    gameOver = true;
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
/**
 * Hace que el fondo se detenga o se mueva
 */
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