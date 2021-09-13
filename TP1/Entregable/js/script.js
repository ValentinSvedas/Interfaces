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

function deteccionBordes() {
   filtroBinarizacion(); //transformo a binarizacion la imagen para que el sobel sea más exacto
    let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
    let imageDataCopy=ctx.getImageData(0, 0, canvas.width, canvas.height);//creo la imagen copia del canvas para que no se pise con la original
    let r,g,b;
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                //detecto los bordes en RGB
                    r = edge(detectarBordeR(imageData,x,y));
                    g = edge(detectarBordeG(imageData,x,y));
                    b = edge(detectarBordeB(imageData,x,y));
                  
                    setPixel(imageDataCopy,x,y,r,g,b,255);
                
                
            }
        } 
        ctx.putImageData(imageDataCopy, 0, 0);
}
function edge(color) {//Compruebo si encuentro un cambio de color y si lo encuentro, lo pone en negro
    let aux=255;
    if (color>0) {
        aux=0
    }
    return aux
}
function detectarBordeR(imageData, x, y) {// Detecto los bordes de R mediante el operador kernel 3x3 tanto en X como en Y
        let sobel1 = getRed(imageData,x-1,y+1)*(-1);
        let sobel2 = getRed(imageData,x-1,y)*(-2);
        let sobel3 = getRed(imageData,x-1,y-1)*(-1);
        let sobel4 = getRed(imageData,x+1,y+1)*(1);
        let sobel5 = getRed(imageData,x+1,y)*(2);
        let sobel6 = getRed(imageData,x+1,y-1)*(1);
        let sobel7 = getRed(imageData,x,y-1)*(2);
        let sobel8 = getRed(imageData,x,y+1)*(-2);
        let gx =(sobel4,sobel5,sobel6)-(sobel1+sobel2+sobel3);
        let gy = (sobel4,sobel7,sobel6)-(sobel1+sobel8+sobel3);
        
        return Math.tan(gy,gx);  
}
function detectarBordeG(imageData, x, y) {// Detecto los bordes de G mediante el operador kernel 3x3 tanto en X como en Y
        let sobel1 = getGreen(imageData,x-1,y+1)*(-1);
        let sobel2 = getGreen(imageData,x-1,y)*(-2);
        let sobel3 = getGreen(imageData,x-1,y-1)*(-1);
        let sobel4 = getGreen(imageData,x+1,y+1)*(1);
        let sobel5 = getGreen(imageData,x+1,y)*(2);
        let sobel6 = getGreen(imageData,x+1,y-1)*(1);
        let sobel7 = getGreen(imageData,x,y-1)*(2);
        let sobel8 = getGreen(imageData,x,y+1)*(-2);
        let gx =(sobel4,sobel5,sobel6)-(sobel1+sobel2+sobel3);
        let gy = (sobel4,sobel7,sobel6)-(sobel1+sobel8+sobel3);
        return  Math.tan(gy,gx);   //Obtengo el valor para comprobar si es borde o no
}

