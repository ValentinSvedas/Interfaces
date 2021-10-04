class Player{
    constructor(imageColor,nombre){
        this.imageColor = imageColor
        this.nombre = nombre

        this.fichas = Array()
    }

    getImageColor(){
        return this.imageColor;
    }
    getNombre(){
        return this.nombre;
    }
  
    newFichasArray(context){

        for (let i = 0; i < NumeroFichas; i++) {
            let newFicha = new Ficha(this.imageColor,context);
            this.fichas[i] = newFicha;
        }

        return this.fichas;
    }
}