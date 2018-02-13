


/*
var R = 270, r = 15, freq = 1 / 6;
var t = 0;
var nBalls = 1;
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

*/

var contador_torre = 0;
var torre;
var main;
var escenario;

var pos='350px'
var neg='-'+pos;
var direccion= pos;
var numBloques=2;
var distBase=30;
var velocidad = 2000;
var altura=800;

$(document).ready(function(){


  escenario = $('.escenario');
  main = $('main');
  //var idTorre =$('#torre');
  torre = $('#torre');



    //agregarBloque(distBase*numBloques)
    var animacion = setInterval(animar,2000);



    main.click(function(){

      if(numBloques<=9){



        //clearInterval(animacion);
        torre.stop();

        //$("#torre").removeClass('.torre');

        agregarBloque(distBase*numBloques,numBloques);
        numBloques++;
        console.log(numBloques);
        //setInterval(animar,1000);

      }
      else{

          parseInt(altura)+40;

          main.css("height",altura+"px");
          //main.scrollTop();
          //clearInterval(animacion);
          torre.stop();

          //$("#torre").removeClass('.torre');

          agregarBloque(distBase*numBloques,numBloques);
          numBloques++;
          console.log(numBloques);



      }
    });


      function animar(){
        if(torre){
          if(direccion==pos){
            torre.animate({left: direccion}, velocidad);
            direccion=neg;
          }
          else{
            torre.animate({left: direccion}, velocidad);
            direccion=pos;

          }
        }
      }

      function agregarBloque(distBase,numBloques){
        var distancia = distBase+130;
        var temp = "<div class='torrePos torre' id='torre_"+(++contador_torre)+"'";
        temp += " style='bottom:"+distancia+"px'><img src='/img/modulo"+numBloques+".png'></div>";

        console.log(contador_torre);
        $("main").append(temp);
        torre = $("#torre_"+contador_torre);
      }


});
