var table;
var years = [];
var year_rate = {};
var x_val = [];
var y_val = [];


function preload() {
//my table is comma separated value "csv“
// and has a header specifying the columns
// labels
table = loadTable('data/drugs.csv', 'csv',
'header');
}

function setup() {
	createCanvas(1500, 1500);
  	noSmooth();
  	background(0);
  	var title = "Alcohol rates between ages 18 - 25 per year";
	fill(255);
	text(title, 350, 100, 1000, 1000);
	// This will get all the years in the excel
	// var years = [];
	var c = 129; // y-coordinate of the years
	for(var r =0; r < table.getRowCount(); r++) {
		if(years.includes(table.getNum(r,c)) == false) {
			years.push(table.getNum(r,c));
		}
	}

	// print(x_val.toString());
	for(var i = 0; i < years.length; i++){
		year[years[i]] = 0;
	}
	//Adds all the rates per year
	for( var r = 0; r < table.getRowCount(); r++) {
		var t_year = table.getNum(r, 129);
		var a_abuse_rate = table.getNum(r, 5);
		year[t_year] += a_abuse_rate;
	}


	stroke(153);
	line(100, 100, 100, 900);
	line(100, 900, 1000, 900);

	var j = 0;
	for(var i = 200; i <= 993; i += 61){
		stroke(255);
		point(i, year[years[j]] - 100);
		x_val.push(i);
		y_val.push(year[years[j]] - 100);
		j++;
	}

	// scale for the y axis
	var y_scale = 0;
	for( var y = 900; y > 100; y -= 100) {
		stroke(255);
		line(75, y, 125, y);
		text(y_scale, 25, y - 5, 70, 70);
		y_scale += 100
	}

	// scale for the x axis
	var yr = 2002;
	var year_hold;
	for( var x = 200; x < 980; x += 61) {
		stroke(255);
		line(x, 875, x, 925);
		year_hold = year[yr];
		
		text(yr, x - 13, 930, 25, 25);
		if(yr < 2014) {
			yr++;
		}
	}

	//Connect the dots
	for(var i = 0; i < x_val.length; i++) {
		stroke(255);
		line(x_val[i], y_val[i], x_val[i+1], y_val[i+1]);
	}

	var y_cat = "Year";
	fill(255);
	text(y_cat, 550, 975, 1000, 1000);

	var x_cat = "Rates";
	fill(255);
	text(x_cat, 25, 150, 1000, 1000);
}

function draw() {
	for(var i = 0; i < x_val.length; i++) {
		var distance = dist(x_val[i], y_val[i], mouseX, mouseY);
		if( distance < 10) {
			text("Year: " + year[i] + " Rate: " + year_rate[i], mouseX, mouseY);

			//text("Year: " + years[i] + " \n" + " Rate : " + values[i] + years[i], mouseX, mouseY); 
		}
	}

}
	
