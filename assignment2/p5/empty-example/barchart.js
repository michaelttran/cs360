var table;
// var x = 100, y = 100; 
// var values = [10, 20, 30, 40]; 
var values = []; // Array for the rates to be sized on the bar chart
var years = [];
var year = {}; // dictionary for year and rate
var y_lo = 0;
var y_high = 0;

function preload() {
//my table is comma separated value "csv“
// and has a header specifying the columns
// labels
table = loadTable('data/drugs.csv', 'csv',
'header');
}

function setup() {

    createCanvas(1000, 1000);

	// This will get all the years in the excel
	// var years = [];
	var c = 129; // y-coordinate of the years
	for(var r =0; r < table.getRowCount(); r++) {
		if(years.includes(table.getNum(r,c)) == false) {
			years.push(table.getNum(r,c));
		}
	}

	//print(years.toString());

	for(var i = 0; i < years.length; i++){
		year[years[i]] = 0;
	}

	// How to access its value
	// for(temp in year) {
	// 	print(year[temp]); 
	// }

	//Adds all the rates per year
	for( var r = 0; r < table.getRowCount(); r++) {
		var t_year = table.getNum(r, 129);
		var a_abuse_rate = table.getNum(r, 5);
		year[t_year] += a_abuse_rate;
	}

	// // How to access its value
	// for(value in year) {
	// 	print(year[value]); 
	// }

	// Rounds all values to ints
	var iter = 0;
	for( value in year) {
		year[value] = Math.round(year[value]);
		if( year[value] > y_high) {
			y_high = year[value];
		}
		values.push(year[value]);
	}

	// y_high = 953, rounding to 1000 for the biggest y-value
	// for(y in year) {
	// 	print(y);
	// }

	// Outputs contents of values
	for(temp in values) {
		print(values[temp]);
	}
	stroke(153);
  	line(100, 100, 100, 800);
  	line(100, 800, 800, 800);


}


function draw() {
  // put drawing code here	   

	background(255);
	for (var i = 0; i < values.length; i++) {
		rect(100 + 53 * i, 800, values[i] / 7, 100); 

		if(mouseX > 100 + 50 * i && 
			mouseY > 200 &&
			mouseX < 100 + 50 * i + values[i] && 
			mouseY < 200 + values[i])
		{
			text("Year: " + years[i] + " \n" + " Rate : " + values[i] + years[i], mouseX, mouseY); 
			
		}
	}

}