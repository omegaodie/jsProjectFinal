function SAT(pos1, width1, height1, pos2, width2, height2){
	this.Asides = getObjectAxes(pos1, width1, height1);
	this.Bsides = getObjectAxes(pos2, width2, height2);
	
	
}

 function Vector(x, y) {
    this['x'] = x || 0;
    this['y'] = y || 0;
  }
  
  function getObjectAxes (pos, width, height) { // assume points are center of aabb 
  		
  		var leftRightSideAxis = new Vector(0, ((pos.y + (height/2) - (pos.y - (height/2)));
  		var topBottomSideAxis = new Vector(((pos.x + (width/2) - (pos.x - (width/2)));
  		return side {leftRightSideAxis, topBottomSideAxis}
  }
 