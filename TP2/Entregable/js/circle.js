class Circle extends Figure{
    constructor(posX,posY,radius,fill,context){
        super(posX,posY,fill,context);

       this.radius = radius;
    
    }

    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radius,0,2*Math.PI);
        this.context.fill();
        this.context.closePath();
        if ( this.fill instanceof Image ){ // Si es una imagen
            this.context.drawImage(
                this.fill,
                this.posX - this.radius,
                this.posY - this.radius,
                this.radius * 2,
                this.radius * 2);
        }
    }
    isInside(point){
        let distance =  (point.x - this.posX) * (point.x - this.posX) +
        (point.y - this.posY) * (point.y - this.posY);
        if (distance < (this.radius) * (this.radius)) {
            return true;
        }
        return false;
    }

    getRadius(){
        return this.radius;
    }
    
    drawDisabled(){
        this.draw();
        let currentFill = this.getFill();
        this.draw();
        this.setFill(currentFill);
    }

}