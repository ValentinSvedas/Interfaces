class Slot{
    constructor(posX, posY){
        this.estado = null
        this.posX = posX
        this.posY = posY
    }

    getEstado(){
        return this.estado;
    }
<<<<<<< HEAD
    setEstado(pName){
        this.estado = pName;
=======
    setEstado(player){
        this.estado = player;
>>>>>>> 3ded81a42ccb62e7a8405341a2d093564f35fcae
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