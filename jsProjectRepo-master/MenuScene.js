function MenuScene(currentScene){
	currentScene = "MENU";
	this.menuimage = new Image();
}


MenuScene.prototype.update = function(e, ctx){
	ctx.clearRect(0,0, 1280,1080);
    ctx.drawImage(this.menuimage,0,0);
}

MenuScene.prototype.loadResources = function () {
	this.menuimage.src = GameData.Menu_Background.t;
	console.log(this.menuimage);
}
