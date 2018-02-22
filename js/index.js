


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

		this.load.image('fondo', 'img/inicio/fondo.jpg ');
		this.load.image('imgInicio', 'img/inicio/pantallaDeInicio.png');
		this.load.spritesheet('btnPlay','img/inicio/play.png',150,111);
		

	},

	create:function() {

		this.game.add.sprite(0, 0,'fondo');
		this.game.add.sprite(0,0,'imgInicio');
		this.btnPlay = this.game.add.button(game.world.centerX,game.world.centerY,'btnPlay',map ,this,1,1,2);
		this.btnPlay.anchor.setTo(-0.20,-1.5);
		

		
	},


	 update:function() {

	}

}

var map ={

	
	preload:function() {

		this.load.image('fondo', 'img/inicio/fondo.jpg ');
		this.load.image('imgInicio', 'img/inicio/pantallaDeInicio.png');
		this.load.spritesheet('btnPlay','img/inicio/play.png',150,111);
		

	},

	create:function() {

		this.game.add.sprite(0, 0,'fondo');
		this.game.add.sprite(0,0,'imgInicio');
		this.btnPlay = this.game.add.button(game.world.centerX,game.world.centerY,'btnPlay',map ,this,1,1,2);
		this.btnPlay.anchor.setTo(-0.20,-1.5);
		

		
	},


	 update:function() {

	}

}

function goToMap() {
    game.state.start('GamePlay');
}

	game.state.add('Playgame', playGame);
	game.state.start('Playgame');


/*
Playgame.prototype = {

	
}

*/
