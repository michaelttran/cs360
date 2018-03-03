var table;
var node = []; // Node values
var nodeArr = []; // All the nodes
var edges = [];
var size;
var area;
var dX, dY; // delta x,y
var k;

function preload() {
  // Variable to change what .edges file to read
  // Usage: "data/csvfiles/edgesNumber.csv": I reversed edges and the title number to conform to variable rules
  var fileLoc = "data/csvfiles/edges698.csv";
  table = loadTable(fileLoc, 'csv',
  'header');
}

function setup() {
  // Canvas is the entire screen on the browser
  createCanvas(2000, 2000);
  size = 1000;
  nodeClean();
}

function nodeClean() {
  // Runs through csv to find nodes and saves to array
  for(var i = 0; i < table.getRowCount(); i++) {
    for(var j = 0; j < table.getColumnCount(); j++) {
      if(!node.includes(table.getString(i, j))) {
        append(node, table.getString(i, j));
      }
    }
    append(edges, 
    {node1: table.getString(i, 0), node2: table.getString(i, 1)
    });
  }

  // Switched to strings because built in sort sorts by char, saves one extra function
  node = sort(node, node.length);

  for(var i = 0; i < node.length; i++) {
    nodeArr[i] = {nodeId: node[i], 
    x_val: (Math.random() - .5) * size, 
    y_val: (Math.random() - .5) * size, 
    disp_x: 0, 
    disp_y: 0
    };
  }
}

/*
  Calculates repulsive forces
*/
function calcRepul() {
  for(var i = 0; i < nodeArr.length; i++) {
    nodeArr[i].disp_x = 0;
    nodeArr[i].disp_y = 0;

    for(var j = 0; j < nodeArr.length; j++) {
      if(j != i) {
        dX = nodeArr[i].x_val - nodeArr[j].x_val;
        dY = nodeArr[i].y_val - nodeArr[j].y_val;

        nodeArr[i].disp_x = nodeArr[i].disp_x + (dX / abs(dX)) * (sq(k) / abs(dX));
        nodeArr[i].disp_y = nodeArr[i].disp_y + (dY / abs(dY)) * (sq(k) / abs(dY));
      }
    }
  }
}

/*
  Calculates attractive forces
*/
function calcAttr() {
  for(var j = 0; j < edges.length; j++) {
    v = nodeArr[node.indexOf(edges[j].node1)];
    u = nodeArr[node.indexOf(edges[j].node2)];

    dX = v.x_val - u.x_val;
    dY = v.y_val - u.y_val;

    nodeArr[node.indexOf(edges[j].node1)].disp_x = v.disp_x - (dX / abs(dX)) * (sq(dX) / k);
    nodeArr[node.indexOf(edges[j].node1)].disp_y = v.disp_y - (dY / abs(dY)) * (sq(dY) / k);

    nodeArr[node.indexOf(edges[j].node2)].disp_x = u.disp_x + (dX / abs(dX)) * (sq(dX) / k);
    nodeArr[node.indexOf(edges[j].node2)].disp_y = u.disp_y + (dY / abs(dY)) * (sq(dY) / k);
  }
}

/*
  Limit max displacement to value and prevents displacing outside of frame
*/
function limit() {
  for(var j = 0; j < nodeArr.length; j++) {
    if (nodeArr[j].dispX != 0) {
      nodeArr[j].x_val = nodeArr[j].x_val + (nodeArr[j].disp_x / abs(nodeArr[j].disp_x));
    }
    if (nodeArr[j].disp_y != 0) {
      nodeArr[j].y_val = nodeArr[j].y_val + (nodeArr[j].disp_y / abs(nodeArr[j].disp_y));
    }

    nodeArr[j].x_val = min(size / 2, max(-1 * (size / 2), nodeArr[j].x_val));
    nodeArr[j].y_val = min(size / 2, max(-1 * (size / 2), nodeArr[j].y_val));
  }
}

function draw() {
  background(255);
  textSize(32);

  // Title
  fill(0);  
  var title = "Forced graph representation of friends";
  text(title, 0, 0, 1000, 1000);

  fill(255);
  noStroke();
  
  area = size * size * 2;
  k = sqrt(area / nodeArr.length);

  for(var i = 0; i < 20; i++) {
    calcRepul();
    calcAttr();
    limit();
  }  

  // Draws the nodes as well as implementing interactivity feature
  for(var i = 0; i < nodeArr.length; i++) {
    // Implement highlight feature
    if(dist(mouseX, mouseY, (size / 2) + nodeArr[i].x_val, (size / 2) + nodeArr[i].y_val) < 5) {
      fill(255, 204, 0);
      text("Node: " + nodeArr[i].nodeId, size / 2, size / 10);
    } else {
      fill(0);
    }
    ellipse((size / 2) + nodeArr[i].x_val, (size / 2) + nodeArr[i].y_val, 15);
  }

  // Draws edges to the vertices 
  for(var i = 0; i < edges.length; i++) {
    v = nodeArr[node.indexOf(edges[i].node1)];
    u = nodeArr[node.indexOf(edges[i].node2)];

    if(dist(mouseX, mouseY, (size / 2) + v.x_val, (size / 2) + v.y_val) < 5) {
      stroke(255, 204, 0);
    } else if(dist(mouseX, mouseY, (size / 2) + u.x_val, (size / 2) + u.y_val) < 5) {
      stroke(255, 204, 0);
    } else {
      stroke(128, 128, 128);
    }
    line(v.x_val + (size / 2), v.y_val + (size / 2), u.x_val + (size / 2), u.y_val + (size / 2));
  }
}