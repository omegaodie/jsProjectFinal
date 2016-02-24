function SceneManager(ctx){
	this.gmScn = new GameScene(ctx);
	this.mnuScene = new MenuScene(ctx);
	this.gameOVER = new GameOverScene(ctx);
	this.state = "MENU";
	this.menuLoaded = false;
	this.gameLoaded = false;
	this.thing = false;
}


SceneManager.prototype.update = function(e, ctx){
	if(this.state == "GAME"){
		if(this.gameLoaded == false){
			this.mnuScene.loadResources();
			this.gameLoaded = true;
		}
		this.gmScn.update(e, ctx);
		if(this.gmScn.getOverL() == true){
			this.state = "GAMEOVER";
		}
		if(this.gmScn.getOverW() == true){
			this.state = "GAMEOVER";
			this.thing = true;
		}
	}else if(this.state == "MENU"){
		if(this.menuLoaded == false){
			console.log("menuLoad");
			this.mnuScene.loadResources();
			this.menuLoaded = true;
		}
		this.mnuScene.update(e,ctx);
	}else if(this.state = "GAMEOVER"){
		this.gameOVER.loadResources();
		this.gameOVER.update(e,ctx,this.thing);
	}
}


SceneManager.prototype.setScene = function(scene){
	this.state = scene;
}

SceneManager.prototype.getScene = function(){
	return this.state;
}