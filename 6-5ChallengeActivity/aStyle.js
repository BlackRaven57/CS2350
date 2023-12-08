"use strict";

// Change the body tag's style so it has a font-family of "Arial, sans-serif"
document.body.style.fontFamily = "Arial, sans-serif";

// Replace each of the spans (nickname, favorites, hometown) with your own information
document.getElementById("nickname").innerHTML = "El Bell";
document.getElementById("favorites").innerHTML = "Plants, Books, Snow, Biking";
document.getElementById("hometown").innerHTML = "Layton, Utah";

// Iterate through each li and change the class to "listitem". Add a style tag that sets a rule for "listitem" to make the color red
var list = document.querySelectorAll("li");
for (var i = 0; i < list.length; i++) {
    list[i].className = "listitem";
}
var listStyle = document.createElement("style");
document.head.appendChild(listStyle);
document.styleSheets[document.styleSheets.length - 1].insertRule(
    "li.listitem {color: red;}", 0);

// Create a new img element and set its src attribute to a picture of you with the picture being named "me1.jpg"
// Append that image under the <h1>
var pic = document.createElement("img");
pic.src = "images/me1.jpg";
document.body.insertBefore(pic, document.getElementById("title").nextElementSibling);

// Call a function ChangePic() function when the user clicks on your image, and change the src property of the image to 
// display another random picture of you. To make this easier, the new picture image’s name should be “me” + picnum + “.jpg”, 
// with picnum being the random number you just generated. For instance, if the random number was 3, the new image’s name will be me3.jpg.
pic.addEventListener("click", ChangePic);

function ChangePic() {
    var ranNum = Math.floor(Math.random() * 5) + 1;
    pic.src = "images/me" + ranNum + ".jpg";
}

// Link to other page
var linkText = document.createElement("h3");
var link = document.createElement("a");
link.setAttribute("href", "mybooks.html");
link.innerHTML = "My Collection";
linkText.appendChild(link);
document.body.insertBefore(linkText, document.body.lastChild);