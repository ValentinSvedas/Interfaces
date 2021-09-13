class negativo extends Filtro{
    constructor (ctx,canvas){
        super(ctx,canvas);

    }
    filtroNegativo(){ 
        //funcion la cual  invierte los valores para R,G,B con un click y si se cliquea de nuevo se vuelve la 
        //imagen a su estado original.

        let imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
    
        for ( let x = 0; x < imageData.width; x++){
            for (let y = 0; y < imageData.height; y++){
                let index = ( x + y * imageData.width) * 4;
                let r = 255 - imageData.data[index];    //sentencia que invierte los valores en R.
                let g = 255 - imageData.data[index+1];  //sentencia que invierte los valores en G.
               let b = 255 - imageData.data[index+2];   //sentencia que invierte los valores en B.
               this.setPixel(imageData,x,y,r,g,b,255);
            }
        } 
        ctx.putImageData(imageData, 0, 0);
    }
}