


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
var base;
var bloque;
var rads = 0;

var gameOptions={
	gameWidth:480,
	gameHeight:800,
	basex:130,
	basey:500,
	bloquex:-100,
	bloquey:445,
	range:1.2,
	step: Math.PI*1/180 // 1 radianes
}
var game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, 'game');


var boot = {
	preload: function(){
		game.load.image('fondoInicio', 'img/inicio/fondo.jpg ');
		game.load.image('imgInicio', 'img/inicio/pantallaDeInicio.png');
		game.load.spritesheet('btnPlayInicio','img/inicio/playInicio.png',150,111);

		game.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		game.load.spritesheet('btnPlayMapa','img/mapa/play.png');
		game.load.spritesheet('btnCreditosMapa','img/mapa/creditos.png');
		game.load.spritesheet('btnInfoMapa','img/mapa/informacion.png');

		game.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		game.load.image('creditos','img/creditos/creditos.png ');
		game.load.spritesheet('btnAtras','img/comun/btnAtras.png');

		game.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		game.load.image('informacion','img/informacion/informacion.png ');
		game.load.spritesheet('btnAtras','img/comun/btnAtras.png');

		game.load.image('fondoJuego', 'img/juego/fondo.jpg ');
		game.load.image('escenario','img/juego/escenario.png ');
		game.load.spritesheet('btnOpciones','img/juego/btnOpciones.png');
		game.load.image('base','img/juego/base.png');
		game.load.image('bloque','img/juego/bloque.png');
		
	},
	create: function(){
		game.state.start('Playgame');

	}
}
var playGame = {
	
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
	
	create:function() {


		game.physics.startSystem(Phaser.Physics.ARCADE); // se activa la fisica del juego


		game.add.sprite(0, 0,'fondoJuego');
		game.add.sprite(0, 0,'escenario');
		
		bases = game.add.group();		
		bases.enableBody = true;
		

		bloques = game.add.group();		
		bloques.enableBody = true;

		base = bases.create(gameOptions.basex,gameOptions.basey,'base');
		base.body.setSize(231,55);
		base.body.immovable = true;

		bloque = bloques.create(gameOptions.bloquex,gameOptions.bloquey,'bloque');
		game.physics.arcade.enable(bloque);
		bloque.body.setSize(231,30);




			//if(clic){}  cuando se haga clic se habilita la gravedad y el bounce

			//bloque.body.bounce.y = 0.5;
			//bloque.body.gravity.y= 30;
			
		
		//game.debug.body(bloque);
		//game.debug.body(base);


		//botones
		btnOpciones = this.game.add.button(game.world.centerX,game.world.centerY,'btnOpciones',goToOptions,this);
		btnOpciones.anchor.setTo(-2,7); 	
	},
	 update:function() {

		var colision = game.physics.arcade.collide(bloques,bases);
		game.physics.arcade.collide(bloques,bloques);

		var tStep = -gameOptions.range*Math.cos(rads)+gameOptions.range;

		bloque.body.x = -100 +tStep * 200;

		if(rads>=(360*gameOptions.step)){
			rads = 0;
		}
		else{
			rads += gameOptions.step;
		}


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



	game.state.add('Boot',boot);
	game.state.add('Playgame', playGame);
	game.state.add('Map', map);
	game.state.add('Credits', credits);
	game.state.add('Info', info);
	game.state.add('InitGame', initGame);
	game.state.add('Options', options);

	





	game.state.start('Boot');






