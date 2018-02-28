var table;
var y_high = 0;
var x_high = 0;
var years = [];

function preload() {
//my table is comma separated value "csv“
// and has a header specifying the columns
// labels
table = loadTable('data/drugs.csv', 'csv',
'header');
}

function setup() {
	createCanvas(1500,1500);

	// To find the high for the y-axis: 3.24, rounded = 3
	for( var r = 0; r < table.getRowCount(); r++) {
		if(table.getNum(r, 30) > y_high) {
			y_high = Math.round(table.getNum(r, 30));
		}
	}
	//print(y_high);

	// To find the high for the x-axis: 11.21, rounded = 11
	for( var x = 0; x < table.getRowCount(); x++) {
		if(table.getNum(x, 4) > x_high) {
			x_high = Math.round(table.getNum(x, 4));
		}
 	}
 	//print(x_high);

 	// Lines for the axes
 	stroke(153);
	line(100, 100, 100, 1000);
	line(100, 1000, 1000, 1000);

	// scale for the y axis
	var y_scale = y_high / 10;
	var y_axis = 0;
	for( var y = 1000; y >= 81; y -= 81) {
		stroke(0);
		line(75, y, 125, y);
		text((y_axis).toFixed(2) , 25, y - 3, 70, 70);
		y_axis += y_scale;
	}

	// scale for the x axis
	var year = 2002;
	for( var x = 166; x < 1000; x += 66) {
		stroke(0);
		line(x, 975, x, 1025);
		text(year , x - 10, 1025, 70, 70);
		year++;
	}

	//Plot the points
	// for( var r = 0; r < table.getRowCount(); r++) {
	// 	if(table.get(r, 130) )
	// }


	//Plot the points
	// var place_year = 129;
	var year_p = [];
	var temp_y = 2002;
	for(var i = 264; i <= 990; i += 66) {
		year_p.push([temp_y, i]);
		temp_y++;
	}

	// Iterating through a 2d arrray
	// for( var i = 0; i < year_p.length; i++) {
	// 	for(var j = 0; j < year_p[i].length; j++) {
	// 		print(year_p[i][j]);
	// 	}	
	// }


	var year_count = 2002;
	var pg = 0;
	print(table.getRowCount());
	for( var m = 0; m < table.getRowCount(); m++) {
		print(table.getNum(m, 129));
		if(table.getNum(m, 129) == year_count) {
			stroke(0);
			point(pg, table.getNum(m, 4));
		}
		if(table.getNum(m+1, 129) != year_count) {
			year_count++;
			pg += 66;
		}
	}
	


	
}

function draw() {

}