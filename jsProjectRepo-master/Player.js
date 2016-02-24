function Player(ctx){
	this.PlayerSheet = new Image();
	this.PlayerSheet.src = lvlLoader.getResource('player_spriteSheet');
	this.player_Sprite = new sprite({
    context: ctx,
    width: 32,
    height: 32,
    numberOfFrames: 3,
    ticksPerFrame: 1,
    image: this.PlayerSheet
});
	this.xPos = 250;
	this.yPos = 350;
	this.direcTionX;
	this.direcTionY;
	this.currentanim = "down";
}

Player.prototype.draw = function(ctx){
	if(this.currentanim == "left"){
			this.player_Sprite.updatePositionImage( this.xPos, this.yPos, 1);
	}else if(this.currentanim == "right"){
			this.player_Sprite.updatePositionImage(this.xPos, this.yPos, 2);
	}else if(this.currentanim == "up"){
			this.player_Sprite.updatePositionImage(this.xPos, this.yPos, 3);
	} else{
			this.player_Sprite.updatePositionImage( this.xPos, this.yPos, 0);
	}
	this.player_Sprite.render();
}

Player.prototype.update = function(e){
if(e.type == 'touchstart' || e.type == 'mousedown'){
	if (e.type == 'touchstart'){
		this.direcTionX = e.touches[0].pageX;
		this.direcTionY = e.touches[0].pageY;
	}else{
		this.direcTionX = e.pageX;
		this.direcTionY = e.pageY;
	}
	var px =  this.direcTionX - this.xPos;
	var py =  this.direcTionY - this.yPos;
	var mPie = 3.14159;
	var mTheta = Math.atan2(-py, px);
	if (mTheta < 0){
		mTheta += 2 * mPie;
	}
	mTheta = mTheta * (180 / mPie);

	if(mTheta >= 45 && mTheta <= 135){
		this.currentanim = "up";

	}else if(mTheta >= 136 && mTheta <= 225){
		this.currentanim = "left";

	}else if(mTheta >= 226 && mTheta <= 315){
		this.currentanim = "down";

	}else{
		this.currentanim = "right";
	}
}
	if(this.xPos > this.direcTionX + 32){
		this.xPos -= 2.5;
	}
	if(this.xPos + 32 < this.direcTionX){
		this.xPos += 2.5;
	}
	if(this.yPos > this.direcTionY + 32){
		this.yPos -= 2.5;
	}
	if(this.yPos + 32 < this.direcTionY){
		this.yPos += 2.5;
	}
	this.player_Sprite.update();
}
Player.prototype.stop = function(){
	if(this.currentanim == "left"){
		this.direcTionX = this.xPos + 50;
	}else if(this.currentanim == "right"){
		this.direcTionX = this.xPos - 50;
	}else if(this.currentanim == "up"){
		this.direcTionY = this.yPos + 50;
	} else{
		this.direcTionY = this.yPos - 50;
	}
}

Player.prototype.sendPositionX = function(){
	return this.xPos;
}
Player.prototype.sendPositionY = function(){
	return this.yPos;
}

Player.prototype.checkCollision = function (goal){
        if ((this.xPos < goal.bx + goal.bheight)&&(this.xPos + 75 > goal.bx)&&(this.yPos + 75 > goal.by)&&(this.yPos < goal.by + goal.bheight))
        {                
            this.ReturnBool = true;              
        }
}

