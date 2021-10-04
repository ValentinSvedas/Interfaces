class Player{
    constructor(color,nombre){
        this.color = color
        this.nombre = nombre

        this.fichas = Array()
    }

    getColor(){
        return this.color;
    }
    getNombre(){
        return this.nombre;
    }
  
    newFichasArray(context){

        for (let i = 0; i < NumeroFichas; i++) {
            let newFicha = new Ficha(this.color,context);
            this.fichas[i] = newFicha;
        }

        return this.fichas;
    }
}