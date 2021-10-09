class Slot{
    constructor(estado, posX, posY){
        this.estado = estado
        this.posX = posX
        this.posY = posY
    }

    getEstado(){
        return this.estado;
    }
    setEstado(player){
        this.estado = player;
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getPos(){
        return {x: this.posX, y:this.posY}
    }
}