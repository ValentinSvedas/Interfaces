"use strict";

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let cHeight = canvas.height;
let cWidth= canvas.width;

let isMouseDown = false;
let isGoma = false;

let figures=[];



function drawFigure() {
   
    for (let i = 0; i < figures.length; i++) {
        let elem = figures[i];
        if (i>0) {
            let lastCircle = figures[i-1];
            ctx.beginPath();
            ctx.moveTo(lastCircle.getPosX(),lastCircle.getPosY());
            ctx.lineTo(elem.getPosX(),elem.getPosY());
            ctx.lineWidth = 20;
            ctx.stroke();
        
                ctx.strokeStyle = setColor(true);
            
            
            ctx.closePath();
            
        }
        elem.draw();
    }


}

function onMouseUp(e) {
    this.isMouseDown = false;
    figures = [];
}

function onMouseDown(e) {
    this.isMouseDown = true;
    let posX = e.layerX
    let posY = e.layerY
    let color
    color = setColor(true);
   

    let circle = new Circle(posX,posY,10,color, ctx);
    drawFigure();
    figures.push(circle);
}

function onMouseMove(e) {
    if (this.isMouseDown) {
        let posX = e.layerX
        let posY = e.layerY
        let color;
        color = setColor(true);
        let circle = new Circle(posX,posY,10,color, ctx);
        figures.push(circle);
        drawFigure();
        //circle.draw();
    }
    
}
function setColor() {
    if (!isGoma) {
        return document.querySelector("#findColor").value;
    }else{
        return "#ffffff";
    }
}
function setGoma() {
        isGoma = true;
}

function setLapiz() {
    isGoma = false;
}

/*
    ctx.fillStyle = "#ffffff";
    ctx.fillRect = (0,0,cWidth,cHeight);
*/

document.querySelector("#goma").addEventListener('click', setGoma,false);
document.querySelector("#lapiz").addEventListener('click', setLapiz,false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove',onMouseMove, false);