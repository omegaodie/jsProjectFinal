var gameData;
function Game(canvas){
	ctx = canvas.getContext('2d');
	
	this.scnManager = new SceneManager(ctx);
	this.currentScene = "MENU";
	this.scnManager.getScene(this.currentScene);
	window.addEventListener("touchstart", this.gameLoop);
	window.addEventListener("keypress", this.gameLoop);
	window.addEventListener ("mousedown", this.gameLoop);
	canvas.onmousewheel = function(event){
		event.preventDefault();
	};

}

Game.prototype.gameLoop = function(e){
	game.scnManager.update(e, ctx);
	if(game.scnManager.getScene() == "MENU"){
		var x , y;
		var cv = document.getElementById('myCanvas');
		var rect = cv.getBoundingClientRect();
		if (e.type == 'touchstart'){
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		}else{
			x = e.pageX;
			y = e.pageY;
		}
		if(x > 0 && y > 0){
			game.scnManager.setScene("GAME");
		}
	}
	 window.requestAnimationFrame(game.gameLoop);
}

