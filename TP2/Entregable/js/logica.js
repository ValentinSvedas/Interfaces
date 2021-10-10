class Logica{
/**
 * encuentra los vecionos de al lado segun si es columna fila diagonal
 * @param {*} array 
 * @param {*} fichaInsertada 
 * @returns 
 */
    static arrayNeighbors(array,fichaInsertada) {
        let fichaPos = this.getPosInArray(array,fichaInsertada); 
        let neighbors = new Array();
        for (let i = 0; i < array.length; i++){
            if ((i == fichaPos - 1) || (i == fichaPos + 1)){
                neighbors.push(array[i]);
            }
        }
        return neighbors;
    }
/**
 * Enecuentra la posicion de la ficha insertada en el tablero 
 * @param {*} array 
 * @param {*} ficha 
 * @returns 
 */
    static getPosInArray(array,ficha){
        console.log(ficha)
        for (let i = 0; i < array.length; i++){
            if ((array[i].i == ficha.getPosX()) && (array[i].j == ficha.getPosY()) ){
                return i;
            }
        }
    }

    /**
     * Suma la cantidad de fichas, verifica si hay vecionos con el mismo estado y si hay agarra esa ficha y se fija si tiene más vecinos al rededor
     * @param {*} nJuego 
     * @param {*} array 
     * @returns 
     */
     static sumFiachas(nJuego,array){
         let fichaInsertada = juego.getBoard().getUltimaFicha();
         let neighbors = this.arrayNeighbors(array,fichaInsertada);
         let visited = new Array();
         let queue = new Array();
         visited.push(fichaInsertada);
         
        neighbors.forEach(n => {
            if (this.equalFichaColor(nJuego,fichaInsertada,n)){
                queue.push(n);
            }
        });
        while (queue.length > 0) {
            let num = queue.length-1;
            let fichaActual = new Slot(queue[num].i,queue[num].j);
            queue.pop(); 
            if ((!visited.some(f => this.sameSlot(f,fichaActual)))){
                visited.push(fichaActual);
                neighbors = this.arrayNeighbors(array,fichaActual);
                neighbors.forEach(n => {
                    if (this.equalFichaColor(nJuego,fichaActual,n)){
                        queue.push(n);
                    }
                });
            }
        }
        return visited.length;
    }

    //puede ir en otro js
    /**
     * Verifica que sean fichas iguales
     * @param {*} nJuego 
     * @param {*} posFiacha1 
     * @param {*} posFiacha2 
     * @returns 
     */
   static equalFichaColor(nJuego,posFiacha1,posFiacha2){
        return (nJuego[posFiacha1.getPosX()][posFiacha1.getPosY()].getEstado() == nJuego[posFiacha2.i][posFiacha2.j].getEstado());
    }
    
    static sameSlot(ficha1,ficha2){
        return (ficha1.getPosY() == ficha2.getPosY()) && (ficha1.getPosX() == ficha2.getPosX()); 
    }
}