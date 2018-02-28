var table;
var lowNode, highNode;
var nodeArr = [];
var increAmount; // How much to increase each tick on the axis by

function preload() {
	// Variable to change what .edges file to read
	// Usage: "data/csvfiles/edgesNumber.csv": I reversed edges and the title number to conform to variable rules
	var fileLoc = "data/csvfiles/edgesTest.csv"
	table = loadTable(fileLoc, 'csv',
	'header');
}

function setup() {
	// Canvas is the entire screen on the browser
	createCanvas(1000, 1000); 
  	noSmooth();

  	// Pick a number from within the set to make sure it exists
	lowNode = highNode = table.getNum(0,0); 

	nodeClean(); 

	// Round by two decimal places because of subdividing area leaking onto box perimeter
	increAmount = Math.round((800 / nodeArr.length) * 100) / 100;
	// print(increAmount);
  	
}

/*
	Traverses the csv file to check for lowest and highest node value. 
	Checks for non-repeating nodes naturally and adds to a total nodes array 
	so that an x and y axis can be accurately made.
*/
function nodeClean() {
	// Runs through the csv file to find the lowest and highest value nodes
  	for(var i = 0; i < table.getRowCount(); i++) {
  		for(var j = 0; j < table.getColumnCount(); j++) {
  			if(table.getNum(i, j) < lowNode) {
  				lowNode = table.getNum(i, j);
  			}
  			if(table.getNum(i,j) > highNode) {
  				highNode = table.getNum(i, j);
  			}

  			// If the array of nodes doesn't have a node from the csv file, add it 
  			if(!nodeArr.includes(table.getNum(i, j))) {
  				nodeArr.push(table.getNum(i, j));
  			}
  		}

  	}

  	// Sorts all the known nodes from least to highest
  	nodeArr.sort(arrSortHelper);
}

/*
	Helper function to sort array of nodes since the built in sort function for JS only sorts by chars ie. 2 > 100
*/
function arrSortHelper(a, b) {
	return a - b;
}

function draw() {
	background(255);

	// Lines for the axis- goes left, up, right, down
	line(75, 65, 75, 865);
    line(75, 65, 875, 65);
    line(875, 65, 875, 865);
    line(75, 865, 875, 865);
    
    // Lines for the y axis/columns
    for(var i = 75; i <= 875; i += increAmount) {
    	line(i, 865, i, 65);
    }
    
    // Lines for the x axis/rows
    for(var i = 65; i <= 865; i += increAmount) {
    	line(75, i, 875, i);
    }

    // Printing each node on the axes
    for(var i = 0; i < nodeArr.length; i++) {
    
    }


}