var GameData, loaded;
function levelLoader() {
	loadJSON(function(response) {
  		// Parse JSON string into object
		GameData = JSON.parse(response);
		console.log(GameData);
		loaded = true;
 	});
}

levelLoader.prototype.getResource = function(nameString) {
	return GameData[nameString].t;
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onload = function () {
            callback(xobj.responseText);
    };
    xobj.send(null);  
 }