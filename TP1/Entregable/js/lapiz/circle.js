class Circle extends Figure{
    constructor(posX,posY,radius,fill,context){
        super(posX,posY,fill,context);

       this.radius = radius;
    
    }

    draw(){
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
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