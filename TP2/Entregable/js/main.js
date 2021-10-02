"use strict"

let juego = null;
var canvas = null;
let ctx= null;
let menu = null;

let BoardColumns = 5;
let BoardRows = 5;

let Board_W = 0;
let Board_H = 0;
let NumeroFichas = 0;

 function main() {
    BoardColumns = 5;
    BoardRows = 5;
    
    Board_W = (30 * 2) * BoardColumns + 10 * BoardColumns;
    Board_H = (30 * 2) * BoardRows + 10 * BoardRows;
    NumeroFichas = (BoardColumns * BoardRows) / 2;

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");

    juego = new Juego(ctx);
    juego.inicioJuego();
}    

/*
function onClick(e) {
    let posX = e.layerX
    let posY = e.layerY
    let color = '#ffffff'
   
    let circle = new Circle(posX,posY,tam,color, ctx);
    
    circle.draw();
        
}


function onMouseDown(e) {
    this.isMouseDown = true;
    let posX = e.layerX
    let posY = e.layerY
    let color ='#ffffff'

    let circle = new Circle(posX,posY,tam,color, ctx);
    
    circle.draw();
        
}
function onMouseMove(e) {
    if (this.isMouseDown) {
        let posX = e.layerX
        let posY = e.layerY
        let color ='#ffffff'
        let circle = new Circle(posX,posY,tam,color, ctx);
      
        circle.draw();
        
    }
}

*/



document.addEventListener("DOMContentLoaded", main);
/*
canvas.addEventListener('click',onClick, false);
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove',onMouseMove, false);
*/