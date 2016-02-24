function GameOverScene(currentScene){
	currentScene = "GAMEOVER";
	this.won = false;
	this.overImage = new Image();
	this.victory = new Image();
	this.overButton = new Image();
}


GameOverScene.prototype.update = function(e, ctx, Go){
	this.won = Go;
	if(e.type == 'touchstart' || e.type == 'mousedown'){
		if(e.type == 'touchstart'){
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		}else{
			x = e.pageX;
			y = e.pageY;
		}
		if((x > 390 && y > 390)&&(x < 390 + 130 && y < 390 + 130)){
			console.log('x' + x + 'y' + y);
			location.reload();	
		}
	}
	ctx.clearRect(0,0, 1280,1080);
	if(this.won == true){
		 ctx.drawImage(this.victory,0,0);
	}else{
		ctx.drawImage(this.overImage,0,0);
	}
    ctx.drawImage(this.overButton, 350, 350);
}

GameOverScene.prototype.loadResources = function () {
	this.victory.src = lvlLoader.getResource('mm_GameWonImage');
	this.overImage.src = lvlLoader.getResource('Over_Image');
	this.overButton.src = lvlLoader.getResource('Menu_Button');
}