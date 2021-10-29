class Utils {
    /**
     * Checkea que la tecla sea w o flecha para arriba
     * @param {*} key 
     * @returns 
     */
    static checkKey(key){ 
        if(key.keyCode == 38 || key.keyCode == 87 || key.keyCode == 32){
            return true;
        }else{
            return false;
        }
    }
    
static isInsidePumpkin(a, b) { //Comprueba la colicion de objetos
    return !(
        ((a.y + a.height)-8 < (b.y+10))  || 
        (a.y > (b.y + b.height) )  ||
        ((a.x + a.width) < b.x)  ||
        (a.x > (b.x + b.width)-70) 
    );
}
static isInsidePumpkin2(a, b) { //Comprueba la colicion de objetos
    return !(
        ((a.y + a.height)-8 < (b.y-10))  || 
        (a.y > (b.y + b.height)-40 )  ||
        ((a.x + a.width) < b.x)  ||
        (a.x > (b.x + b.width)-30) 
    );
}
static isInsidePluma(a,b){
    return !(
        ((a.y + a.height)-8 < (b.y))  || 
        (a.y > (b.y + b.height -60) )  ||
        ((a.x + a.width) < b.x+50)  ||
        (a.x > (b.x + b.width)-60) 
    );
}
}
