
function AudioManager(){
	ctx = canvas.getContext('2d');
	lvlLoader = new levelLoader();
	this.scnManager = new SceneManager(ctx);
	this.currentScene = "MENU";
	this.scnManager.getScene(this.currentScene);
	window.addEventListener("touchend", this.playAudio);
	
}


Game.prototype.playAudio = function(){
	current = game.scnManager.getScene();
	if(current == "GAME"){
		crntLvl = game.scnManager.getLevel();
		if(crntLvl == 0){
			this.audio = new Audio(lvlLoader.getResource('mm_music'));
			this.audio.play();
		}
	}
}
