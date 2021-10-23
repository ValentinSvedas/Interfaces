class Utils {
    /**
     * Checkea que la tecla sea w o flecha para arriba
     * @param {*} key 
     * @returns 
     */
    static checkKey(key){ 
        if(key.keyCode == 38 || key.keyCode == 87){
            return true;
        }else{
            return false;
        }
    }
    
static isInside(a, b) { //Comprueba la colicion de objetos
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
}
