"use strict";

// Global Variables
var allCells;
window.onload = startUp;
      
// Displays puzzle 1 and loads the event handlers for the web page buttons
function startUp() {
   document.getElementById("puzzleTitle").innerHTML = ("Puzzle 1");
   document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
   var puzzleButtons = document.getElementsByClassName("puzzles");
   for (var i = 0; i < puzzleButtons.length; i++) {
      puzzleButtons[i].onclick = switchPuzzle;
   }
   setupPuzzle();

   // Event Listeners
   document.getElementById("check").addEventListener("click", findErrors);
   document.getElementById("solve").addEventListener("click", showSolution);
}
      
// Sets up a new puzzle, adding the event handlers for every puzzle cell
function setupPuzzle() {
   allCells = document.querySelectorAll("table#hitoriGrid td");
   for (var j = 0; j < allCells.length; j++) {
      // Style
      allCells[j].style.backgroundColor = "white";
      allCells[j].style.color = "black";
      allCells[j].style.borderRadius = 0;
      // Listeners
      allCells[j].addEventListener("mousedown", function (e) {
         if (e.shiftKey) {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";
            e.target.style.borderRadius = 0;
            e.target.style.cursor = "url(images/jpf_eraser.png), alias";
         }
         else if (e.altKey) {
            e.target.style.backgroundColor = "black";
            e.target.style.color = "white";
            e.target.style.borderRadius = 0;
            e.target.style.cursor = "url(images/jpf_block.png), cell";
         }
         else {
            e.target.style.backgroundColor = "rgb(101, 101, 101)";
            e.target.style.color = "white";
            e.target.style.borderRadius = "50%";
            e.target.style.cursor = "url(images/jpf_circle.png), pointer";
         }
         e.preventDefault();
      })
      allCells[j].addEventListener("mouseup", checkSolution);
   }
}
          
// Swaps one puzzle for another, confirms the change before swapping in the new puzzle
function switchPuzzle(e) {
   if (confirm("You will lose all of your work on the puzzle. Continue?")) {
      var puzzleID = e.target.id;
      document.getElementById("puzzleTitle").innerHTML = e.target.value;
      switch (puzzleID) {
         case "puzzle1" :
               document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
               break;
            case "puzzle2" :
               document.getElementById("puzzle").innerHTML = drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
               break;
            case "puzzle3" :
               document.getElementById("puzzle").innerHTML = drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
               break;
      }
      setupPuzzle();
   }
   
}
      
// Highlights the errors in the Hitori puzzle in a red font
function findErrors() {
   for (var i = 0; i < allCells.length; i++) {
      if ((allCells[i].className === "blocks" && allCells[i].style.backgroundColor === "rgb(101, 101, 101)") 
            || (allCells[i].className === "circles" && allCells[i].style.backgroundColor === "black")) {
            allCells[i].style.color = "red";
         }
   }
   // Remove after 0.5 seconds
   setTimeout(function() {
      for (var i = 0; i < allCells.length; i++) {
         if (allCells[i].style.color === "red") {
            allCells[i].style.color = "white";
         }
      }
   }, 1000);
}
      
// ALREADY MADE
function checkSolution() {
   // Set the initial solved state of the puzzle to true
   var solved = true;

   // Loop through the puzzle cells, exiting when an incorrect cell is found, setting the solved variable to false
   for (var i = 0; i < allCells.length; i++) {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;

      // A cell is incorrect if it is in the block class & is not black or in the circle class & is not white
      if ( (cellClass == "blocks" && cellColor !== "black") || 
           (cellClass == "circles" && cellColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
      }
   }

   // If solved is still true after the loop, display an alert box
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution () {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };   
}

function drawHitori(numbers, blocks, rating) {
   // Initial HTML String for the Hitori Puzzle
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character. */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles */
   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";
   

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";
         htmlString += numbers[i][j];
         htmlString +="</td>";
      }
      htmlString += "</tr>";
   }
   htmlString += "</table>";
   return htmlString;
}