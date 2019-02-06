/******************************
 * Created by Hans Dulimarta
 * Edited by Anthony Sciarini
 *****************************/

/*******************************************************************************
 * Given the ID of a node {rootId}, find all its descendant elements having
 * its attribute id set and then change their class to {klazName}.
 * The function returns the number of such elements found.
 *
 * @param rootId    the ID of the "root" element to begin searching
 * @param klazName  the class to assign to each descendant whose id attrib 
 *                  is set.
 * @returns {number}
 ********************************************************************************/
function findElementsWithId(rootId, klazName) {
	//Element used to print various contents of the variables to help debug the program.
	var stdout = document.getElementById("stdout");
	stdout.innerHTML = "<b>Sanity Check</b>";

	//Grab the root element.
	var rootElement   = document.getElementById(rootId);

	//Grab all of the children of the root element that have a id attribute set.
	var children      = rootElement.querySelectorAll("[id]");

	//Make a child a member of the klazName class.
	var i;
	for(i=0; i < children.length; i++){
		children[0].setAttribute("class",klazName);	
	}
	
	//Return the number of children.
	return children.length;
}

/********************************************************************************
 * The following function finds all elements with attribute 'data-gv-row' (or
 * 'data-gv-column') and create a table of the desired dimension as a child of
 * the element.
 *
 * @returns NONE
 ********************************************************************************/
function createTable() {
	//Initialize var
	var stdout    = document.querySelector("div.stdout");
	var table_div = document.querySelector("div.table-home"); 
	const lips    = new LoremIpsum(); 
	var table = document.createElement("table");	

	//Grab column and row numbers
	var rNum = table_div.getAttribute("data-gv-row");
	var cNum = table_div.getAttribute("data-gv-column");

	//Print program
	console.log(cNum);
	console.log(rNum);

	//Generate table
	var i;
	var j;
	for(i=0;i<rNum;i++){
		var row = document.createElement("tr");
		for(j=0; j<cNum; j++){
			//Create header
			if (i == 0){
				var header = document.createElement("th");
				header.innerHTML = "Heading " + (j+1);
				row.appendChild(header);
			}
			//Create cell
			else{
				var cell = document.createElement("td");
				cell.innerHTML=lips.generate(3);
				row.appendChild(cell);
			}
		}
		table.appendChild(row);
	}

	//Append table to table div
	table_div.appendChild(table);
}

function verifyTable(numRow, numCol) {
	  var resultDiv = document.getElementById("result");
	  var pass = document.querySelector("#result > div:nth-child(1)");
	  var fail = document.querySelector("#result > div:nth-child(2)");
	  var rows = document.querySelectorAll("div.table-home  tr");
	  if (rows.length != numRow) {
		      fail.className = 'shown';
		      resultDiv.className = 'fail';
		      console.log("rows.length = " + rows.length);
		      console.log("numRow + 1 = " + (numRow + 1));
		      console.log("Fail 1");
		      return;
		    }
	  rows.forEach((row,r) => {
		      var cells = row.querySelectorAll("td");
		      if (cells.length != numCol) {
			            fail.className = 'shown';
			            resultDiv.className = 'fail';
			            console.log("fail 2");
			            return;
			          }
		    });
	  pass.className = "shown";
	  fail.className = "hidden";
	  resultDiv.className = 'success';
}
