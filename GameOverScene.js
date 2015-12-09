function GameOverScene(currentScene){
	currentScene = "GAMEOVER";
	//this.endAudio =  new Audio(lvlLoader.getResource('m_Defeat'));
	//this.endAudio.play();
	this.overWonImage = new Image();
	this.overLostImage = new Image();
	this.overButton = new Image();
}


GameOverScene.prototype.update = function(e, ctx, GO){
	
	if(e.type == 'touchstart' || e.type == 'mousedown'){
		if(e.type == 'touchstart'){
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		}else{
			x = e.pageX;
			y = e.pageY;
		}
		if((x > 390 && y > 390)&&(x < 390 + 130 && y < 390 + 130)){
		this.endAudio.stop();
			location.reload();	
		}
	}
	ctx.clearRect(0,0, 1280,1080);
	if(GO == true){
		ctx.drawImage(this.overWonImage,0,0);
	}else{
		ctx.drawImage(this.overLostImage,0,0);
  }
    ctx.drawImage(this.overButton, 350, 350);
}

GameOverScene.prototype.loadResources = function () {
	this.overWonImage.src = lvlLoader.getResource('victory_Image');
	this.overLostImage.src = lvlLoader.getResource('Over_Image');
	this.overButton.src = lvlLoader.getResource('Menu_Button');
}