"use strict";

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let tam = document.querySelector("#range").value/2;

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
            ctx.lineWidth = tam*2;
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
   
    let circle = new Circle(posX,posY,tam,color, ctx);
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
   

    let circle = new Circle(posX,posY,tam,color, ctx);
    drawFigure();
    figures.push(circle);
}
function onMouseMove(e) {
    if (this.isMouseDown) {
        let posX = e.layerX
        let posY = e.layerY
        let color;
        color = setColor();
        let circle = new Circle(posX,posY,tam,color, ctx);
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

    function limpiarCanvas(){ //vacia el cambas de elementos.
    let limpiarC = new clearCanvas(ctx,canvas);
    limpiarC.clear();
    allCircles=[];//Vacia todos los circulos para el no se creen lineas al cargar una nueva imagen
    }

    function descargar(){// se descarga la imagen en formato .png.
        let download=document.getElementById("descarga");
        let image=canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    }

    function deteccionBordes() {
        let filtroDeteccionBordes = new edgeDetection(ctx,canvas);
        filtroDeteccionBordes.deteccionBordes();
    }
        
    function filtrodegris() { 
        let filtroGris = new gris(ctx,canvas);
            filtroGris.filtrodegris();
    }

    function filtroNegativo(){ 
        let filtroNegativo = new negativo(ctx,canvas);
        filtroNegativo.filtroNegativo();
    }

    function filtroSepia() {
        let filtroSepia = new sepia(ctx,canvas);
        filtroSepia.filtroSepia();
    }

    function blur() {
        let FiltroBlur = new Blur(ctx,canvas);
        FiltroBlur.blur();
    }

    function filtroBinarizacion() {
        let filtroBinarizacion = new binarizacion(ctx,canvas);
        filtroBinarizacion.filtroBinarizacion();
    }
    function grosor() {
        tam = document.querySelector("#range").value/2;
        if (tam == 0) {
            tam = 1;
        }
    }



document.querySelector("#range").addEventListener("change",grosor);
document.querySelector("#limpiar").addEventListener("click",limpiarCanvas);
document.querySelector("#descargar").addEventListener("click",descargar);
document.querySelector("#binarizacion").addEventListener("click",filtroBinarizacion);
document.querySelector("#deteccionBordes").addEventListener("click",deteccionBordes);
document.querySelector("#blur").addEventListener("click",blur);
document.querySelector("#filtroSepia").addEventListener("click",filtroSepia);
document.querySelector("#filtroNegativo").addEventListener("click",filtroNegativo);
document.querySelector("#filtroGris").addEventListener("click",filtrodegris);
document.querySelector("#file").addEventListener('change',setImage,false);
document.querySelector("#goma").addEventListener('click', setGoma,false);
document.querySelector("#lapiz").addEventListener('click', setLapiz,false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('click',onClick, false);
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove',onMouseMove, false);