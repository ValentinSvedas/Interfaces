class Figure{
    constructor(posX,posY, fill,ctx){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;

    }

    setFill(fill){
        this.fill =fill;
    }

    setPosition(x,y){
        this.posX = x;
        this.posY= y;
    }

    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getFill(){
        return this.fill;
    }
    
    draw(){
       this.ctx.fillStyle = this.fill;
    }

    

}