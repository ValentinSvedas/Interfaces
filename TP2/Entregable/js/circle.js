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

    getRadius(){
        return this.radius;
    }

    isInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y)< this.radius;
    }

}