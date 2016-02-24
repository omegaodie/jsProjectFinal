
var game, cv, lvlLoader;

function main(){
	cv = document.getElementById('myCanvas');
	lvlLoader = new levelLoader();
	setTimeout(function(){ 
	loaded = true;
	game = new Game(cv); 
	window.requestAnimationFrame(game.gameLoop);
	}, 
	500);
}
 