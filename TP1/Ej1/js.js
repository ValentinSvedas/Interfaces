"use strict";


window.onload = function crearMatriz(){
    let matriz = [];
    let valor;
    let valorMax;
    let valorMin;
    for (let i = 0; i < 100; i++) {
       for (let j = 0; j < 100; j++) {
        matriz.push(Math.floor(Math.random()*100));
       }
       if(valor % 2 == 0){
            console.log();
       }else{
           console.log()
       }
    }
   let contenedor = document.querySelector("#matriz");
    contenedor.innerHTML = matriz;
}

window.onload =function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
      ctx.strokeRect(30, 20, 150, 100);
      ctx.fillStyle = '#FFA500';
    }
  } 