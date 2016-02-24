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
			musicFile : 'mm_LvlOneTrack',
			dimensionX : 2747,
			dimensionY : 719
		},
		{
			map : 'second_room',
			numEnemy : 4,
			typeEnemy : 'Enemy_Image2',
			musicFile : 'mm_LvlTwoTrack',
			dimensionX : 1400,
			dimensionY : 3680
		},
		{
			map : 'third_room',
			numEnemy : 4,
			typeEnemy : 'Enemy_Image2',
			musicFile : 'mm_LvlThreeTrack',
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
			X : 500,
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
	this.overLost = false;
	this.overWon = false;

}


GameScene.prototype.update = function(e, ctx){
	if (this.thenUpdate + 2 < Date.now()){
		this.Levels[this.currentLevel].Plyrupdate(e);
		this.Levels[this.currentLevel].update(e);
		this.Levels[this.currentLevel].Collisions();
		this.Levels[this.currentLevel].checkWalls(ctx);
		this.Levels[this.currentLevel].openDoors();
		this.Levels[this.currentLevel].EnemyCollisions();
		this.Levels[this.currentLevel].enemyKill();
		this.overLost = this.Levels[this.currentLevel].ifAnyofYouDotDotDot();
		this.thenUpdate = Date.now();
	}
	if (this.thenRender + 8 < Date.now()){
		this.Levels[this.currentLevel].render(ctx);
		this.Levels[this.currentLevel].AIUpdate();
		this.thenRender = Date.now();
	}
	if(this.upDateAi + 70 < Date.now()){
		this.Levels[this.currentLevel].AIDispersal();
		this.upDateAi = Date.now();
	}
	if(this.Levels[this.currentLevel].portalTo() == true){
		if(this.currentLevel == 2){
			this.overWon = true;
		}
			this.currentLevel++;
	}
}

GameScene.prototype.getOverL = function(){
	return this.overLost;
}
GameScene.prototype.getOverW = function(){
	return this.overWon;
}