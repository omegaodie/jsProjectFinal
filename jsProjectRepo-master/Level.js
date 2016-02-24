function Level(ctx, boxData, sceneData, portal, currentLvl, overkill){
	 this.player = new Player(ctx);
	 this.boxes = [];
	 this.scrollY;
	 //this.audio = new Audio(lvlLoader.getResource(sceneData.musicFile));
	 this.CL = currentLvl;
	 this.PortalActive = false;
	 this.BoxInDoor = false;
	 this.boxDone = [
	 	false,
	 	false,
	 	false,
	 	false
	 ];
	 this.enemyDone =  [
	 	false,
	 	false,
	 	false,
	 	false
	 ];
	 this.scrollX;
	 this.name = sceneData.map;
	 for(i = 0; i < 4; i++){
		 this.boxes[i] = new Item(boxData[i].boxName, boxData[i].boxPosX, boxData[i].bosPosY);
	 }
	 this.levelImage = new Image();
	 
	 this.Boss = new Boss({ X: 200, Y: 200, spriteID : sceneData.typeEnemy});
	 this.levelImage.src = lvlLoader.getResource(sceneData.map);
	 this.enemies = [];
	 for(i = 0; i < sceneData.numEnemy; i++){
	 	this.enemies[i] = new Enemy({ X: 150*(i + 3.14159), Y: 150*(i + 3.14159), spriteID : sceneData.typeEnemy});
	 }
	this.DimesnsionX = sceneData.dimensionX;
	this.DimesnsionY = sceneData.dimensionY;
	this.Portal = portal;
	if(this.CL == 2){
		this.secndPortal = overkill;
	}
	this.NextLevel = false;
	this.start = true;

}


Level.prototype.AIDispersal = function(){
	for(var t = 0; t < this.enemies.length; t++){
		var xd = this.enemies[t].sendPositionX();
		var yd = this.enemies[t].sendPositionY();
		for(i = 1; i < this.enemies.length; i++){
			if(this.enemyDone[i] == false && (t != i)){
				var eX = this.enemies[i].sendPositionX();
				var eY = this.enemies[i].sendPositionY();
				this.enemies[i].update();
				if((xd > eX - 32) && ( xd <  eX + 32)){
					if((yd > eY - 32) && (yd < eY + 32)){
						this.enemies[t].Disperse((eX - 31.4159), (eY + 31.4159));
						this.enemies[i].Disperse((xd + 31.4159), (yd - 31.4159));
					}
				}
			}

		}
	}	
}

Level.prototype.AIUpdate = function(){
	var zombieLunge = false;
	
	var xd = this.player.sendPositionX();
	var yd = this.player.sendPositionY();
	this.Boss.update();
	this.Boss.AI({playerinrange : zombieLunge, X : xd, Y :yd});
	for(i = 0; i < this.enemies.length; i++){
		if(this.enemyDone[i] == false){
			var eX = this.enemies[i].sendPositionX();
			var eY = this.enemies[i].sendPositionY();
			this.enemies[i].update();
			if((xd > eX - 96) && ( xd <  eX + 96)){
				if((yd > eY - 96) && (yd < eY + 96)){
					zombieLunge = true;
				}
			}
			this.enemies[i].AI({playerinrange : zombieLunge, X : xd, Y :yd});
		}
	}
}
Level.prototype.Plyrupdate = function(e){
	this.player.update(e);
}

Level.prototype.update = function(e){
	if((this.start == true) && (this.CL != 0)){
		//this.audio.load();
		this.start = false;
	}
	//this.audio.play();
	window.scrollTo(this.scrollX, this.scrollY);
	if(this.player.sendPositionY() > 500){
		this.scrollY = 1500;
	}else{
		this.scrollY = 0;
	}
	if(this.player.sendPositionX() > 500){
		this.scrollX = 650;
	}else{
		this.scrollX = 0;
	}
	for(i = 0; i < this.boxes.length; i++){
		this.boxes[i].update();
		this.enemies[i].drawUpdate();
	}
	this.Boss.drawUpdate();
}

