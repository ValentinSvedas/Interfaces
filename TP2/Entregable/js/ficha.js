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

    setPosition(point){
        this.ficha.setPosition(point);
        this.draw();
    }

}