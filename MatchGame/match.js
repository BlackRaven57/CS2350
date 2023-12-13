"use strict";

// Global Variables
var numClicks = 0;
var numMatched = 0;
var numSym;
var oneClick = false;
var cardOne;
var cardTwo;
var symbols = ["~", "!", "@", "#", "^", "&", "*", "?"];
var currSym;

// Event Listener for First Click
window.addEventListener("load", function() {
    this.document.getElementById("startButton").onclick = start;
})

// Start Function
function start() {
    document.getElementById("startForm").style.display = "none";
    numSym = document.getElementById("numSymbols").value;
    generateBoard();
}

// Generate Game Board
function generateBoard() {
    if (numSym > 8) {
        numSym = 8;
    }
    // Set Symbols
    currSym = symbols.slice(0, numSym);
    currSym = currSym.concat(currSym).sort((a, b) => 0.5 - Math.random());
    // Table
    var table = document.createElement("table");
    table.style.width = "75%";
    var currNum = 0;
    for (var k = 0; k < 2; k++) {
        var tr = document.createElement("tr");
        for (var i = 0; i < numSym; i++) {
            var td = document.createElement("td");
            var cardImg = document.createElement("img");
            cardImg.src = "images/cardback.png";
            cardImg.setAttribute("id", "card");
            cardImg.setAttribute("name", currSym[currNum]);
            cardImg.style.height = "200px";
            td.appendChild(cardImg);
            tr.appendChild(td);
            currNum++;
        }
        table.appendChild(tr);
    }
    document.getElementById("game").appendChild(table);

    // Add Number of Tries Counter
    var tries = document.createElement("h3");
    tries.setAttribute("id", "tries");
    tries.appendChild(document.createTextNode("Number of Matches Attempted: " + numClicks));
    document.body.insertBefore(tries, document.body.lastChild.nextSibling);

    // Add Event Listeners 
    var cards = document.querySelectorAll("img[id = 'card']");
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function() {
            // Card Clicked
            switch (this.attributes[2].value) {
                case "~":
                    this.src = "images/swiggle.png";
                    break;
                case "!":
                    this.src = "images/exclaimMark.png";
                    break;
                case "@":
                    this.src = "images/at.png";
                    break;
                case "#":
                    this.src = "images/hash.png";
                    break;
                case "^":
                    this.src = "images/carrot.png";
                    break;
                case "&":
                    this.src = "images/and.png";
                    break;
                case "*":
                    this.src = "images/astrisk.png";
                    break;
                case "?":
                    this.src = "images/questionMark.png";
                    break;
            }

            // Two Flipped Cards
            if (oneClick) {
                cardTwo = this;
                if (cardOne.attributes[2].value === cardTwo.attributes[2].value) {
                    numMatched++;
                    checkWin();
                }
                else {
                    setTimeout(function() {
                        cardOne.src = "images/cardback.png";
                        cardTwo.src = "images/cardback.png";
                    }, 600);
                }
                oneClick = false;
                numClicks++;
                document.getElementById("tries").innerHTML = "Number of Matches Attempted: " + numClicks;
            }
            else {
                oneClick = true;
                cardOne = this;
            }
        });
    }
}

// Check Win
function checkWin() {
    if (numMatched == numSym) {
        document.getElementById("game").style.display = "none";
        // Win Message
        var winText = document.createElement("h2");
        winText.appendChild(document.createTextNode("Good job, you won!!"));
        document.body.insertBefore(winText, document.body.lastChild.nextSibling);
        // Play Again Button
        var playAgain = document.createElement("button");
        playAgain.textContent = "Play Again";
        playAgain.setAttribute("id", "againButton")
        document.body.insertBefore(playAgain, document.body.lastChild.nextSibling);
        document.getElementById("againButton").addEventListener("click", function() {location.reload()});
    }
}