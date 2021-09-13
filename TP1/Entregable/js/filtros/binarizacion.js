class binarizacion extends Filtro{
    constructor (ctx,canvas){
        super(ctx,canvas);

    }
    filtroBinarizacion() {
    // esta funcion lo que realiza es tomar los valores provenientes 
    //de las funciones llamadas y en cada caso se setea, dependiendo de lo resivido  para luego mostrarlo.
        let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    
        for ( let x=0;x<imageData.width; x++){
            for (let y=0;y<imageData.height; y++){
                let AVG= this.avgRGB(imageData,x,y);
                let r= this.colorWB(AVG);
                let g= this.colorWB(AVG);
                let b= this.colorWB(AVG);
                this.setPixel(imageData,x,y,r,g,b,255);
            }
        }
        ctx.putImageData(imageData,0,0);
    }
    colorWB(color) {
        //funcion la cual al color dado en la funcion anterior se se lo califica
        // dependiendo si es <255/2 sera RGB=0,0,0 y si no RGB=255,255,255. Luego lo pasa a funcion principal.
        if(color<255/2){
            return 0;
        }
        return 255;
    }
     avgRGB(imageData,x,y) {
        //funcion la cual nos dara un promedio de los colores y los pasa a la funcion principal.
        let index=(x+y*imageData.width)*4;
        let sum=0;
        sum +=imageData.data[index+0];
        sum +=imageData.data[index+1];
        sum +=imageData.data[index+2];
        return sum/3;
    }
}