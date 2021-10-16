class Juego {

    constructor (context){
        this.context = context;
        this.board = null;
        this.P1 = null;
        this.P2 = null;
        this.turno = null;
        this.fichaSelect=null;
        this.actions = null;
        this.img1 = null;
        this.img2 = null;
        this.colorP1=null;
        this.colorP2=null;
        this.ganador=null;
    }

    async inicioJuego(){
        this.clearCanvas();
        this.board = new Board(this.context);
        this.colorP1 = document.querySelector('#colorP1').value
        this.colorP2 = document.querySelector('#colorP2').value
        this.img1 = this.selectColorCoin(this.colorP1)
        this.img2 = this.selectColorCoin(this.colorP2)
        try {
            this.P1 = new Player(await Board.loadImage(this.img1),"Jugador 1",this.colorP1); //Poner color en una variable global
            this.turno = this.P1;
            this.P2 = new Player(await Board.loadImage(this.img2),"Jugador 2",this.colorP2); //Poner color en una variable global
            this.P1.setFichas(this.newFichasArray(this.P1));//Setea las fichas de cada jugador
            this.P2.setFichas(this.newFichasArray(this.P2));
            await this.board.initBoard(this.context);
            this.board.draw();
            Juego.text();
            Juego.textTurn(this.P1);
            this.setFichasInBoard(this.P1.getFichas(),this.P2.getFichas());//Pone las fichas en el tablero
            this.drawFichas();
            this.ganador = null;
        } catch (error) {
            console.log(error);
        }
        this.actions = new Action(this.P1,this.P2);
        buttonReinicio.addEventListener("click", Juego.iniciarNuevoJuego)
        canvas.addEventListener("mousedown", this.actions.onMouseDown);
}

static iniciarNuevoJuego(){
    juego.inicioJuego();
}

selectColorCoin(id) {
    if (id == "purple") {
        return 'images/purple-circle.png';
    }else if (id == "pink") {
        return 'images/pink-circle.png';
    }else if (id =='red') {
      return 'images/Red_circle.png';
    }else if (id == 'yellow') {
        return 'images/yellow_circle.png';
    }else if (id == 'brown') {
        return 'images/brown-circle.png';
    }else if (id == 'cyan') {
        return 'images/cyan-circle.png';
    }else if (id == 'blue') {
        return 'images/blue-circle.png';
    }
  }
  getGanador(){
    return this.ganador
}
setGanador(p){
    this.ganador = p;
}
drawBoard(){
    this.board.draw();
}
getBoard(){
    return this.board;
}
getP1(){
    return this.P1;
}
getP2(){
    return this.P2;
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
 * Setea el turno del jugador
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
 
static text(){
 
    ctx.font = "35px monospace";
    ctx.textAlign = "center";
    ctx.strokeText("Cuatro en linea", (canvas.width) / 2,580); 
    ctx.font = "30px Arial";
    ctx.fillStyle =juego.colorP2;
    ctx.fillText("Fichas J2", (canvas.width - Board_W) / 2 - 120,150);
    ctx.fillStyle = juego.colorP1;
    ctx.fillText("Fichas J1", (canvas.width - Board_W) / 2 - 120,350);
    ctx.fillStyle = "black";
    ctx.fillText("Turno jugador:", (canvas.width) /1.12 ,250);  
}
static textTurn(P){
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = P.getColor();
    ctx.fillText("Turno "+ P.getNombre(), (canvas.width) /1.12 ,300);
}

 ganadorText(P){
    ctx.font = "30px bold italic";
    ctx.textAlign = "center";
    ctx.fillStyle = 'black';
    ctx.fillText( P.getNombre(), (canvas.width) /1.12 ,100);
    ctx.fillStyle = 'black';
    ctx.fillText("Ganador: ", (canvas.width) /1.12 ,50);
}
 empate(){
    this.turno = null;
    ctx.font = "30px bold italic";
    ctx.textAlign = "center";
    ctx.fillStyle = "Grey";
    ctx.fillText("Empate ", (canvas.width) /1.12 ,100);

}

}


