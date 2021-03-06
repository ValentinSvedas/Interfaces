class Ficha {
    
    constructor (imageColor,context){
        this.ficha = new Circle(512,50,25,imageColor,context);

        this.inBoard = false;

    }
    getColor() {
        return this.imageColor;
    }

    draw(){
        this.ficha.draw();
    }
    drawDisabled(){
        this.ficha.drawDisabled();
    }

    setPosition(point){
        this.ficha.setPosition(point);
    }
    setPosX(pY){
        this.ficha.posY =pY;
    }
    setPosY(pX){
        this.ficha.posX =pX;
    }
    getPosX(){
        return this.ficha.getPosX();
    }
    getPosY(){
        return this.ficha.getPosY();
    }
    isInside(point){
        return this.ficha.isInside(point);
    }
    
    setInBoard(){
        this.inBoard = true;
    }
    
    notInBoard(){
        return !this.inBoard;
    }
    


}