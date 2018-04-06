document.addEventListener("deviceready", onDeviceReady, false);


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
	bloquex:-90,
	bloquey:515,
	range:1.6,
	step: Math.PI*1/180, // 1 radianes
	debug: false,
	gravity:300
}
var game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, 'game');


var boot = {
	preload: function(){


		game.load.image('fondoInicio', 'img/fondo.jpg ');
		game.load.image('imgInicio', 'img/pantallaDeInicio.png');
		game.load.spritesheet('btnPlayInicio','img/playInicio.png',150,111);

		game.load.image('fondoMapa', 'img/fondoMapa.jpg ');
		game.load.spritesheet('btnPlayMapa','img/play.png');
		game.load.spritesheet('btnCreditosMapa','img/creditos.png');
		game.load.spritesheet('btnInfoMapa','img/informacion.png');

		game.load.image('fondoMapa', 'img/fondoMapa.jpg ');
		game.load.image('creditos','img/creditos.png ');
		game.load.spritesheet('btnAtras','img/btnAtras.png');

		game.load.image('fondoMapa', 'img/fondoMapa.jpg ');
		game.load.image('informacion','img/informacion.png ');
		game.load.spritesheet('btnAtras','img/btnAtras.png');

		game.load.image('fondoJuego', 'img/fondo.jpg ');
		game.load.image('escenario','img/escenario.png ');
		game.load.spritesheet('btnOpciones','img/btnOpciones.png');
		game.load.image('base','img/base.png');
		game.load.image('bloque','img/bloque.png');

		game.load.image('score','img/score.png');
		game.load.spritesheet('btnReiniciar','img/reiniciar.png');

		game.load.physics('physicsData','img/sprites.json');

		
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


		 // se activa la fisica del juego
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y= gameOptions.gravity;
		game.physics.p2.friction = 100;



		game.add.sprite(0, 0,'fondoJuego');
		game.add.sprite(0, 0,'escenario');
		
		base = game.add.sprite(gameOptions.basex,gameOptions.basey,'base');
		game.physics.p2.enable(base,gameOptions.debug);

		
		base.body.kinematic = true;
		base.body.clearShapes();
		base.body.loadPolygon('physicsData','base');
		
		
		bloques = game.add.physicsGroup(Phaser.Physics.P2JS);
		
		mainBloque = game.add.sprite(gameOptions.bloquex,gameOptions.bloquey,'bloque');
		game.physics.p2.enable(mainBloque,gameOptions.debug);
		
		mainBloque.body.static = true;
		mainBloque.body.clearShapes();
		mainBloque.body.loadPolygon('physicsData','bloque');
		mainBloque.body.mass=30000;
		
		//botones
		btnOpciones = this.game.add.button(game.world.centerX,game.world.centerY,'btnOpciones',goToOptions,this);
		btnOpciones.anchor.setTo(-2,7); 
		
		game.input.onTap.add(this.onTap,this);
	},
	 update:function() {
		

		this.moveBloque();


	},
	moveBloque: function(){
		var tStep = -gameOptions.range*Math.cos(rads)+gameOptions.range;

		
		posFinal = mainBloque.body.x = -90 +tStep * 200; //-----

		if(rads>=(360*gameOptions.step)){
			rads = 0;
		}
		else{
			rads += gameOptions.step;
		}
		
	},
	hit: function(body,shapeA,shapeB,equation){

		//score--;
		if(body=== null){
			
			game.state.start('End');

			//guardar score

			score=0;
		}
		
	},
	onTap: function(pointer,tap){

		var random = Math.random();

		this.createBloque(posFinal,mainBloque.body.y);
		if(random<=0.5){
			rads=0;
		}
		else{
			rads=Math.PI;
		}
		mainBloque.body.y -=28;

		//return true;

	},
	createBloque: function(posx,posy){

		bloque = bloques.create(posx,posy,'bloque');
		game.physics.p2.enable(bloque,gameOptions.debug);
		bloque.body.dinamic = true;
		bloque.body.clearShapes();
		bloque.body.loadPolygon('physicsData','bloque');
		bloque.body.velocity.y = 0;
		bloque.body.mass =300;
		bloque.body.onBeginContact.add(this.hit,this);


	}

}

var options = {

}

var end ={
	create: function(){

		game.add.sprite(0, 0,'fondoJuego');
		game.add.sprite(0, 0,'score');


		btnReiniciar = this.game.add.button(game.world.centerX,game.world.centerY,'btnReiniciar',goToGame,this);
		btnReiniciar.anchor.setTo(0,0);

	}
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
	game.state.add('End',end);

	


	

function onDeviceReady() {
   
	game.state.start('Boot');
}


