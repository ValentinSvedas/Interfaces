class Blur extends Filtro{
    constructor (ctx,canvas){
        super(ctx,canvas);

    }
     blur() {
        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
        let red,green,blue;
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                if (!(x+1==canvas.width || y+1==canvas.height || x<1 || y<1)) {//Comprueba que no tome valores más allá de la imagen     
                    red = this.avgRed(imageData, x, y)/9;//Toma el valor y lo divide por 9 que son los pixeles que toman para el promedio
                    green = this.avgGreen(imageData, x, y)/9;
                    blue = this.avgBlue(imageData, x, y)/9;
                    this.setPixel(imageData,x,y,red,green,blue,255);   
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
  avgRed(imageData,x,y) {//Agarra los valores de todos los pixeles alrededor del pixel x,y y los suma
        let prom=0;
        prom +=  this.getRed(imageData,x,y);
        prom +=  this.getRed(imageData,x-1,y);
        prom +=  this.getRed(imageData,x+1,y);
        prom +=  this.getRed(imageData,x+1,y+1);
        prom +=  this.getRed(imageData,x-1,y-1);
        prom +=  this.getRed(imageData,x,y+1);
        prom +=  this.getRed(imageData,x,y-1);
        prom +=  this.getRed(imageData,x+1,y-1);
        prom +=  this.getRed(imageData,x-1,y+1);
        return prom;
    }
   avgGreen(imageData,x,y) {
        let prom=0;
        prom +=  this.getGreen(imageData,x,y);
        prom +=  this.getGreen(imageData,x-1,y);
        prom +=  this.getGreen(imageData,x+1,y);
        prom +=  this.getGreen(imageData,x+1,y+1);
        prom +=  this.getGreen(imageData,x-1,y-1);
        prom +=  this.getGreen(imageData,x,y+1);
        prom +=  this.getGreen(imageData,x,y-1);
        prom +=  this.getGreen(imageData,x+1,y-1);
        prom +=  this.getGreen(imageData,x-1,y+1);
        return prom;
    }
    avgBlue(imageData,x,y) {
        let prom=0;;
        prom +=  this.getBlue(imageData,x,y);
        prom +=  this.getBlue(imageData,x-1,y);
        prom +=  this.getBlue(imageData,x+1,y);
        prom +=  this.getBlue(imageData,x+1,y+1);
        prom +=  this.getBlue(imageData,x-1,y-1);
        prom +=  this.getBlue(imageData,x,y+1);
        prom +=  this.getBlue(imageData,x,y-1);
        prom +=  this.getBlue(imageData,x+1,y-1);
        prom +=  this.getBlue(imageData,x-1,y+1);
        return prom;
    }
}