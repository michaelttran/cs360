var table;
var lowNode, highNode;
var nodeArr = [];

function preload() {

	// Variable to change what edges file to read
	// Usage: "data/edges0.csv"
	var fileLoc = "data/csvfiles/edges0.csv"
	table = loadTable(fileLoc, 'csv',
	'header');
}

function setup() {
	createCanvas(1500, 1500);
  	noSmooth();
  	background(255);

  	// Pick a number from within the set to make sure it exists
	lowNode = highNode = table.getNum(0,0); 

	csvTrav();

  	// Sorts all the known nodes from least to highest
  	nodeArr.sort(arrSortHelper);
  	
}

function csvTrav() {
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
}

/*
	Helper function to sort array of nodes since the built in sort function for JS only sorts by chars ie. 2 > 100
*/
function arrSortHelper(a, b) {
	return a - b;
}

function draw() {


}