function levelLoader() {
	this.GameData = [];
	actual_JSON = '';
	loadJSON(function(response) {
  		// Parse JSON string into object
    	actual_JSON = response;
 	});
 	this.GameData = actual_JSON.split('$');
}

levelLoader.prototype.getResource = function(nameString) {
	for(k in this.GameData){	//fuck you javascript		
	testString =  this.GameData[k].substring(0, this.GameData[k].indexOf('&'));
		if(testString === nameString){
			return this.GameData[k].substring(this.GameData[k].indexOf('&') + 1);		
		}
	}
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', false); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }