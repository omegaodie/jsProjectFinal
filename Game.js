
function Game(canvas){
	ctx = canvas.getContext('2d');
	lvlLoader = new levelLoader();
	this.audio =  new Audio(lvlLoader.getResource('m_Begin'));
	console.log(this.audio);
	this.audio.play();
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
	var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
	game.scnManager.update(e, ctx);
	this.checkscene = game.scnManager.getScene();
	if(this.checkscene != game.currentScene){
		game.audioPlayer();
		game.currentScene = this.checkscene;
	}
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


Game.prototype.audioPlayer = function(){
		this.scn = this.scnManager.getScene();
		if(this.scn == "GAME"){
			this.lvl = this.scnManager.getLevel();
			if(this.lvl == 0){
				this.audio.pause();
				this.audio = new Audio(lvlLoader.getResource('m_Ambient'));
				this.audio.play();
			}
		} if(this.scn == "GAMEOVER"){
				this.audio.pause();
				this.audio = new Audio(lvlLoader.getResource('m_Defeat'));
				this.audio.play();
		}
}
