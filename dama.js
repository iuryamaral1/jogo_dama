window.onload = function() {
	buildTab();
	initPlayersPieces();
	addEventListeners();
	initScore();
}


function initScore() {
	document.getElementById("pontuacaoVermelho").innerHTML = 0;
	document.getElementById("pontuacaoAmarelo").innerHTML = 0;
}

function buildTab() {
	var table = document.createElement("table");
	table.setAttribute("cellpadding", "25");
	table.setAttribute("border", "1");
	table.setAttribute("cellspacing", "0");


	for(var i = 0; i < 10; i++) {

		var tr = document.createElement("tr");

		for(var j = 0; j < 10; j++) {

			var td = document.createElement("td");
			tr.appendChild(td);

		}

		table.appendChild(tr);
		document.body.appendChild(table);
	}
}

function initPlayersPieces() {
	var table = document.getElementsByTagName("table")[0];

	for(var i = 0; i < table.rows.length; i++) {
		var tr = table.rows[i];

		for(var j = 0; j < tr.cells.length; j++) {
			var td = tr.cells[j];
			if(i < 4) {
				if(i%2 == 0) {
					if(j%2 == 0) {
						td.setAttribute("bgColor", "red");
					}
				} else {
					if(j%2 != 0) {
						td.setAttribute("bgColor", "red");
					}
				}	
			} else {
				if(i >=6) {
					if(i%2 == 0) {
						if(j%2 == 0) {
							td.setAttribute("bgColor", "yellow");
						}
					} else {
						if(i%2 != 0) {
							if(j%2 != 0) {
								td.setAttribute("bgColor", "yellow");
							}
						}
					}
				}
			}
		}
	}
}

function addEventListeners() {
	var table = document.getElementsByTagName("table")[0];

	for(var i = 0; i < table.rows.length; i++) {

		var tr = table.rows[i];

		for(var j = 0; j < tr.cells.length; j++) {

			var td = tr.cells[j];
			td.onclick = function() {
				cellClicked(this);
			}
		}
	}
}

var click = 0;
var cellAnterior;

function cellClicked(cell) {
	
	if(cell.getAttribute("bgColor") === "red" || cell.getAttribute("bgColor") === "yellow" || cell.getAttribute("bgColor") === "green") {
			if(click == 0) {
				calcPossibilities(cell);	
				cellAnterior = cell;
				click =1;
			} else {
				
				if(isNeighbor(cellAnterior, cell)){
					if(isEnemy(cellAnterior, cell)) {
						updateScore(cellAnterior);
						move(cellAnterior, cell);
					} else {
						if(!hasPiece(cell)) {
							move(cellAnterior, cell);	
						}
					} 
				}
				
				click =0;
				cleanPossibilities();
			}	
	}
	
}

function updateScore(cell) {
	if(cell.getAttribute("bgColor") === "red") {
		var points = document.getElementById("pontuacaoVermelho").innerHTML;
		points++;
		document.getElementById("pontuacaoVermelho").innerHTML = points;
	} 
	if(cell.getAttribute("bgColor") === "yellow"){
		var points = document.getElementById("pontuacaoAmarelo").innerHTML;
		points++;
		document.getElementById("pontuacaoAmarelo").innerHTML = points;
	}
}

function move(cellAnterior, cell) {
	cell.setAttribute("bgColor", cellAnterior.getAttribute("bgColor"));
	cellAnterior.removeAttribute("bgColor");
}

function isEnemy(cellAnterior, cell) { 
	
	var enemy = false;
	
	if(cell.getAttribute("bgColor") != null && cell.getAttribute("bgColor") != "") {
		if(cell.getAttribute("bgColor") != "green") {
			if(cell.getAttribute("bgColor") != cellAnterior.getAttribute("bgColor")) {
				enemy = true;	
			}
		}
	}

	return enemy;
}

function cleanPossibilities() {
	var table = document.getElementsByTagName("table")[0];
	
	for(var i = 0; i < table.rows.length; i++) {
		var tr = table.rows[i];
		
		for(var j = 0; j < tr.cells.length; j++) {
			
			var td = tr.cells[j];
			if(td.getAttribute("bgColor") === "green") {
				td.removeAttribute("bgColor");
			}
		}
	}
}

function isNeighbor(cellAnterior, cell) {
	
	var neighbor = false;
	
	var xAnterior = cellAnterior.cellIndex;
	var yAnterior = cellAnterior.parentNode.rowIndex;
	
	var x = cell.cellIndex;
	var y = cell.parentNode.rowIndex;
	
	if(!(Math.abs(xAnterior - x) <= 1 && Math.abs(yAnterior - y) <= 1)) {
		alert("You can't move to this place");
	} else {
		neighbor = true;
	} 
	
	return neighbor;	
}

function paintPossibility(pos1, pos2) {
	var table = document.getElementsByTagName("table")[0];

	var tr = table.rows[pos1];
	var td = tr.cells[pos2];
	if(!hasPiece(td)) {
		td.setAttribute("bgColor", "green");	
	} else {
		if(isEnemy()) {

		}
	}
}

function calcPossibilities(cell) {
	var x = cell.cellIndex;
	var y = cell.parentNode.rowIndex;
	
	var table = document.getElementsByTagName("table")[0];
	
	if(cell.getAttribute("bgColor") === "red" || cell.getAttribute("bgColor") === "yellow") {
			//norte
			if(y - 1 >= 0) {
				paintPossibility(y-1, x, cell);
			} 
			
			//nordeste
			if((y - 1 < 10) && (x - 1 >=0) ) {
				paintPossibility(y-1, x-1, cell);
			} 

			//noroeste
			if( (y - 1 >=0) && (x + 1 < 10) ) {
				paintPossibility(y-1, x+1, cell);
			}

			//sul
			if(y + 1 < 10) {
				paintPossibility(y+1, x, cell);
			}

			//sudeste
			if((y + 1 < 10) && (x - 1 >= 0)) {
				paintPossibility(y+1, x-1);
			}
			
			//sudoeste
			if((y + 1 < 10) && (x + 1 < 10)) {
				paintPossibility(y+1, x+1);
			}

			//leste
			if(x - 1 >= 0) {
				paintPossibility(y, x-1);	
			}
			
			//oeste
			if(x + 1 < 10) {
				paintPossibility(y, x+1);
			}
	}
}

function hasPiece(td) {
	return (td.getAttribute("bgColor") === "red" || td.getAttribute("bgColor") === "yellow");
}

function moveThroughEnemy() {

}