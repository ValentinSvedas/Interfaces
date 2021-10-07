class Slot{
    constructor(estado, posX, posY){
        this.estado = estado
        this.posX = posX
        this.posY = posY
    }

    getEstado(){
        return this.estado;
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getPos(){
        return {x: this.posX, y:posY}
    }
}