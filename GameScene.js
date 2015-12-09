function GameScene(ctx){
	this.Levels = [];
	this.lvlBoxes = [
		{
			0 : {
				boxName : 'Item_Image1', //can add more here i.e box type e.g explosive/imovable etc;
				boxPosX : 800,
				bosPosY : 190
			},
			1 : {
				boxName : 'Item_Image1',
				boxPosX : 200,
				bosPosY : 130
			},
			2 : {
				boxName : 'Item_Image1',
				boxPosX : 375,
				bosPosY : 630
			},
			3 : {
				boxName : 'Item_Image1',
				boxPosX : 140,
				bosPosY : 500
			},
		},
		{
			0 : {
				boxName : 'Item_Image1', //can add more here i.e box type e.g explosive/imovable etc;
				boxPosX : 800,
				bosPosY : 190
			},
			1 : {
				boxName : 'Item_Image1',
				boxPosX : 200,
				bosPosY : 130
			},
			2 : {
				boxName : 'Item_Image1',
				boxPosX : 375,
				bosPosY : 630
			},
			3 : {
				boxName : 'Item_Image1',
				boxPosX : 140,
				bosPosY : 500
			},
		},
		{ 
			0 : {
				boxName : 'Item_Image1', //can add more here i.e box type e.g explosive/imovable etc;
				boxPosX : 800,
				bosPosY : 190
			},
			1 : {
				boxName : 'Item_Image1',
				boxPosX : 200,
				bosPosY : 130
			},
			2 : {
				boxName : 'Item_Image1',
				boxPosX : 375,
				bosPosY : 630
			},
			3 : {
				boxName : 'Item_Image1',
				boxPosX : 140,
				bosPosY : 500
			},
		},
	];
	this.scenes = [
		{
			map : 'first_room',
			numEnemy : 4,
			typeEnemy : 'Enemy_Image1',
			dimensionX : 2747,
			dimensionY : 719
		},
		{
			map : 'second_room',
			numEnemy : 4,
			typeEnemy : 'Enemy_Image2',
			dimensionX : 1400,
			dimensionY : 3680
		},
		{
			map : 'third_room',
			numEnemy : 4,
			typeEnemy : 'Enemy_Image2',
			dimensionX : 1219,
			dimensionY : 1763
		}
	];
	this.portals = [
		{
			X : 1140,
			Y : 420,
			S : 128,
			C : "#FF0000"
		},
		{
			X : 1150,
			Y : 450,
			S : 128,
			C : "#00FFFF"
		},
		{
			X : 90,
			Y : 65,
			S : 128,
			C : "#FF0000"
		},
		{
			X : 800,
			Y : 65,
			S : 128,
			C : "#000000"
		}
	];
	for(var i = 0; i < 3; i++){
		if(i == 2){
			this.Levels[i] = new Level(ctx, this.lvlBoxes[i], this.scenes[i], this.portals[i], i, this.portals[i+1]);
		}
		else{
			this.Levels[i] = new Level(ctx, this.lvlBoxes[i], this.scenes[i], this.portals[i], i);
		}
	}
	this.currentLevel  = 0;
	this.thenUpdate = 0;
	this.thenRender = 0;
	this.upDateAi = 0;
	this.over = false;
}


GameScene.prototype.update = function(e, ctx){
	if (this.thenUpdate + 5 < Date.now()){
		this.Levels[this.currentLevel].Plyrupdate(e);
		this.Levels[this.currentLevel].update(e);
		this.Levels[this.currentLevel].Collisions();
		this.Levels[this.currentLevel].checkWalls(ctx);
		this.Levels[this.currentLevel].openDoors();
		this.Levels[this.currentLevel].EnemyCollisions();
		this.Levels[this.currentLevel].enemyKill();
		this.Levels[this.currentLevel].AIUpdate();
		this.overLost = this.Levels[this.currentLevel].ifAnyofYouDotDotDot();
		this.thenUpdate = Date.now();
	}
	if (this.thenRender + 5 < Date.now()){
		this.Levels[this.currentLevel].render(ctx);
		this.thenRender = Date.now();
	}
	if(this.upDateAi + 55 < Date.now()){
		
		this.Levels[this.currentLevel].AiDisperse();
		this.upDateAi = Date.now();
	}
	if(this.Levels[this.currentLevel].portalTo() == true){
		this.doorAudio.play();
		if(this.currentLevel != 2){
			this.currentLevel++;
		}else{
			this.overWon =  true; 
		}
			
	}
}

GameScene.prototype.getLevel = function(){
	return this.currentLevel;
}

GameScene.prototype.getOverLost = function(){
	return this.overLost;
}
GameScene.prototype.getOverWon = function(){
	return this.overWon;
}
