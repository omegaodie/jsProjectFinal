function Enemy(watDo){
	this.e_SpriteSheet = new Image();
	this.e_SpriteSheet.src = lvlLoader.getResource(watDo.spriteID);
	this.xPos = watDo.X;
	this.yPos = watDo.Y;
	this.direcTionX;
	this.direcTionY;
	this.currentanim = "down";
	this.frameIndex = 0,
    this.tickCount = 0,
    this.ticksPerFrame = 1;
    this.numberOfFrames = 3;		
    this.width = 32;
    this.height = 32;
    this.theStrip = 1;
    this.AItimer = 0;
    this.amAlive = true;
	
}

Enemy.prototype.drawUpdate = function(){
if(this.amAlive == true){
	this.tickCount += 1;
        // If the current frame index is in range
        if (this.frameIndex < this.numberOfFrames - 1) {  
             // Go to the next frame
            this.frameIndex += 1;
    	}else {
            this.frameIndex = 0;
    	}
	}  
        
}

Enemy.prototype.draw = function(ctx){
	if(this.amAlive == true){
		ctx.drawImage(
          this.e_SpriteSheet,
           this.frameIndex * this.width,
           32 * this.theStrip,
           32,
           32,
           this.xPos,
           this.yPos,
           this.width,
           this.height);

	if(this.currentanim == "left"){
			updatePositionImage( this.xPos, this.yPos, 1);
	}else if(this.currentanim == "right"){
			updatePositionImage(this.xPos, this.yPos, 2);
	}else if(this.currentanim == "up"){
			updatePositionImage(this.xPos, this.yPos, 3);
	} else{
			updatePositionImage( this.xPos, this.yPos, 0);
		}
	}  

function updatePositionImage(x, y, id){
		this.theStrip = id;
		this.xPos = x;
		this.yPos = y;
	}
}

Enemy.prototype.update = function(){
	if(this.amAlive == true){
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
	if(this.xPos > this.direcTionX + 32){
		this.xPos -= 0.5;
	}
	if(this.xPos + 32 < this.direcTionX){
		this.xPos += 0.5;
	}
	if(this.yPos > this.direcTionY + 32){
		this.yPos -= 0.5;
	}
	if(this.yPos + 32 < this.direcTionY){
		this.yPos += 0.5;
	}
	}
}


Enemy.prototype.stop = function(){
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

Enemy.prototype.sendPositionX = function(){
	return this.xPos;
}
Enemy.prototype.sendPositionY = function(){
	return this.yPos;
}
Enemy.prototype.sendDirectX = function(){
	return this.direcTionX;
}
Enemy.prototype.sendDirectY = function(){
	return this.direcTionY;
}

Enemy.prototype.Disperse = function(x,y){
	this.xPos = x;
	this.yPos = y;
}


Enemy.prototype.AI = function(thing){
	if(thing.playerinrange == true){
		this.direcTionX = thing.X;
		this.direcTionY = thing.Y;
	}else{
		if(this.AItimer > 20){
			if(thing.X > this.xPos){
				this.direcTionX = thing.X + this.xPos;
			}else{
				this.direcTionX = this.xPos - thing.X;
			}
			if(thing.Y > this.yPos){
				this.direcTionY = this.yPos + thing.Y;
			}else{
				this.direcTionY = this.yPos - thing.Y;
			}
			this.AItimer = 0;
		}
	}
	this.AItimer++;
}

Enemy.prototype.destroy = function(){
	this.amAlive = false;
}