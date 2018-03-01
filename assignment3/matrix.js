var table;
var lowNode, highNode;
var nodeArr = [];
var increAmount; // How much to increase each tick on the axis by
var xAxisMid = []; // To value of the middle coordinate between two axis points: Labeling of node on axes
var yAxisMid = [];
var nodeAddr = []; // Dictionary to map nodes to a sequence of numbers, representing x or y axis
var matrxCntr = [];

/*
Pseudo javascript dictionary	
	nodeAddr.push({
		key:
		value: 
})
*/

function preload() {
	// Variable to change what .edges file to read
	// Usage: "data/csvfiles/edgesNumber.csv": I reversed edges and the title number to conform to variable rules
	var fileLoc = "data/csvfiles/edges698.csv"
	table = loadTable(fileLoc, 'csv',
	'header');
}

function setup() {
	// Canvas is the entire screen on the browser
	createCanvas(2000, 2000); 
  	noSmooth();

  	// Pick a number from within the set to make sure it exists
	lowNode = highNode = table.getNum(0,0); 

	nodeClean(); 

	// Round by two decimal places because of subdividing area leaking onto box perimeter
	increAmount = twoDecRound((1500 / nodeArr.length));
	// print(increAmount);
  	
  	// Finds middle of all the points on the axes
  	findXMid();
  	findYMid();

  	for(var i = 0; i < nodeArr.length; i++) {
  		nodeAddr.push({
  			key: nodeArr[i],
  			value: i
  		});
  	}

  	// To print the entire dictionary out
  	print(nodeAddr); 
    var midIncre = increAmount / 2;
    var totalSquare = Math.pow(nodeArr.length, 2); // Total squares in the matrix

    var test_c = 0;
    var midXCount = 0; 
    var midYCount = 0; 
    for(var i = (65 + midIncre); i <= 1565; i += midIncre) {
      for(var j = (75 + midIncre); j <= 1575; j += midIncre) {
        if(midXCount % 2 == 0 && midYCount % 2 == 0) {
          // print(j, i);
          test_c++;
        }
        if(j >= (1575 - midIncre)) {
          midXCount = 0;
        } else {
          midXCount++;          
        }
      }

      if(i >= (1565 - midIncre)) {
        midYCount = 0;
      } else {
        midYCount++;
      }
    }

    print(test_c);

  	
}

function findXMid() {
	var midX, mask;
    for(var i = 65; i <= 1565; i += increAmount) {
    	// If it's past the first iteration
    	if(i > 65) {
    		mask = i;
    		midX = (mask + (mask -= increAmount)) / 2;
			 xAxisMid.push(midX);  
    	}
    }
}

function findYMid() {
	var midY, mask;
    for(var i = 75; i <= 1575; i += increAmount) {
    	// If it's past the first iteration
    	if(i > 75) {
    		mask = i;
    		midY = (mask + (mask -= increAmount)) / 2;
			yAxisMid.push(midY - 8);
    	}
    }
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

/*
	Function to help round values to two decimal places
*/
function twoDecRound(a) {
	return Math.round((a * 100) / 100);
}

function draw() {
	background(255);

	// Lines for the axis- goes left, up, right, down
    line(75, 65, 75, 1565);
    line(75, 65, 1575, 65);
    line(1575, 65, 1575, 1565);
    line(75, 1565, 1575, 1565);
    
    // Lines for the y axis/columns
    for(var i = 75; i <= 1575; i += increAmount) {
    	line(i, 1565, i, 65);
    }
    
    // Lines for the x axis/rows
    for(var i = 65; i <= 1565; i += increAmount) {
    	line(75, i, 1575, i);
    }

    // Printing each node on the x axis
 	  var xCount = 0;
    for(var i = 0; i < nodeArr.length; i++) {
    	text(nodeArr[i], xAxisMid[xCount], 40, 100, 100);
    	xCount++;
    }

    // Printing each node on the y axis
  	var yCount = 0;
    for(var i = 0; i < nodeArr.length; i++) {
    	text(nodeArr[i], 50, yAxisMid[yCount] - 10, 100, 100);
    	yCount++;
    }

    // Label of the x axis
   	var y_cat = "Nodes";
  	text(y_cat, 30, 10, 1000, 1000);

  	// Label of the y axis
  	var x_cat = "Nodes";
  	text(x_cat, 5, 60, 1000, 1000);

	// Fill in boxes where nodes have an edge

	// Implement highlight feature


}