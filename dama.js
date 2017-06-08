window.onload = function() {
	buildTab();
	initPlayersPieces();
	addEventListeners();
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

function cellClicked(cell) {
	alert("x = " + cell.cellIndex + ", y = " + cell.parentNode.rowIndex );
}