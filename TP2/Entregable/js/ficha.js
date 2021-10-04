class Ficha {
    
    constructor (color,context){
        
        this.ficha = new Circle(512,50,25,color,context);
        this.inBoard = false;

    }
    getColor() {
        return this.color;
    }

    draw(){
        this.ficha.draw();
    }

    setPosition(point){
        this.ficha.setPosition(point);
        this.draw();
    }

}