function detectarBordeB(imageData, x, y) { // Detecto los bordes de B mediante el operador kernel 3x3 tanto en X como en Y
      
        let sobel1 = getBlue(imageData,x-1,y+1)*(-1);
        let sobel2 = getBlue(imageData,x-1,y)*(-2);
        let sobel3 = getBlue(imageData,x-1,y-1)*(-1);
        let sobel4 = getBlue(imageData,x+1,y+1)*(1);
        let sobel5 = getBlue(imageData,x+1,y)*(2);
        let sobel6 = getBlue(imageData,x+1,y-1)*(1);
        let sobel7 = getBlue(imageData,x,y-1)*(2);
        let sobel8 = getBlue(imageData,x,y+1)*(-2);
        let gx =(sobel4,sobel5,sobel6)-(sobel1+sobel2+sobel3);
        let gy = (sobel4,sobel7,sobel6)-(sobel1+sobel8+sobel3);
        return  Math.tan(gy,gx);    
}


    
function filtrodegris() { //coloca el filtro de grises a el canvas.
         let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
         let red,green,blue,gris;
         for ( let x = 0; x < imageData.width; x++){
             for (let y = 0; y < imageData.height; y++){
                red = getRed(imageData, x, y);
                green = getGreen(imageData, x, y);
                blue = getBlue(imageData, x, y);
                
                 gris = (red * 0.33 + green * 0.5 + 0.15 * blue); //hago el calculo de grises mediante el resultado de RGB
                 setPixel(imageData,x,y,gris,gris,gris,255);//Reemplazo el rgb por el resultado 
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
 
    
    function limpiarCanvas(){ //vacia el cambas de elementos.
        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                let r = 255;
                let g = 255;
                let b = 255;
               setPixel(imageData,x,y,r,g,b,255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
        allCircles=[];//Vacia todos los circulos para el no se creen lineas al cargar una nueva imagen
    }
     

    function filtroNegativo(){ 
        //funcion la cual  invierte los valores para R,G,B con un click y si se cliquea de nuevo se vuelve la 
        //imagen a su estado original.

        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
    
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                let index = ( x + y * imageData.width) * 4;
                let r = 255 - imageData.data[index];    //sentencia que invierte los valores en R.
                let g = 255 - imageData.data[index+1];  //sentencia que invierte los valores en G.
               let b = 255 - imageData.data[index+2];   //sentencia que invierte los valores en B.
                setPixel(imageData,x,y,r,g,b,255);
            }
        } 
        ctx.putImageData(imageData, 0, 0);
    }

    function filtroSepia() {
        //en esta funcion se inplemeta el filtro sepia, en la cual si se cliquea varias veces en el boton, 
        //el filtro se ira aplicando cada vez mas a la imagen hasta que los valores R,G,B hastas acercarse a 255.

        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
      
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                
                let index = ( x + y * imageData.width) * 4;
                
                let r = imageData.data[index];
                let g = imageData.data[index+1];
                let b = imageData.data[index+2];
    
                let tr = 0.393 * r + 0.769 * g + 0.189 * b;     //se le introducen los valores a R,G,B para volver la tonalidad sepia.
                let tg = 0.349 * r + 0.686 * g + 0.168 * b;
                let tb = 0.272 * r + 0.534 * g + 0.131 * b;

                if (tr > 255) {
                    r = 255;
                } else {
                    r = tr;
                }
    
                if (tg > 255) {
                    g = 255;
                } else {
                    g = tg;
                }
    
                if (tb > 255) {
                    b = 255;
                } else {
                    b = tb;
                }
    
                setPixel(imageData,x,y,r,g,b,255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function blur() {
        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
        let red,green,blue;
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                if (!(x+1==canvas.width || y+1==canvas.height || x<1 || y<1)) {//Comprueba que no tome valores más allá de la imagen     
                    red = avgRed(imageData, x, y)/9;//Toma el valor y lo divide por 9 que son los pixeles que toman para el promedio
                    green = avgGreen(imageData, x, y)/9;
                    blue = avgBlue(imageData, x, y)/9;
                    setPixel(imageData,x,y,red,green,blue,255);   
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
    
    function avgRed(imageData,x,y) {//Agarra los valores de todos los pixeles alrededor del pixel x,y y los suma
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

    function filtroBinarizacion() {
    // esta funcion lo que realiza es tomar los valores provenientes 
    //de las funciones llamadas y en cada caso se setea, dependiendo de lo resivido  para luego mostrarlo.
        let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
   
        for ( let x=0;x<imageData.width; x++){
            for (let y=0;y<imageData.height; y++){
                let AVG=avgRGB(imageData,x,y);
                let r=colorWB(AVG);
                let g=colorWB(AVG);
                let b=colorWB(AVG);
                setPixel(imageData,x,y,r,g,b,255);
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    function avgRGB(imageData,x,y) {
        //funcion la cual nos dara un promedio de los colores y los pasa a la funcion principal.
        let index=(x+y*imageData.width)*4;
        let sum=0;
        sum +=imageData.data[index+0];
        sum +=imageData.data[index+1];
        sum +=imageData.data[index+2];
        return sum/3;
    }
    
    function colorWB(color) {
        //funcion la cual al color dado en la funcion anterior se se lo califica
        // dependiendo si es <255/2 sera RGB=0,0,0 y si no RGB=255,255,255. Luego lo pasa a funcion principal.
        if(color<255/2){
            return 0;
        }
        return 255;
    }
  

    function descargar(){// se descarga la imagen en formato .png.
    let download=document.getElementById("descarga");
    let image=canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
    }




document.querySelector("#binarizacion").addEventListener("click",filtroBinarizacion);
document.querySelector("#deteccionBordes").addEventListener("click",deteccionBordes);
document.querySelector("#blur").addEventListener("click",blur);
document.querySelector("#filtroSepia").addEventListener("click",filtroSepia);
document.querySelector("#filtroNegativo").addEventListener("click",filtroNegativo);
document.querySelector("#limpiar").addEventListener("click",limpiarCanvas);
document.querySelector("#filtroGris").addEventListener("click",filtrodegris);
document.querySelector("#file").addEventListener('change',setImage,false);
document.querySelector("#goma").addEventListener('click', setGoma,false);
document.querySelector("#lapiz").addEventListener('click', setLapiz,false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('click',onClick, false);
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove',onMouseMove, false);