class Juego {

    constructor (context){
        this.context = context;
        this.board = null;
        this.P1 = null;
        this.P2 = null;
        this.turno = null;
        this.fichaSelect=null;
        this.actions = null;
    }

    async inicioJuego(){
        this.clearCanvas();
        this.board = new Board(this.context);
        try {
            this.P1 = new Player(await Board.loadImage(imgP1),"J1",this.context); //Poner color en una variable global
            this.P2 = new Player(await Board.loadImage(imgP2),"J2",this.context); //Poner color en una variable global
            this.turno = this.P1;
            this.P1.setFichas(this.newFichasArray(this.P1));//Setea las fichas de cada jugador
            this.P2.setFichas(this.newFichasArray(this.P2));
            await this.board.initBoard(this.context);
            this.board.draw();
            this.setFichasInBoard(this.P1.getFichas(),this.P2.getFichas());//Pone las fichas en el tablero
            this.drawFichas();
        } catch (error) {
            console.log(error);
        }
        this.actions = new Action(this.P1,this.P2);
        canvas.addEventListener("mousedown", this.actions.onMouseDown);
}

drawBoard(){
    this.board.draw();
}
getBoard(){
    return this.board;
}
/**
 * Dibuja todas las fichas
 */
drawFichas(){
    this.P1.getFichas().forEach(f =>{
        if (f == this.fichaSelect) {
            f.drawDisabled();
        }else{
            f.draw();
        }
    });
    this.P2.getFichas().forEach(f =>{
        if (f == this.fichaSelect) {
            f.drawDisabled();
        }else{
            f.draw();
        }
    })
}
/**
 * Setea el turno del juegador
 * @param {*} turno 
 */
setTurno(turno){
    this.turno = turno;
}
getFichaSelect(){
    return this.fichaSelect;
}
setFichaSelect(ficha){
    if (this.fichaSelect){
        this.fichaSelect.draw();
    }
    this.fichaSelect = ficha;
}
getTurno(){
    return this.turno;
}
nextTurno(){
    if (this.turno === this.P1){
        this.setTurno(this.P2);
    } else {
        this.setTurno(this.P1);
    }
}


/**
 * Crea array con fichas
 * @param {*} player 
 * @returns Array()
 */
newFichasArray(player){
    let array = new Array();

    for (let i = 0; i <  NumeroFichas; i++) {
        let newFicha = new Ficha(player.getImageColor(),this.context);
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
    let point2 ={x: ((canvas.width - Board_W) / 2 - 115),
                y: canvas.height / 2 - 100 };
                
    f2.forEach(f => { f.setPosition(point2); });
    f1.forEach(f => { f.setPosition(point1); });


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
            let newSlot = new Slot(posX,posY); //Crea los espacios
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


