class Player{
    constructor(imageColor,nombre){
        this.imageColor = imageColor
        this.nombre = nombre
        this.fichas = new Array();
    }

    getImageColor(){
        return this.imageColor;
    }
    getNombre(){
        return this.nombre;
    }
    getFichas(){
        return this.fichas;
    }
  
   setFichas(allFichas){
    this.fichas = allFichas;
   }
}