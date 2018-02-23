


/*

var boton = $('#link');


$(document).ready(function(){


      $("main").click(function(){

        boton.empty();
        boton.append("<img id='boton' src='/img/botonPlayPresionado.png'>");



      });

});
*/
var gameOptions={
	gameWidth:480,
	gameHeight:800
}
var game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, 'game');
var playGame = {
	preload:function() {
		this.load.image('fondoInicio', 'img/inicio/fondo.jpg ');
		this.load.image('imgInicio', 'img/inicio/pantallaDeInicio.png');
		this.load.spritesheet('btnPlayInicio','img/inicio/playInicio.png',150,111);
	},
	create:function() {
		this.game.add.sprite(0, 0,'fondoInicio');
		this.game.add.sprite(0,0,'imgInicio');
		this.btnPlay = this.game.add.button(game.world.centerX,game.world.centerY,'btnPlayInicio',goToMap ,this,1,1,2);
		this.btnPlay.anchor.setTo(-0.20,-1.5);
	},
	 update:function() {
	}
}
var map ={	
	preload:function() {
		this.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		this.load.spritesheet('btnPlayMapa','img/mapa/play.png');
		this.load.spritesheet('btnCreditosMapa','img/mapa/creditos.png');
		this.load.spritesheet('btnInfoMapa','img/mapa/informacion.png');
	},
	create:function() {
		this.game.add.sprite(0, 0,'fondoMapa');
		this.btnPlayMapa = this.game.add.button(game.world.centerX,game.world.centerY,'btnPlayMapa',goToGame,this);
		this.btnPlayMapa.anchor.setTo(-0.5,-0.8);
		this.btnCreditos = this.game.add.button(game.world.centerX,game.world.centerY,'btnCreditosMapa',goToCreditos,this);
		this.btnCreditos.anchor.setTo(-0.7,5.5);
		this.btnInfo = this.game.add.button(game.world.centerX,game.world.centerY,'btnInfoMapa',goToInfo,this);
		this.btnInfo.anchor.setTo(2.3,3); 	
	},
	 update:function() {
	}
}

var credits ={
	preload:function() {
		this.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		this.load.image('creditos','img/creditos/creditos.png ');
		this.load.spritesheet('btnAtras','img/comun/btnAtras.png');
		
	},
	create:function() {
		this.game.add.sprite(0, 0,'fondoMapa');
		this.game.add.sprite(0, 0,'creditos');
		this.btnAtras = this.game.add.button(game.world.centerX,game.world.centerY,'btnAtras',goToMap,this);
		this.btnAtras.anchor.setTo(0.3,-2.5); 	
	},
	 update:function() {
	}

}

var info ={
	preload:function() {
		this.load.image('fondoMapa', 'img/comun/fondoMapa.jpg ');
		this.load.image('informacion','img/informacion/informacion.png ');
		this.load.spritesheet('btnAtras','img/comun/btnAtras.png');
		
	},
	create:function() {
		this.game.add.sprite(0, 0,'fondoMapa');
		this.game.add.sprite(0, 0,'informacion');
		this.btnAtras = this.game.add.button(game.world.centerX,game.world.centerY,'btnAtras',goToMap,this);
		this.btnAtras.anchor.setTo(0.3,-2.5); 	
	},
	 update:function() {
	}

}

var initGame={
	preload:function() {
		this.load.image('fondoJuego', 'img/juego/fondo.jpg ');
		this.load.image('escenario','img/juego/escenario.png ');
		this.load.spritesheet('btnOpciones','img/juego/btnOpciones.png');
		
	},
	create:function() {
		this.game.add.sprite(0, 0,'fondoJuego');
		this.game.add.sprite(0, 0,'escenario');
		this.btnOpciones = this.game.add.button(game.world.centerX,game.world.centerY,'btnOpciones',goToOptions,this);
		this.btnOpciones.anchor.setTo(-2,7); 	
	},
	 update:function() {
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
