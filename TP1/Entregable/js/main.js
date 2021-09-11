"use strict";

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let cHeight = canvas.height;
let cWidth= canvas.width;

let isMouseDown = false;
let isGoma = false;

let figures=[];
let allCircles = [];

function drawFigure() {//recorre todos los circulos que se van creando y crea la linea entre circulo y circulo.
   
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
function setColor() {//Trae el valor del color en el html si no esta acitvada la goma
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

function setImage(e) { //Setea la imagen en el canvas
   
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        let img = document.createElement('img');
        img.src = reader.result;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight);
            drawAllCircles(); //re dibuja todos los circulos y lineas ya creados
        }
    }
}

function drawAllCircles() { //Dibuja todos los circulos de vuelta, con sus lineas
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
function isInside(circle) {
    allCircles.forEach(elem => {
        for (let i = 0; i < elem.length; i++) {
            const circuloElem = elem[i];
            if (circuloElem.isInside(circle.getPosX,circle.getPosY) && isWithe(circuloElem)) {
            }
        }
    });
}
*/

function blur() {
    let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
    let red,green,blue;
    for ( let x = 0; x < imageData.width; x++){
        for (let y = 0; y < imageData.height; y++){
            if (!(x+1==canvas.width || y+1==canvas.height || x<1 || y<1)) {         
                red = avgRed(imageData, x, y)/9;
                green = avgGreen(imageData, x, y)/9;
                blue = avgBlue(imageData, x, y)/9;
                setPixel(imageData,x,y,red,green,blue,255);   
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function avgRed(imageData,x,y) {
    let prom=0;
    prom += getRed(imageData,x,y);
    prom += getRed(imageData,x-1,y);
    prom += getRed(imageData,x+1,y);
    prom += getRed(imageData,x+1,y+1);
    prom += getRed(imageData,x-1,y-1);
    prom += getRed(imageData,x,y+1);
    prom += getRed(imageData,x,y-1);
    prom += getRed(imageData,x+1,y-1);
    prom += getRed(imageData,x-1,y+1);

    return prom;
}
function avgGreen(imageData,x,y) {
    let prom=0;
    prom += getGreen(imageData,x,y);
    prom += getGreen(imageData,x-1,y);
    prom += getGreen(imageData,x+1,y);
    prom += getGreen(imageData,x+1,y+1);
    prom += getGreen(imageData,x-1,y-1);
    prom += getGreen(imageData,x,y+1);
    prom += getGreen(imageData,x,y-1);
    prom += getGreen(imageData,x+1,y-1);
    prom += getGreen(imageData,x-1,y+1);

    return prom;
}
function avgBlue(imageData,x,y) {
    let prom=0;;
    prom += getBlue(imageData,x,y);
    prom += getBlue(imageData,x-1,y);
    prom += getBlue(imageData,x+1,y);
    prom += getBlue(imageData,x+1,y+1);
    prom += getBlue(imageData,x-1,y-1);
    prom += getBlue(imageData,x,y+1);
    prom += getBlue(imageData,x,y-1);
    prom += getBlue(imageData,x+1,y-1);
    prom += getBlue(imageData,x-1,y+1);

    return prom;
}


    
function filtrodegris() {
         let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
         let red,green,blue,gris;
         for ( let x = 0; x < imageData.width; x++){
             for (let y = 0; y < imageData.height; y++){
                red = getRed(imageData, x, y);
                green = getGreen(imageData, x, y);
                blue = getBlue(imageData, x, y);
                
                 gris = (red * 0.33 + green * 0.5 + 0.15 * blue);
                 setPixel(imageData,x,y,gris,gris,gris,255);
             }
         }
         ctx.putImageData(imageData, 0, 0);
}
     

    function setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
    
    function getRed(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }
    
    function getGreen(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }
    
    function getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }
    
    function limpiarCanvas(){
        canvas.width = cWidth;
        canvas.height = cHeight;
        let imageData=ctx.createImageData(cWidth,cHeight);
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                let r = 255;
                let g = 255;
                let b = 255;
               setPixel(imageData,x,y,r,g,b,255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
     


document.querySelector("#blur").addEventListener("click",blur);
document.querySelector("#limpiar").addEventListener("click",limpiarCanvas);
document.querySelector("#filtroGris").addEventListener("click",filtrodegris);
document.querySelector("#file").addEventListener('change',setImage,false);
document.querySelector("#goma").addEventListener('click', setGoma,false);
document.querySelector("#lapiz").addEventListener('click', setLapiz,false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('click',onClick, false);
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove',onMouseMove, false);