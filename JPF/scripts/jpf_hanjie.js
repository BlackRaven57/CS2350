"use strict";

window.onload = init;
var puzzleCells;
var cellBackground;

function init() {
   // Insert title for the first puzzle
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
   // Insert html code for first puzzle
   document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);

   // Add event handlers for puzzle buttons
   var puzzleButtons = document.getElementsByClassName("puzzles");
   for (var i = 0; i < puzzleButtons.length; i++) {
      puzzleButtons[i].onclick = swapPuzzle;
   }
   setupPuzzle();

   // Add event listener for mouseup
   document.addEventListener("mouseup", endBackground);
   // Add solution event listener
   document.getElementById("solve").addEventListener("click",
      function () {for (var i = 0; i < puzzleCells.length; i++) {puzzleCells[i].style.backgroundColor = "";} });
}

function swapPuzzle (e) {
   if (confirm("You will lose all of your work on the puzzle. Continue?")) {
      var puzzleId = e.target.id;
      var puzzleTitle = e.target.value;
      document.getElementById("puzzleTitle").innerHTML = puzzleTitle;
      switch (puzzleId) {
         case "puzzle1" :
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
            break;
         case "puzzle2" :
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
            break;
         case "puzzle3" :
            document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
            break;
      }
      setupPuzzle();
   }
}

function setupPuzzle() {
   // Match all cells in the puzzle
   puzzleCells = document.querySelectorAll("table#hanjieGrid td");
   // Set initial color
   for (var i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";  

      // Set cell color in response to clicking
      puzzleCells[i].onmousedown = setBackground;

      // Pencil for cursor
      puzzleCells[i].style.cursor = "url(images/jpf_pencil.png), pointer";
   }   

   // Check for solution
   document.getElementById("hangjieGrid").addEventListener("mouseup", 
      function() {
         var solved = true;
         for (var i = 0; i < puzzleCells.length; i++) {
            if ((puzzleCells[i].className === "filled" && puzzleCells[i].style.backgroundColor !== "rgb(101, 101, 101)")
               || (puzzleCells[i].className === "empty" && puzzleCells[i].style.backgroundColor === "rgb(101, 101, 101)")) {
                  solved = false;
                  break;
               }
         }
         if (solved) alert("You solved the puzzle");
      });

   // Object collection of filled and empty cells
   var filled = document.querySelectorAll("table#hanjieGrid td.filled");
   var empty = document.querySelectorAll("table#hanjieGrid td.empty");

   // Event listener for peek
   document.getElementById("peek").addEventListener("click", 
      function() {
         for (var i = 0; i < filled.length; i++) {
            if (filled[i].style.backgroundColor === "rgb(255, 255, 255)") {
               filled[i].style.backgroundColor = "rgb(255, 211, 211)";
            }
         }
         for (var i = 0; i < empty.length; i++) {
            if (empty[i].style.backgroundColor === "rgb(101, 101, 101)") {
               empty[i].style.backgroundColor = "rgb(255, 101, 101)";
            }
         }
         // Remove after 0.5 seconds
         setTimeout(function() {
            for (var i = 0; i < puzzleCells.length; i++) {
               if (puzzleCells[i].style.backgroundColor === "rgb(255, 211, 211)") {
                  puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)";
               }
               else if (puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)") {
                  puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
               }
            }
         }, 500);
      });
}

function setBackground(e) {
   var cursorType;

   if (e.shiftKey) {
      cellBackground = "rgb(233, 207, 29)";
      cursorType = "url(images/jpf_eraser.png), cell";
   }
   else if (e.altKey) {
      cellBackground = "rgb(255, 255, 255)";
      cursorType = "url(images/jpf_cross.png), crosshair";
   }
   else {
      cellBackground = "rgb(101, 101, 101)";
      cursorType = "url(images/jpf_pencil.png), pointer";
   }
   
   e.target.style.backgroundColor = cellBackground;
   // Create an event listener for every cell
   for (var i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].addEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = cursorType;
   }
   // Prevent default select text
   e.preventDefault();
}

function extendBackground(e) {
   e.target.style.backgroundColor = cellBackground;
}

function endBackground() {
   // Remove event listener for every cell
   for (var i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].removeEventListener("mouseenter", extendBackground);
   }
}

function drawPuzzle(hint, rating, puzzle) {
   // Initial HTML string for the Hanjie Puzzle
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */
   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   // Loop through the rows to create the rowCount array containing the totals for each row in the puzzle
   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   // Loop through the columns to create the colCount array containing the totals for each column in the puzzle
   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */
   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}