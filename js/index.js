


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
var base;
var bloque;
var mainBloque;
var rads = 0;
var posFinal=0;
var gameOptions={
	gameWidth:480,
	gameHeight:800,
	//basex:130,
	basex:250,
	//basey:500,
	basey:570,
	bloquex:-100,
	bloquey:445,
	range:1.2,
	step: Math.PI*1/180, // 1 radianes
	debug: true
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

		game.load.physics('physicsData','img/juego/sprites.json');

		
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


		//game.physics.startSystem(Phaser.Physics.ARCADE); // se activa la fisica del juego
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y=100;


		game.add.sprite(0, 0,'fondoJuego');
		game.add.sprite(0, 0,'escenario');
		
		//bases = game.add.group();
		mainBloque = game.add.sprite(gameOptions.bloquex,gameOptions.bloquey-200,'bloque');
		base = game.add.sprite(gameOptions.basex,gameOptions.basey,'base');

		

		game.physics.p2.enable([mainBloque,base],gameOptions.debug);
		game.physics.p2.gravity.y=300;

		mainBloque.body.kinematic = true;
		mainBloque.body.clearShapes();
		mainBloque.body.loadPolygon('physicsData','bloque');

		base.body.kinematic = true;
		base.body.clearShapes();
		base.body.loadPolygon('physicsData','base');
		
		//base.enableBody = true;


		

		bloques = game.add.physicsGroup(Phaser.Physics.P2JS);
		//bloques = game.add.group();
		//bloques.physics.p2.enable(bloques,gameOptions.debug);

		//bloques.body.clearShapes();
		//bloques.body.loadPolygon('physicsData','bloque');		
		//bloques.enableBody = true;

		//base = bases.create(gameOptions.basex,gameOptions.basey,'base');
		//base.body.setSize(231,55);
		//base.body.immovable = true;


		//bloque = game.add.sprite(gameOptions.bloquex+110,gameOptions.bloquey-200,'bloque');
		//mainBloque = bloques.create(gameOptions.bloquex,gameOptions.bloquey-200,'bloque');
		//mainBloque.body.clearShapes();
		//mainBloque.body.loadPolygon('physicsData','bloque');

		


		//botones
		btnOpciones = this.game.add.button(game.world.centerX,game.world.centerY,'btnOpciones',goToOptions,this);
		btnOpciones.anchor.setTo(-2,7); 
		
		game.input.onTap.add(this.onTap,this);
	},
	 update:function() {
		// var tap=false;
		// var colisionBase = game.physics.arcade.collide(bloques,bases);
		// var colisionCaja = game.physics.arcade.collide(bloques,bloques);

		this.moveBloque();


	},
	moveBloque: function(){
		var tStep = -gameOptions.range*Math.cos(rads)+gameOptions.range;

		
		posFinal = mainBloque.body.x = -100 +tStep * 200; //-----

		if(rads>=(360*gameOptions.step)){
			rads = 0;
		}
		else{
			rads += gameOptions.step;
		}
		
	},
	onTap: function(pointer,tap){

		this.createBloque(posFinal,mainBloque.body.y);
		rads=0;
		//mainBloque.body.y -=55;

		//return true;

	},
	createBloque: function(posx,posy){

		bloque = bloques.create(posx,posy,'bloque');
		game.physics.p2.enable(bloque,gameOptions.debug);
		bloque.body.clearShapes();
		bloque.body.loadPolygon('physicsData','bloque');


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






