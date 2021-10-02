const boardColor = `#2e2676 `;

class Board {

    constructor (context){
        this.nJuego = null;
        this.rect = null;
        
        this.areaFicha = null;

        this.context = context;



    }

     async initBoard(){

        this.nJuego = Juego.newJuego();
        try {
            this.areaFicha = await this.newAreaFicha(this.context);
        } catch (error) {
            console.log(error)
        }
        
        this.rect = new Rectangle(
            (canvas.width - Board_W) / 2 - 10,
            (canvas.height - Board_H) / 2 - 10,
            Board_W + 20,
            Board_H + 20,
            boardColor,
            this.context);
    }

   
    draw(){

        for (let i = 0; i < BoardColumns; i++) {
            if ( i == this.selectedDropArea){
                this.areaFicha[i].draw();
            } else {
                this.areaFicha[i].drawDisabled();
            }
        }
        this.rect.draw();
        this.drawBoardDots();
        this.selectedDropArea = null;
    }

    /**
     * Crea los circulos iniciales del tablero
     */
    drawBoardDots() {
        for (let i = 0; i < BoardColumns; i++){
            for (let j = 0; j < BoardRows; j++){
                let circle = new Circle(
                    this.nJuego[i][j].getPosX(),
                    this.nJuego[i][j].getPosY(),
                    25,
                    `#FFFFFF`,
                    this.context
                );
                circle.draw();
            }
        }
    }

    /**
     * Crea los rectangulos añadiendole la imagen de los triangulos
     * @param {*} context 
     * @returns Array()
     */
    async newAreaFicha(context){

        let dropArea = new Array();

        let image = await Board.loadImage('images/triangleArea.png');

        for (let i = 1; i <= BoardColumns; i++){
            
            let dropRectanguloPos = new Rectangle(
                (canvas.width - Board_W) / 2 + (Board_W / BoardColumns) * (i - 1),
                0,
                (Board_W / BoardColumns),
                (canvas.height - Board_H) / 2 ,
                image,
                context
            );
            
            dropArea.push(dropRectanguloPos);

        }

        return dropArea;

    }

    //Pueden ir en otro archivo 

    static loadImage(src){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }

}