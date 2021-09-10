"use strict";

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let cHeight = canvas.height;
let cWidth= canvas.width;

let isMouseDown = false;
let isGoma = false;

let figures=[];
let allCircles = [];

function drawFigure() {
   
    for (let i = 0; i < figures.length; i++) {
        let elem = figures[i];
        if (i>0) {
            let lastCircle = figures[i-1];
            ctx.beginPath();
            ctx.moveTo(lastCircle.getPosX(),lastCircle.getPosY());
            ctx.lineTo(elem.getPosX(),elem.getPosY());
            ctx.lineWidth = elem.getRadius()*2;
            ctx.stroke();
            ctx.strokeStyle = setColor();
            ctx.closePath();
            
        }
        elem.draw();
    }


}

function onClick(e) {
    let posX = e.layerX
    let posY = e.layerY
    let color
    color = setColor();
   
    let circle = new Circle(posX,posY,10,color, ctx);
    if (figures.length > 0) {    
        figures.push(circle);
        
    }
    drawFigure();
}

function onMouseUp() {
    this.isMouseDown = false;
    allCircles.push(figures);
    figures =[];
}
function onMouseDown(e) {
    this.isMouseDown = true;
    let posX = e.layerX
    let posY = e.layerY
    let color
    color = setColor();
   

    let circle = new Circle(posX,posY,10,color, ctx);
    drawFigure();
    figures.push(circle);
}
function onMouseMove(e) {
    if (this.isMouseDown) {
        let posX = e.layerX
        let posY = e.layerY
        let color;
        color = setColor();
        let circle = new Circle(posX,posY,10,color, ctx);
        figures.push(circle);
        circle.draw();
        drawFigure();
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

function setImage(e) {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        let img = document.createElement('img');
        img.src = reader.result;
      
        img.onload = () => {
            ctx.drawImage(img,0,0,cWidth,cHeight);
            drawAllCircles();
        }
    }
}

function drawAllCircles() {
    for (let i = 0; i < allCircles.length; i++) {
        console.log(allCircles);
        for (let j = 0; j < allCircles[i].length; j++) {
            let elem = allCircles[i][j];
            if (j>0) {  
                let lastCircle = allCircles[i][j-1];
                let colorUltimoCirculo = lastCircle.getFill();
                if (!isWithe(colorUltimoCirculo)) {
                ctx.beginPath();
                ctx.moveTo(lastCircle.getPosX(),lastCircle.getPosY());
                ctx.lineTo(elem.getPosX(),elem.getPosY());
                ctx.lineWidth = elem.getRadius()*2;
                ctx.stroke();
                ctx.strokeStyle = colorUltimoCirculo;
                ctx.closePath(); 
                elem.draw(); 
                }     
            }else{
                if (isWithe(elem.getFill)) {
                    elem.draw();
                }
            }
        }  
    }
}

function isWithe(color) {
    if (color == "#ffffff") {
        return true;
    }else{
        return false;
    }
}
/*
function isInside(circle) {// recorreer allCirculos y sacar 
    allCircles.forEach(elem => {
        for (let i = 0; i < elem.length; i++) {
            const circuloElem = elem[i];
            if (circuloElem.isInside(circle.getPosX,circle.getPosY) && isWithe(circuloElem)) {
            }
        }
    });
}
*/
/*
    ctx.fillStyle = "#ffffff";
    ctx.fillRect = (0,0,cWidth,cHeight);
*/

document.querySelector("#file").addEventListener('change',setImage,false);
document.querySelector("#goma").addEventListener('click', setGoma,false);
document.querySelector("#lapiz").addEventListener('click', setLapiz,false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('click',onClick, false);
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove',onMouseMove, false);