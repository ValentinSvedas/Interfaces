class Player{
    constructor(imageColor,nombre,color){
        this.imageColor = imageColor
        this.nombre = nombre
        this.fichas = new Array();
        this.color = color;
    }

    getColor(){
        return this.color;
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