Level.prototype.render = function(ctx){
	ctx.clearRect(0 , 0, 1280,1080);
	ctx.drawImage(this.levelImage, 0, 0, this.DimesnsionX, this.DimesnsionY, 0, 0, 1280, 1080);
	this.player.draw(ctx);
	for(i = 0; i < this.boxes.length; i++){
		this.boxes[i].render(ctx);
		this.enemies[i].draw(ctx);
	}
	this.Boss.draw(ctx);
	ctx.fillStyle=this.Portal.C;
	ctx.fillRect(this.Portal.X, this.Portal.Y,this.Portal.S,this.Portal.S);
	ctx.stroke();
}

Level.prototype.Collisions = function(){//i say putting the collision manager into the level class is a good idea
		///you may disagree....
		///but let me ask you something
		///how many libraries you see around here...
		/// yeah zactly.
	var pX = this.player.sendPositionX() + 16;
	var pY = this.player.sendPositionY() + 16;
	var mPie = 3.14159;
	for (var i = 0; i < this.boxes.length; i++){
		if(this.boxDone[i] == false){
			var bX = this.boxes[i].sendPositionX() + 64;
			var bY = this.boxes[i].sendPositionY() + 64;
			if((pX + 16 >= bX - 64 && pX - 16 <= bX + 64 && pY + 16 >= bY - 64 && pY -16 <= bY + 64)
				||(pX - 16 <= bX + 64 && pX + 16 >= bX - 64 && pY - 16 <= bY && pY - 16 >= bY - 64)){

				this.player.stop();
				var l_Thetax =  pX - bX;
				var l_Thetay =  pY - bY;
				var mTheta = Math.atan2(-l_Thetay, l_Thetax);
				if (mTheta < 0){
					mTheta += 2 * mPie;
				}
				mTheta = mTheta * (180 / mPie);
				if(mTheta >= 45 && mTheta <= 135){
					this.boxes[i].setDirect('down');
					this.boxes[i].setMove(bX, pY + 500);
				}else if(mTheta >= 136 && mTheta <= 225){
					this.boxes[i].setDirect('right');
					this.boxes[i].setMove(pX + 500, bY);
				}else if(mTheta >= 226 && mTheta <= 315){
					this.boxes[i].setDirect('up');
					this.boxes[i].setMove(bX, pY - 500);
				}else{
					this.boxes[i].setDirect('left');
					this.boxes[i].setMove(pX - 500, bY);
				}
			}
		}
	}
}
Level.prototype.checkWalls = function(){
		if((this.player.sendPositionX() < 0) || (this.player.sendPositionX() + 32 > 1280)){
			 this.player.stop();
		}
		if((this.player.sendPositionY() < 0) || (this.player.sendPositionY() + 32 > 1280)){
			 this.player.stop();
		}
		for(var i = 0; i < this.boxes.length; i++){
			{

				if(this.boxes[i].sendMove() == 'left'){
					if(this.boxes[i].sendPositionX()  < 70){
						this.boxes[i].Stop();
						this.boxes[i].setMove(90, this.boxes[i].sendPositionY());
					}
				}
				if(this.boxes[i].sendMove() == 'right'){
					if(this.boxes[i].sendPositionX()  > 1100){
						this.boxes[i].Stop();
						this.boxes[i].setMove(1130, this.boxes[i].sendPositionY());
					}
				}
				if(this.boxes[i].sendMove() == 'up'){
					if(this.boxes[i].sendPositionY() < 90){
						this.boxes[i].Stop();
						this.boxes[i].setMove(this.boxes[i].sendPositionX(), 80);
					}
				} 
				if(this.boxes[i].sendMove() == 'down'){
					if(this.boxes[i].sendPositionY() > 800){
						this.boxes[i].Stop();
						this.boxes[i].setMove(this.boxes[i].sendPositionX(), 800);
				}
			}
		}
	}
}


Level.prototype.sendName = function(){
	return this.name;
}


