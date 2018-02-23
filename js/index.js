


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
		this.load.image('fondoMapa', 'img/mapa/fondoMapa.jpg ');
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
};
function goToMap() {
    game.state.start('Map');
}

function goToCreditos() {
    game.state.start('Map');
}
function goToGame() {
    game.state.start('Map');
}
function goToInfo() {
    game.state.start('Map');
}

	game.state.add('Playgame', playGame);
	game.state.add('Map', map);

	game.state.start('Playgame');


/*
Playgame.prototype = {

	
}

*/
