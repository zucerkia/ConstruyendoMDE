


/*

var boton = $('#link');


$(document).ready(function(){


      $("main").click(function(){

        boton.empty();
        boton.append("<img id='boton' src='/img/botonPlayPresionado.png'>");



      });

});
*/
var game;
var gameOptions={

	gameWidth:480,
	gameHeight:800
}

game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, 'game');
/*
window.onload() = function(){


  game.state.add("Playgame", playGame);
  game.state.start("playgame");

}
*/
var playGame = {

	preload:function() {

	  game.load.image('fondo', 'img/inicio/fondo.jpg ');

	},

	create:function() {

	  game.add.sprite(0, 0,'fondo');
	},

	 update:function() {

	}

}
	game.state.add('Playgame', playGame);
	game.state.start('Playgame');


/*
Playgame.prototype = {

	
}

*/
