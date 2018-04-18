document.addEventListener("deviceready", onDeviceReady, false);

var btnSeguir;
// var btnAtras;
// var sprites;
// var btnPlay;
// var btnPlayMapa;
// var btnCreditos;
// var btnInfo;
// var btnOpciones;
var bloques;
var base;
var bloque;
var mainBloque;
var rads = 0;
var posFinal=0;
var bestScore=0;
var score=0;
var scoreText;
var bestScoreText;
var limit=4; //num de bloques necesarios para mover la camara

var gameOptions={
	gameWidth:480,
	gameHeight:800,
	basex:250,
	basey:200,
	bloquex:-90,
	bloquey:245,
	range:1.6,
	step: Math.PI*1/180, // 1 radianes
	debug: false,
	gravity:300,
	worldHeight:6000,
	localStorageName: "construyeMDE"
}
var game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.CANVAS, 'game');


var boot = {
	init: function (){
		 game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		 bestScore = localStorage.getItem(gameOptions.localStorageName) == null ? localStorage.setItem(gameOptions.localStorageName, 0 ) : JSON.parse(localStorage.getItem(gameOptions.localStorageName));

    },
	preload: function(){


		game.load.image('fondoInicio', 'img/fondo.jpg ');
		game.load.image('imgInicio', 'img/pantallaDeInicio.png');
		game.load.spritesheet('btnPlayInicio','img/playInicio.png',150,111);

		game.load.image('fondoMapa', 'img/fondoMapa.jpg ');
		game.load.spritesheet('btnPlayMapa','img/play.png');
		game.load.spritesheet('btnCreditosMapa','img/btnCreditos.png');
		game.load.spritesheet('btnInfoMapa','img/btnInformacion.png');

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

		game.load.image('fondoOpciones','img/fondoOpciones.png');
		game.load.spritesheet('btnSeguir','img/btnSeguir.png');

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
		btnPlay = this.game.add.button(280,560,'btnPlayInicio',goToMap ,this,1,1,2);
		// btnPlay.anchor.setTo(-0.20,-1.5);
	},
	 update:function() {
	}
}
var map ={	
	
	create:function() {
		game.add.sprite(0, 0,'fondoMapa');
		btnPlayMapa = game.add.button(290,470,'btnPlayMapa',goToGame,this);
		// btnPlayMapa.anchor.setTo(-0.5,-0.8);
		btnCreditos = game.add.button(290,25,'btnCreditosMapa',goToCreditos,this);
		// btnCreditos.anchor.setTo(-0.7,5.5);
		btnInfo = game.add.button(75,200,'btnInfoMapa',goToInfo,this);
		// btnInfo.anchor.setTo(2.3,3); 	
	},
	 update:function() {
	}
}
var credits ={

	create:function() {
		game.add.sprite(0, 0,'fondoMapa');
		game.add.sprite(0, 0,'creditos');
		btnAtras = game.add.button(200,600,'btnAtras',goToMap,this);
		// btnAtras.anchor.setTo(0.3,-2.5); 	
	},
	 update:function() {
	}

}
var info ={

	create:function() {
		game.add.sprite(0, 0,'fondoMapa');
		game.add.sprite(0, 0,'informacion');
		var btnAtras = game.add.button(200,600,'btnAtras',goToMap,this);
		// btnAtras.anchor.setTo(0.3,-2.5); 	
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

		game.world.setBounds(0, 0, gameOptions.gameWidth, gameOptions.worldHeight);
	
		game.stage.backgroundColor = '#fff266';


		// fondo = game.add.sprite(0,gameOptions.worldHeight-gameOptions.gameHeight,'fondoJuego');
		escenario = game.add.sprite(0,gameOptions.worldHeight-gameOptions.gameHeight,'escenario');

		// se posiciona la camara en el final del mundo del juego
		game.camera.y= gameOptions.worldHeight;
		
		base = game.add.sprite(gameOptions.basex,gameOptions.worldHeight-gameOptions.basey,'base');
		game.physics.p2.enable(base,gameOptions.debug);

		
		base.body.kinematic = true;
		base.body.clearShapes();
		base.body.loadPolygon('physicsData','base');
		
		
		bloques = game.add.physicsGroup(Phaser.Physics.P2JS);
		
		mainBloque = game.add.sprite(gameOptions.bloquex,gameOptions.worldHeight-gameOptions.bloquey,'bloque');
		game.physics.p2.enable(mainBloque,gameOptions.debug);
		
		mainBloque.body.static = true;
		mainBloque.body.clearShapes();
		mainBloque.body.loadPolygon('physicsData','bloque');
		mainBloque.body.mass=30000;

		
		
		scoreText = game.add.text(0, 0, "SCORE: "+score, { font: "32px Arial", fill: "#000", align: "center" });
    	scoreText.fixedToCamera = true;
		scoreText.cameraOffset.setTo(30, 20);
		



		//botones
		
		
		btnOpciones = game.add.sprite(400,45,'btnOpciones');
		game.physics.p2.enable(btnOpciones,gameOptions.debug);
		btnOpciones.body.static = true;

		
		btnOpciones.fixedToCamera = true;
		game.input.onDown.add(this.onTap,this);

	},
	 update:function() {
		

		this.moveBloque();
		scoreText.setText("SCORE: "+score);

		
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


		if(body=== null){

			if(score>bestScore){
				localStorage.setItem(gameOptions.localStorageName, score);
				bestScore=score;
			}
			game.state.start('End');
			score=0;
		}
		

	},
	onTap: function(sprite){

		sprites = game.physics.p2.hitTest(sprite.position,[btnOpciones,btnSeguir]);

			 

			// console.log(sprite);
			if(sprites.length === 0){

				var random = Math.random();

				this.createBloque(posFinal,mainBloque.body.y);
				if(random<=0.5){
					rads=0;
				}
				else{
					rads=Math.PI;
				}
				mainBloque.body.y -=30;
				score++;
			}
			else{

				this.managePause();

			}

	},
	createBloque: function(posx,posy){

		bloque = bloques.create(posx,posy,'bloque');
		game.physics.p2.enable(bloque,gameOptions.debug);
		bloque.body.dinamic = true;
		bloque.body.clearShapes();
		bloque.body.loadPolygon('physicsData','bloque');
		bloque.body.velocity.y = 0;
		bloque.body.mass =300;

		

		if(score==limit){
		game.camera.follow(bloque,Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);
			limit+=4;
		}
		bloque.body.onBeginContact.add(this.hit,this);


	},

	managePause: function(sprite){

		
		game.input.onDown.remove(this.onTap,this);

		bgndOpciones = game.add.sprite(0,game.camera.y,'fondoOpciones');
		// bgndOpciones.visible=false;

		btnSeguir = game.add.button(80,game.camera.y+140,'btnSeguir',this.manageContinue,this);
		// btnSeguir.visible=false;

		game.paused = true;
		btnOpciones.visible=false;
		// btnSeguir.visible=true;
		// bgndOpciones.visible=true;
		

		// console.log('pausa');

	},

	manageContinue: function () {
		game.paused= false;
		btnOpciones.visible=true;
		// btnSeguir.visible=false;
		// bgndOpciones.visible=false;
		btnSeguir.destroy();
		bgndOpciones.destroy();

		game.input.onDown.add(this.onTap,this);
		
		
		
	}


}

// var options = {

// }

var end ={
	create: function(){

		game.add.sprite(2, 0,'fondoJuego');
		game.add.sprite(0, 0,'score');


		//btnReiniciar = game.add.button(0,0,'btnReiniciar',goToGame,this);
		btnReiniciar = game.add.button(125,550,'btnReiniciar',goToGame,this);
		btnInicio = game.add.button(290,550,'btnAtras',goToInicio,this);
		
		// btnReiniciar.anchor.setTo(-2,7);

		bestScoreText = game.add.text(330,470, bestScore, { font: "32px Arial", fill: "#fff", align: "center" });
		limit=0;

	},
	// update: function(){
	// 	bestScoreText.setText(bestScore);

	// }
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

function goToInicio() {
	// game.state.start('PlayGame');
	game.state.start('Playgame');
	
}



	game.state.add('Boot',boot);
	game.state.add('Playgame', playGame);
	game.state.add('Map', map);
	game.state.add('Credits', credits);
	game.state.add('Info', info);
	game.state.add('InitGame', initGame);
// game.state.add('Options', options);
	game.state.add('End',end);

	


	

function onDeviceReady() {
   
	game.state.start('Boot');
}


