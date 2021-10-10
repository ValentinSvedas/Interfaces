class Action {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.logica = new Logica()
    }

    /**
     * Cuando el usuario hace click en un elemento setea la ficha elegida y agrega los eventos move y up
     * @param {*} e 
     */
    onMouseDown(e) {
        let mousePos = Action.getMousePos(e);
        let turnoPlayer = juego.getTurno();

        let fichas = turnoPlayer.getFichas();
        fichas.forEach(f => {
            if (f.isInside(mousePos) && f.notInBoard()) {
                juego.setFichaSelect(f);
            }
        })
        if (juego.getFichaSelect()) {
            canvas.addEventListener("mousemove", Action.onMouseMove);
            canvas.addEventListener("mouseup", Action.onMouseUp);
        }
    }
    static onMouseUp(e) {
        let fichaSelect = juego.getFichaSelect();

        if (fichaSelect) {
            let mousePos = Action.getMousePos(e);
            let player = juego.getTurno();
            let board = juego.getBoard();
            let posColumn = board.checkColumn(mousePos);
            let setPosFicha = null;
            if (posColumn != null){
                let posRows = board.getFirstSlot(posColumn);
                if ( posRows != null ){
                    setPosFicha = board.insertFichaOnBoard(player,posColumn,posRows);
                    fichaSelect.setPosition(setPosFicha);//posiciona la ficha
                    fichaSelect.setInBoard();//le indica que esta en el tablero
                    if (board.checkCuatroEnLinea()) {
                        console.log("ganador "+ player)
                    }else{
                        juego.nextTurno();
                    }
                }    
            }
        juego.clearCanvas();
        juego.drawBoard();
        juego.drawFichas();
        juego.setFichaSelect(null);

        canvas.removeEventListener("mousemove", Action.handleMouseMove);
        canvas.removeEventListener("mouseup", Action.handleMouseUp);

    }
}

    static onMouseMove(e) {
        let fichaSelect = juego.getFichaSelect();
        if (fichaSelect) {
            let mousePos = Action.getMousePos(e);
            fichaSelect.setPosition(mousePos);
            
            let board = juego.getBoard();
            let posColumn = board.checkColumn(mousePos);
            if (posColumn != null){
                board.setDropSlot(posColumn);
            }

            juego.clearCanvas();
            juego.drawBoard();
            juego.drawFichas();

        }
    }


    //Pueden ir en otro js
    static getMousePos(e) {
        let bp = e.target.getBoundingClientRect();
        return {
            x: e.clientX - bp.left,
            y: e.clientY - bp.top
        };

    }



}
