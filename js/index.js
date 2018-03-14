


/*

var boton = $('#link');


$(document).ready(function(){


      $("main").click(function(){

        boton.empty();
        boton.append("<img id='boton' src='/img/botonPlayPresionado.png'>");



      });

});
*/

var bloques;
var bases;



var gameOptions={
	gameWidth:480,
	gameHeight:800,
	posx:130,
	posy:500,
	movimiento:true
}
var game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, 'game');
var playGame = {
	preload:function() {
		game.load.image('fondoInicio', 'img/inicio/fondo.jpg ');
		game.load.image('imgInicio', 'img/inicio/pantallaDeInicio.png');
		game.load.spritesheet('btnPlayInicio','img/inicio/playInicio.png',150,111);
	},
	create:function() {
		game.add.sprite(0, 0,'fondoInicio');
		game.add.sprite(0,0,'imgInicio');
		var btnPlay = this.game.add.button(game.world.centerX,game.world.centerY,'btnPlayInicio',goToMap ,this,1,1,2);
		btnPlay.anchor.setTo(-0.20,-1.5);
	},
	 update:function() {
	}
}
var map ={	
	preload:function() {
		game.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		game.load.spritesheet('btnPlayMapa','img/mapa/play.png');
		game.load.spritesheet('btnCreditosMapa','img/mapa/creditos.png');
		game.load.spritesheet('btnInfoMapa','img/mapa/informacion.png');
	},
	create:function() {
		game.add.sprite(0, 0,'fondoMapa');
		var btnPlayMapa = game.add.button(game.world.centerX,game.world.centerY,'btnPlayMapa',goToGame,this);
		btnPlayMapa.anchor.setTo(-0.5,-0.8);
		var btnCreditos = game.add.button(game.world.centerX,game.world.centerY,'btnCreditosMapa',goToCreditos,this);
		btnCreditos.anchor.setTo(-0.7,5.5);
		var btnInfo = game.add.button(game.world.centerX,game.world.centerY,'btnInfoMapa',goToInfo,this);
		btnInfo.anchor.setTo(2.3,3); 	
	},
	 update:function() {
	}
}

var credits ={
	preload:function() {
		game.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		game.load.image('creditos','img/creditos/creditos.png ');
		game.load.spritesheet('btnAtras','img/comun/btnAtras.png');
		
	},
	create:function() {
		game.add.sprite(0, 0,'fondoMapa');
		game.add.sprite(0, 0,'creditos');
		var btnAtras = game.add.button(game.world.centerX,game.world.centerY,'btnAtras',goToMap,this);
		btnAtras.anchor.setTo(0.3,-2.5); 	
	},
	 update:function() {
	}

}

var info ={
	preload:function() {
		game.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		game.load.image('informacion','img/informacion/informacion.png ');
		game.load.spritesheet('btnAtras','img/comun/btnAtras.png');
		
	},
	create:function() {
		game.add.sprite(0, 0,'fondoMapa');
		game.add.sprite(0, 0,'informacion');
		var btnAtras = game.add.button(game.world.centerX,game.world.centerY,'btnAtras',goToMap,this);
		btnAtras.anchor.setTo(0.3,-2.5); 	
	},
	 update:function() {
	}

}

var initGame={
	preload:function() {
		game.load.image('fondoJuego', 'img/juego/fondo.jpg ');
		game.load.image('escenario','img/juego/escenario.png ');
		game.load.spritesheet('btnOpciones','img/juego/btnOpciones.png');
		game.load.image('base','img/juego/base.png');
		game.load.image('bloque','img/juego/bloque.png');
		
		
	},
	create:function() {


		game.physics.startSystem(Phaser.Physics.ARCADE); // se activa la fisica del juego


		game.add.sprite(0, 0,'fondoJuego');
		game.add.sprite(0, 0,'escenario');
		
		bases = game.add.group();		
		bases.enableBody = true;

		bloques = game.add.group();		
		bloques.enableBody = true;

		var base = bases.create(gameOptions.posx,gameOptions.posy,'base');
		base.body.immovable = true;


		for (var i = 0; i < 1; i++) {

			var bloque = bloques.create(gameOptions.posx,gameOptions.posy-200,'bloque');
			game.physics.arcade.enable(bloque);


			//if(clic){}  cuando se haga clic se habilita la gravedad y el bounce

			//bloque.body.collideWorldBounds = true;
			bloque.body.bounce.y = 0.3;
			bloque.body.gravity.y= 300;
			
		}

		//botones
		btnOpciones = this.game.add.button(game.world.centerX,game.world.centerY,'btnOpciones',goToOptions,this);
		btnOpciones.anchor.setTo(-2,7); 	
	},
	 update:function() {

		var colision = game.physics.arcade.collide(bloques,bases);
	}

}

var options = {

}

function goToMap() {
    game.state.start('Map');
}

function goToCreditos() {
    game.state.start('Credits');
}
function goToGame() {
    game.state.start('InitGame');
}
function goToInfo() {
    game.state.start('Info');
}
function goToOptions() {
    game.state.start('Options');
}

	game.state.add('Playgame', playGame);
	game.state.add('Map', map);
	game.state.add('Credits', credits);
	game.state.add('Info', info);
	game.state.add('InitGame', initGame);
	game.state.add('Options', options);

	





	game.state.start('Playgame');


/*
Playgame.prototype = {

	
}

*/


