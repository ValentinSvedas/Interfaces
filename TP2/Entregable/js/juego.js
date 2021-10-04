class Juego {

    constructor (context){
        this.context = context;
        this.board = null;
        this.P1 = null;
        this.P2 = null;
        this.fichasJ1;
        this.fichasJ2;

    }

    async inicioJuego(){
        this.clearCanvas();
        this.board = new Board(this.context);
        this.P1 = new Player("#FF0000","Rojo"); //Poner color en una variable global
        this.P2 = new Player("#00FF00","Verde");
        try {
            this.fichasJ1 = this.newFichasArray(this.P1);
            this.fichasJ2 = this.newFichasArray(this.P2);//Array
             await this.board.initBoard(this.context);
            this.board.draw();
            this.setFichasInBoard(this.fichasJ1,this.fichasJ2);
        } catch (error) {
            console.log(error);
        }
        
}
drawBoard(){
    this.board.draw();
}

/**
 * Crea array con fichas
 * @param {*} player 
 * @returns Array()
 */
newFichasArray(player){
    let array = new Array();

    for (let i = 0; i <  NumeroFichas; i++) {
        let newFicha = new Ficha(player.getColor(),this.context);
        array[i] = newFicha;
    }

    return array;
}

/**
 * Pone las fichas en el tablero
 * @param {*} f1 
 * @param {*} f2 
 */
setFichasInBoard(f1,f2){
    
    let point1 ={x: ((canvas.width - Board_W) / 2 - 115),
                y: canvas.height / 2 + 100 };
    let point2 ={x: ((canvas.width - Board_W) / 2 + 470),
                y: canvas.height / 2 + 100 };
    f1.forEach(f => { f.setPosition(point1); });
    f2.forEach(f => { f.setPosition(point2); });

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


