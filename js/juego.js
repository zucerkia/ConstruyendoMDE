


/*
var R = 270, r = 15, freq = 1 / 6;
var t = 0;
var nBalls = 1;
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

*/


$(document).ready(function(){

  var torre = $('.torre');
  var escenario = $('.escenario');
  //var idTorre =$('#torre');

    var pos='350px'
    var neg='-'+pos;
    var direccion= pos;
    var numBloques=2;
    var distBase=30;
    var velocidad = 2000;


    //agregarBloque(distBase*numBloques)
    var animacion = setInterval(animar,2000);



    $("main").click(function(){

        clearInterval(animacion);
        torre.stop();

        $("#torre").removeClass('.torre');

        agregarBloque(distBase*numBloques,numBloques);
        numBloques++;
        console.log(numBloques);
        //setInterval(animar,1000);


    });


      function animar(){

        if(direccion==pos){
          torre.animate({left: direccion}, velocidad);
          direccion=neg;
         }
         else{
          torre.animate({left: direccion}, velocidad);
      direccion=pos;

         }
      }

      function agregarBloque(distBase,numBloques){
        var distancia = distBase+130;
        $("main").append("<div class='torrePos torre' id='torre' style='bottom:"+distancia+"px'><img src='/img/modulo"+numBloques+".png'></div>");
      }
/*
    requestAnimationFrame(cycle);

    function cycle(time) {

      var multPhase = Number(document.querySelector("select").value);
      var angPhase = 2 * Math.PI;
      for (var i = 1; i <= nBalls; i++) {
        var xMAS = xArmonic(t, R - r, freq, angPhase * i * multPhase, width / 2);
        var pos = rotate(xMAS, angPhase * i / 2, [width / 2, (height-80) / 2]);
        drawBall(pos[0], pos[1], r, i);
      }

      torre.animate({right: 350+pos+'px'});

      // incrementa el tiempo en 1/60 seg, incrementa el contador y ejecuta la animacion
      t += 1 / 60;
      counter++;
      requestAnimationFrame(cycle);
    }

    function drawBall(x, y, r, i) {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = "24px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(i, x - 13, y + 7);
    }

    function xArmonic(t, Amp, freq, angPhase) {
      return Amp * Math.cos(2 * Math.PI * freq * t + angPhase);
    }

    function rotate(r, ang, center) {
      return [r * Math.cos(ang) + center[0], r * Math.sin(ang) + center[1]];
    }

*/

});