Level.prototype.portalTo = function(){
	if((this.player.sendPositionX() >= this.Portal.X) && (this.player.sendPositionX() <= this.Portal.X + this.Portal.S)){	
		if((this.player.sendPositionY() >= this.Portal.Y) && (this.player.sendPositionY() <= this.Portal.Y + this.Portal.S)){
			if(this.NextLevel == false && this.BoxInDoor == true){
					this.NextLevel = true;
					//this.audio.pause();
					return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		return false;
	}
}

Level.prototype.ifAnyofYouDotDotDot =  function(){
	for(i = 0; i < 4; i++){
		if(this.enemyDone[i] == true){
			return true;
		}
	}
	return false;
}


Level.prototype.enemyKill = function(){
	var px = this.player.sendPositionX();
	var py = this.player.sendPositionY();
	for(g = 0; g < 4; g++){
		var ex = this.enemies[g].sendPositionX();
		var ey = this.enemies[g].sendPositionY();
		if((((px + 32) > ex) && (px <  (ex + 32))) || (((px - 32) > ex) && ((px <  ex - 32)))){
			if((((py + 32) > ey) && (py < (ey + 32))) 
				||(((py - 32) > ey) && (py <  (ey - 32)))){
				 this.enemyDone[g] = true;
			}
		}
	}
}

Level.prototype.openDoors = function(){
	for(var i = 0; i < this.boxes.length; i++){
		if(this.boxDone[i] == false){
			if((this.boxes[i].sendPositionX() + 128 > this.Portal.X) && (this.boxes[i].sendPositionX() < this.Portal.X + 128)){
				if((this.boxes[i].sendPositionY() + 128 > this.Portal.Y) && (this.boxes[i].sendPositionY() < this.Portal.Y + 128)){
					this.BoxInDoor = true;
					this.boxDone[i] = true;
					this.boxes[i].destroy();
				}
				else{
					this.BoxInDoor = false;
				}
			}else{
					this.BoxInDoor = false;
			}
		}
	}
}

Level.prototype.EnemyCollisions = function(){
	var mPie = 3.14159;
	for(g = 0; g < 4; g++){
		var pX = this.enemies[g].sendPositionX() + 16;
		var pY = this.enemies[g].sendPositionY() + 16;
		for(q = 0; q < 4; q++){
			if(this.boxDone[q] == false){
				if(this.boxes[q].sendMove() != 'none'){
				var bX = this.boxes[q].sendPositionX() + 64;
				var bY = this.boxes[q].sendPositionY() + 64;
				if((pX + 16 >= bX - 64 && pX - 16 <= bX + 64 && pY + 16 >= bY - 64 && pY -16 <= bY + 64)
				||(pX - 16 <= bX + 64 && pX + 16 >= bX - 64 && pY - 16 <= bY && pY - 16 >= bY - 64)){
					if(this.CL == 0){
						this.boxes[q].Stop();
					}
					if(this.CL == 1){
						var l_Thetax =  pX - bX;
						var l_Thetay =  pY - bY;
						var mTheta = Math.atan2(-l_Thetay, l_Thetax);
						if (mTheta < 0){
							mTheta += 2 * mPie;
						}
						mTheta = mTheta * (180 / mPie);
						if(mTheta >= 45 && mTheta <= 135){
							this.boxes[q].setDirect('down');
							this.boxes[q].setMove(bX, pY + 500);
						}else if(mTheta >= 136 && mTheta <= 225){
							this.boxes[q].setDirect('right');
							this.boxes[q].setMove(pX + 500, bY);
						}else if(mTheta >= 226 && mTheta <= 315){
							this.boxes[q].setDirect('up');
							this.boxes[q].setMove(bX, pY - 500);
						}else{
							this.boxes[q].setDirect('left');
							this.boxes[q].setMove(pX - 500, bY);
						}
					}
					if(this.CL == 2){
						this.boxes[q].destroy();
						this.enemyDone[q] = true;
					}
				}
			}
			}
		}
	}
}
