
var game, cv;

function main(){
	cv = document.getElementById('myCanvas');
	game = new Game(cv);
   	window.requestAnimationFrame(game.gameLoop);
}
 