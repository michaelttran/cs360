var table;
var dict = {}; // Dictionary to hold all the nodes with each other, written shorthand

function preload() {

	// Variable to change what edges file to read
	// Usage: "data/edges0.csv"
	var file = 'data/edges0.csv'
	table = loadTable(file, 'csv',
	'header');
}
