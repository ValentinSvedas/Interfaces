const boardColor = `#2e2676 `;

class Board {

    constructor (context){
        this.nJuego = null;
        this.rect = null;
        this.areaFicha = null;
        this.context = context;
        this.cantSlots = BoardColumns * BoardRows;
        this.ultimaFicha = null;
        this.primerFicha = null;
        this.dropSlot=null;
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

     //Logica matriz fichas en tablero
     checkColumn(mousePos) {
        for (let i = 0; i < BoardColumns; i++) {
            if (this.areaFicha[i].isInsideR(mousePos)){ //Recorre los slots para soltar el area a ver si la posicion del mosue se encuentra ahi
                return i;
            }
        }
        return null;
        
    }
    getFirstSlot(column){
<<<<<<< HEAD
        for (let i = BoardRows - 1; i >= 0; i--){ //Empieza desde abajo del todo
=======
        for (let i = BoardRows - 1; i >= 0; i--){
>>>>>>> 3ded81a42ccb62e7a8405341a2d093564f35fcae
            if (this.nJuego[column][i].getEstado() == null){
                return i;
            }
        }
        return null;
<<<<<<< HEAD
    }

    /**
     * Inserta ficha en el tablero
     * @param {*} color 
     * @param {*} posColumn 
     * @param {*} posRow 
     * @returns 
     */
    insertFichaOnBoard(player,posColumn,posRow){
        if (posRow != null) {
            this.nJuego[posColumn][posRow].setEstado(player.getNombre());
            this.ultimaFicha = new Ficha(player.getImageColor(),this.context)
            this.ultimaFicha.setPosY(posColumn)
            this.ultimaFicha.setPosX(posRow)
            this.cantSlots--;
            return this.nJuego[posColumn][posRow].getPos();
        }
    }

=======
    }

    /**
     * Inserta ficha en el tablero
     * @param {*} color 
     * @param {*} posColumn 
     * @param {*} posRow 
     * @returns 
     */
    insertFichaOnBoard(player,posColumn,posRow){
        if (posRow != null) {
            this.nJuego[posColumn][posRow].setEstado(player);
            this.ultimaFicha = this.nJuego[posColumn][posRow];
            this.cantSlots--;
            return this.nJuego[posColumn][posRow].getPos();
        }
    }

>>>>>>> 3ded81a42ccb62e7a8405341a2d093564f35fcae
  
    setDropSlot(column){
        this.dropSlot = column;
    }

    getDropSlot(){
        return this.dropSlot;
    }
    getUltimaFicha(){
        return this.ultimaFicha;
    }

    

    //Pueden ir en otro js 

    static loadImage(src){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }
    checkCuatroEnLinea(){
        let maxInRow = Logica.sumFiachas(this.nJuego,this.arrayRow(this.ultimaFicha.getPosY()));
        let maxInColumn = Logica.sumFiachas(this.nJuego,this.arrayColumn(this.ultimaFicha.getPosX()));
        let maxInDiagA = Logica.sumFiachas(this.nJuego,this.diagonal1(this.ultimaFicha));
        let maxInDiagB = Logica.sumFiachas(this.nJuego,this.diagonal2(this.ultimaFicha));
        
        return maxInRow == 4 || maxInColumn == 4 || maxInDiagA == 4 || maxInDiagB == 4; 
    }
    
    /**
     * Agarra todos los casilleros en fila
     * @param {*} row 
     * @returns 
     */
    arrayRow(row){
        let arr = new Array();
        for (let col = 0; col < BoardColumns; col++){
            arr.push({i: col, j: row})
        }
        return arr;
    }
     /**
     * Agarra todos los casilleros en columna
     * @param {*} row 
     * @returns 
     */
    arrayColumn(col){
        let arr = new Array();
        for (let row = 0; row < BoardRows; row++){
            arr.push({i: col, j: row})
        }
        return arr;
    }
    /**
     * Agarra todos los casilleros en diagonal
     * @param {*} row 
     * @returns 
     */
    diagonal1(fichaActual){
        let arr = new Array();
        let col = fichaActual.getPosY();
        let row = fichaActual.getPosX();
        while ((col > 0) && (row > 0)){
            col--;
            row--;
        }
        while ((col < BoardColumns) && (row < BoardRows)) {
            arr.push({i: col, j: row});
            col++;
            row++;
        }
        return arr;
    
    }
     /**
     * Agarra todos los casilleros en diagonal
     * @param {*} row 
     * @returns 
     */
    diagonal2(fichaActual){
        let arr = new Array();
        let col = fichaActual.getPosY();
        let row = fichaActual.getPosX();
        while ((col + 1 < BoardColumns) && (row > 0)){
            col++;
            row--;
        }
        while ((col >= 0) && (row < BoardRows)) {
            arr.push({i: col, j: row});
            col--;
            row++;
        }
        return arr;
    
    }

}