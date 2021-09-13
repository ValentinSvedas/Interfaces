class clearCanvas extends Filtro{
    constructor (ctx,canvas){
        super(ctx,canvas);

    }
     clear(){ //vacia el cambas de elementos.
        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                let r = 255;
                let g = 255;
                let b = 255;
               this.setPixel(imageData,x,y,r,g,b,255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
        }
}