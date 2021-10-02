class Juego {

    constructor (context){
        this.context = context;
        this.board = null;

    }

    async inicioJuego(){
        this.clearCanvas();
        this.board = new Board(this.context);
        try {
            await this.board.initBoard(this.context);
            this.board.draw();
        } catch (error) {
            console.log(error);
        }
        
}
drawBoard(){
    this.board.draw();
}

/**
 * Encuentra la posicion de todos los lugares del Tablero
 * @returns Array()
 */
static newJuego(){ 
    let nJuego = new Array();

    for (let i = 1; i <= BoardColumns; i++){ //Agarra la posicion de las columnas
        let column = new Array();
        let posX = ( (canvas.width - Board_W) / 2 ) + ( ((2 * i) - 1) * ((Board_W / BoardColumns) / 2) );

        for (let j = 1; j <= BoardRows; j++){//Agarra la posicion de las filas
           
            let posY = ( (canvas.height - Board_H) / 2 ) + ( ((2 * j) - 1) * ((Board_H / BoardRows) / 2) );

            let newSlot = new Slot(null,posX,posY); //Crea los espacios
            column.push(newSlot);
        }
        nJuego.push(column);
    }
    
    return nJuego;
}

//Puede ir en otro archivo
  clearCanvas() {
   this.context.rect(0, 0, canvas.width, canvas.height);
    this.context.fillStyle = "#ffffff";
    this.context.fill();
}
}


