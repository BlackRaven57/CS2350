"use strict";

// Setting Date Variables
var thisTime = new Date();
var timeStr = thisTime.toLocaleString();
document.getElementById("timeStamp").innerHTML =timeStr;

// Finding Which Map to Show
var thisHour = thisTime.getHours();
var thisMonth = thisTime.getMonth();
var mapNum = (2 * thisMonth + thisHour) % 24;
var imgStr = "<img src='images/sd_sky" + mapNum + ".png' />"; // For the record the code in the textbook for this spot is wrong but I figured it out
document.getElementById("planisphere").insertAdjacentHTML("afterbegin", imgStr);