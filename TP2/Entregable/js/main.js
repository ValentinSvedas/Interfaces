"use strict"

let juego = null;
let canvas = null;
let ctx= null;
let menu = null;
let statMessage = null;
let statContainer = null;
let columnsInput = null;
let rowsInput = null;

let BOARD_COLUMNS = 5;
let BOARD_ROWS = 5;

let BOARD_WIDTH = 0;
let BOARD_HEIGHT = 0;
let TOKEN_NUMBER = 0;

window.onload = function main() {
    BOARD_COLUMNS = 5;
    BOARD_ROWS = 5;
    
    BOARD_WIDTH = (5 * 2) * BOARD_COLUMNS + 10 * BOARD_COLUMNS;
    BOARD_HEIGHT = (5 * 2) * BOARD_ROWS + 10 * BOARD_ROWS;
    TOKEN_NUMBER = (BOARD_COLUMNS * BOARD_ROWS) / 2;

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



//document.addEventListener("DOMContentLoaded", main);
/*
canvas.addEventListener('click',onClick, false);
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove',onMouseMove, false);
*/