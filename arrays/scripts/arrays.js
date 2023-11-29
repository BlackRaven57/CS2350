"use strict";

//// PART ONE ////
// Family Arrays
var famNames = ["Carol", "Britney", "Stephen", "Lila", "Andrew", "Marcus", "Lexi"];
var famRelation = ["Grandma", "Mother", "Father", "Sister", "Brother", "Brother", "Cousin"];

// Creating table for Family Information
var famTable = "<table id='famTable'><tr><th>Name</th><th>Relationship</th></tr>";
for (var i = 0; i < famNames.length; i++) {
    famTable += "<tr><td>" + famNames[i] + "</td><td>" + famRelation[i] + "</td></tr>";
}
famTable += "</table>";
document.getElementById("family").innerHTML = famTable;

//// PART TWO ////
// Color Array
var color = [];
color.push("red", "green", "purple", "brown", "yellow", "pink", "blue", "orange");

// List of all Colors
var allColors = "<ul>";
for (var j = 0; j < color.length; j++) {
    allColors += "<li>" + color[j] + "</li>";
}
allColors += "</ul>";
document.getElementById("allColors").innerHTML = allColors;

// List of Colors that start with p
var pColors = "<ul>";
for (var k = 0; k < color.length; k++) {
    var curColor = color[k];
    if (curColor[0] === "p") {
        pColors += "<li>" + color[k] + "</li>";
    }
}
pColors += "</ul>";
document.getElementById("pColors").innerHTML = pColors;

// List of Colors excluding b
var bColors = "<ul>";
for (var l = 0; l < color.length; l++) {
    var curColor = color[l];
    if (curColor[0] != "b") {
        bColors += "<li>" + color[l] + "</li>";
    }
}
bColors += "</ul>";
document.getElementById("nonBColors").innerHTML = bColors;

// List of Colors that contain n
var nColors = "<ul>";
for (var m = 0; m < color.length; m++) {
    var curColor = color[m];
    if (hasN(curColor)) {
        nColors += "<li>" + color[m] + "</li>";
    }
}
nColors += "</ul>";
document.getElementById("filterColors").innerHTML = nColors;

function hasN (string) {
    for (var n = 0; n < string.length; n++) {
        if (string[n] === "n") {
            return true;
        }
    }
    return false;
}   

//// PART THREE ////
// Create arrays
var randWord = ["Computer", "Glasses", "Animal", "Water", "Light", "Headphones", "Bag"];
var randNum = [24, 654, -356, -34, 45, 3, 684];

// Two arrays
var twoArrays = "<p>" + randWord.toString() + "</p><p>" + randNum.toString() + "</p>";
document.getElementById("twoArrays").innerHTML = twoArrays;

// Three sorted arrays
var treArrays = "<p>" + randWord.sort() + "</p><p>" + randNum.sort() + "</p>";
document.getElementById("sortedArrays").innerHTML = treArrays;

// Sorted number array
document.getElementById("sortedNumberArray").innerHTML = "<p>" + randNum.sort(function(a, b) {return a - b;}) + "</p>";

//// PART FOUR ////
var lastMod = document.lastModified;
var curDate = new Date();
var oneh4 = "<h4>Last Modified: " + lastMod + "</h4>";
var twoh4 = "<h4>Current Date: " + curDate + "</h4>";
document.getElementById("dates").innerHTML = oneh4 + twoh4;