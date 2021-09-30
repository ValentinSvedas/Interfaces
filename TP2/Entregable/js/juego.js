class Juego {

    constructor (context){
        this.context = context;
        this.board = null;

    }

    async inicioJuego(){
        this.clearCanvas();
        this.board = new Board(this.context);

        await this.board.initBoard(this.context);
}
  clearCanvas() {
   this.context.rect(0, 0, canvas.width, canvas.height);
    this.context.fillStyle = "white";
    this.context.fill();
}
}


