class gris extends Filtro{
    constructor (ctx,canvas){
        super(ctx,canvas);

    }
    filtrodegris() { //coloca el filtro de grises a el canvas.
        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
        let red,green,blue,gris;
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
               red =  this.getRed(imageData, x, y);
               green =  this.getGreen(imageData, x, y);
               blue =  this.getBlue(imageData, x, y);
               
                gris = (red * 0.33 + green * 0.5 + 0.15 * blue); //hago el calculo de grises mediante el resultado de RGB
                this.setPixel(imageData,x,y,gris,gris,gris,255);//Reemplazo el rgb por el resultado 
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
}