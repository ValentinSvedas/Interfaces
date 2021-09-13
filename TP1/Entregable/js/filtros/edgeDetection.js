class edgeDetection extends Filtro{
    constructor (cwidth,cheight,ctx,canvas){
        super(cwidth,cheight,ctx,canvas);

    }
   deteccionBordes() {
        filtroBinarizacion(); //transformo a binarizacion la imagen para que el sobel sea más exacto
         let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
         let imageDataCopy=ctx.getImageData(0, 0, canvas.width, canvas.height);//creo la imagen copia del canvas para que no se pise con la original
         let r,g,b;
             for ( let x = 0; x < imageData.width; x++){
                 for (let y = 0; y < imageData.height; y++){
                     //detecto los bordes en RGB
                         r = this.edge(this.detectarBordeR(imageData,x,y));
                         g = this.edge(this.detectarBordeG(imageData,x,y));
                         b = this.edge(this.detectarBordeB(imageData,x,y));
                       
                         this.setPixel(imageDataCopy,x,y,r,g,b,255);    
                 }
             } 
             ctx.putImageData(imageDataCopy, 0, 0);
     }
    edge(color) {//Compruebo si encuentro un cambio de color y si lo encuentro, lo pone en negro
         let aux=255;
         if (color>0) {
             aux=0
         }
         return aux
     }
     detectarBordeR(imageData, x, y) {// Detecto los bordes de R mediante el operador kernel 3x3 tanto en X como en Y
             let sobel1 =  this.getRed(imageData,x-1,y+1)*(-1);
             let sobel2 =  this.getRed(imageData,x-1,y)*(-2);
             let sobel3 =  this.getRed(imageData,x-1,y-1)*(-1);
             let sobel4 =  this.getRed(imageData,x+1,y+1)*(1);
             let sobel5 =  this.getRed(imageData,x+1,y)*(2);
             let sobel6 =  this.getRed(imageData,x+1,y-1)*(1);
             let sobel7 =  this.getRed(imageData,x,y-1)*(2);
             let sobel8 =  this.getRed(imageData,x,y+1)*(-2);
             let gx =(sobel4,sobel5,sobel6)-(sobel1+sobel2+sobel3);
             let gy = (sobel4,sobel7,sobel6)-(sobel1+sobel8+sobel3);
             
             return Math.tan(gy,gx);  
     }
     detectarBordeG(imageData, x, y) {// Detecto los bordes de G mediante el operador kernel 3x3 tanto en X como en Y
             let sobel1 =  this.getGreen(imageData,x-1,y+1)*(-1);
             let sobel2 =  this.getGreen(imageData,x-1,y)*(-2);
             let sobel3 =  this.getGreen(imageData,x-1,y-1)*(-1);
             let sobel4 =  this.getGreen(imageData,x+1,y+1)*(1);
             let sobel5 =  this.getGreen(imageData,x+1,y)*(2);
             let sobel6 =  this.getGreen(imageData,x+1,y-1)*(1);
             let sobel7 =  this.getGreen(imageData,x,y-1)*(2);
             let sobel8 =  this.getGreen(imageData,x,y+1)*(-2);
             let gx =(sobel4,sobel5,sobel6)-(sobel1+sobel2+sobel3);
             let gy = (sobel4,sobel7,sobel6)-(sobel1+sobel8+sobel3);
             return  Math.tan(gy,gx);   //Obtengo el valor para comprobar si es borde o no
     }
     
     detectarBordeB(imageData, x, y) { // Detecto los bordes de B mediante el operador kernel 3x3 tanto en X como en Y
           
             let sobel1 =  this.getBlue(imageData,x-1,y+1)*(-1);
             let sobel2 =  this.getBlue(imageData,x-1,y)*(-2);
             let sobel3 =  this.getBlue(imageData,x-1,y-1)*(-1);
             let sobel4 =  this.getBlue(imageData,x+1,y+1)*(1);
             let sobel5 =  this.getBlue(imageData,x+1,y)*(2);
             let sobel6 =  this.getBlue(imageData,x+1,y-1)*(1);
             let sobel7 =  this.getBlue(imageData,x,y-1)*(2);
             let sobel8 =  this.getBlue(imageData,x,y+1)*(-2);
             let gx =(sobel4,sobel5,sobel6)-(sobel1+sobel2+sobel3);
             let gy = (sobel4,sobel7,sobel6)-(sobel1+sobel8+sobel3);
             return  Math.tan(gy,gx);    
     }
     

}