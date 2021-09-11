/*"use strict";
class Filtros{
    constructor(cwidth,cheight,ctx,canvas){
        this.width = cwidth;
        this.height = cheight;
        this.ctx = ctx;
        this.canvas = canvas
    }

    blur(ctx,canvas) {
        
    }

    brillo(ctx){
        let width = canvas.width;
        let height = canvas.height;
    
        let x =0;
        let y =0;
        let imageData = ctx.createImageData(width,height);

        let r = 0;
        let g = 0;
        let b = 0;
        let a=255;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = getRed(imageData,x,y);
                g = getRed(imageData,x,y);
                b = getRed(imageData,x,y);
                
                imageData = (r+g+b)/3 
            
            }
        }
        ctx.putImageData(imageData,x,y)*4;
    }

    
}

function getRed(imageData,x,y) {
    index = (x+y*imageData)*4;
    return imageData.data[index+0]
}
function getGreen(imageData,x,y) {
    index = (x+y*imageData)*4;
    return imageData.data[index+1]
}
function getBlue(imageData,x,y) {
    index = (x+y*imageData)*4;
    return imageData.data[index+2]
}

function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}
*/