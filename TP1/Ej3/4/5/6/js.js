window.onload = function main(){
    createImage();
}

function createImage(){
    drawRect();
    drawRectGradiant();
    drawRectGradiantColors();
    drawRect6();
    drawImagen();
}

function drawRect(){
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    let x =0;
    let y =0;

    let imageData = ctx.createImageData(width,height);
    let r = 0;
    let g =0;
    let b = 0;
    let a = 255;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            setPixel(imageData,x,y, r, g, b, a);
        
        }
        
    }
    ctx.putImageData(imageData,x,y)*4;
}

function drawRectGradiant(){
    let canvas = document.querySelector('#canvas1');
    let ctx = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    let x =0;
    let y =0;

    let imageData = ctx.createImageData(width,height);

    let gradient = 255/height;
    let a = 255;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let color = gradient * y;
            setPixel(imageData,x,y, color,color,color, a);
        
        }
        
    }
    ctx.putImageData(imageData,x,y)*4;
}

function drawRectGradiantColors(){
    let canvas = document.querySelector('#canvas2');
    let ctx = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    let x =0;
    let y =0;

    let imageData = ctx.createImageData(width,height);

    let gradient = 255/height;
    let g =0;
    let b = 0;
    let r = 255;
    let a = 255;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (height/2>y) { 
                let color = (gradient * y)*2;
                setPixel(imageData,x,y, r, color ,b, a);
            }else{
                let color = (255-y)*2;

                setPixel(imageData,x,y, r, color, b, a);
            }
            
        }
        
    }
    ctx.putImageData(imageData,x,y)*4;
}

function drawRect6(){
    let canvas = document.querySelector('#canvas3');
    let ctx = canvas.getContext('2d');

    let width = canvas.width;
    let height = canvas.height;

    let x =0;
    let y =0;

    let imageData = ctx.createImageData(width,height);
    let gradient = 255/height;

    let r = 255;
    let g = 0;
    let b = 0;
    let a = 255;
    for (let x = 0; x < width; x++) {

        if (width/3>x) {
            g = (gradient * x)*3;
        }else if (width/1.5>x) {
            g = g/0.25
        } else {
            b = (gradient * x)*2;
        }
        r = r/0.25
        b = b /0.25
        for (let y = 0; y < height; y++) {
            setPixel(imageData,x,y, r,g,b, a);
        
        }
    }
    ctx.putImageData(imageData,x,y)*4;
}
function drawImagen() {
    let canvas = document.querySelector('#canvas4');
    let ctx = canvas.getContext('2d');

    let img = document.querySelector("#panda");

    ctx.drawImage(img, 10, 10);
}
function drawImagenEscalaGris() {
    let canvas = document.querySelector('#canvas5');
    let ctx = canvas.getContext('2d');

    let img = document.querySelector("#panda");

    ctx.drawImage(img, 10, 10);
}


function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;

    
}