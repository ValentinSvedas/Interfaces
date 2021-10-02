class Ficha {
    
    constructor (color,fichaImage,context){
        
        this.ficha = new Circle(512,50,25,fichaImage,context);
        
        this.color = color;
        this.inBoard = false;

    }
    getColor() {
        return this.color;
    }

    draw(){
        this.figure.draw();
    }
    isPointInside(point){
        return this.figure.isPointInside(point);
    }

    setPosition(point){
        this.figure.setPosition(point);
    }
}