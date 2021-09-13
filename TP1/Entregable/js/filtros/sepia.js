class sepia extends Filtro{
    constructor (ctx,canvas){
        super(ctx,canvas);

    }
    filtroSepia() {
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
    
                this.setPixel(imageData,x,y,r,g,b,255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
}