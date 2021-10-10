class Slot{
    constructor(posX, posY){
        this.estado = null
        this.posX = posX
        this.posY = posY
    }

    getEstado(){
        return this.estado;
    }
    setEstado(pName){
        this.estado = pName;
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