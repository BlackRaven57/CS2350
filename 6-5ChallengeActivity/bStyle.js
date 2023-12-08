"use strict";

var books = [{title: "The Hunger Games", author: "Suzanne Collins", alreadyRead: true},
    {title: "The Most Human Human", author: "Brian Christian", alreadyRead: false},
    {title: "The Wheel of Time", author: "Robert Jordan", alreadyRead: false},
    {title: "Tiger's Curse", author: "Colleen Houck", alreadyRead: true}];

// Using JavaScript, iterate through the items in the array, and dynamically display the collection within a table under the 
// <h1> section of your webpage. The entire table (including replacing any true/false text with actual images like in the example) 
// and styling should be generated and outputted with JavaScript
var table = document.createElement("table");
table.style.width = "200px";
table.style.border = "5px solid grey";
table.style.width = "70%";
table.style.fontFamily = "Georgia, serif";

// Within the table, create a <th> element for each of the properties in the array collection (for example title, author, alreadyRead) 
// - column count and text should be dynamically generated based on JavaScript, and not "hardcoded"
var tr = document.createElement("tr");
document.body.appendChild(table);
// Title
var th = document.createElement("th");
th.appendChild(document.createTextNode("Title"));
tr.appendChild(th);
// Author
th = document.createElement("th");
th.appendChild(document.createTextNode("Author"));
tr.appendChild(th);
// Read?
th = document.createElement("th");
th.appendChild(document.createTextNode("Read?"));
tr.appendChild(th);
table.appendChild(tr);

var checkImgSrc = "images/check.jpg";
var crossImgSrc = "images/cross.jpg";
for (var i = 0; i < books.length; i++) {
    tr = document.createElement("tr");
    // Title
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(books[i].title));
    tr.appendChild(td);
    // Author
    td = document.createElement("td");
    td.appendChild(document.createTextNode(books[i].author));
    tr.appendChild(td);
    // Read?
    td = document.createElement("td");
    if (books[i].alreadyRead) {
        var checkImg = document.createElement("img");
        checkImg.src = checkImgSrc;
        checkImg.setAttribute("id", "alreadyRead");
        checkImg.style.height = "50px";
        td.appendChild(checkImg);
    }
    else {
        var crossImg = document.createElement("img");
        crossImg.src = crossImgSrc;
        crossImg.setAttribute("id", "alreadyRead");
        crossImg.style.height = "50px";
        td.appendChild(crossImg);
    }
    tr.appendChild(td);
    table.appendChild(tr);
}

// In the last column, make sure the user has the ability to toggle the read/unread, true/false, and or checked/unchecked options, 
// by toggling the image when the user clicks on it
var readImages = document.querySelectorAll("img[id = 'alreadyRead']");
for (var i = 0; i < readImages.length; i++) {
    readImages[i].addEventListener("click", function() {
        if (this.attributes[0].value === checkImgSrc) {
            this.src = crossImgSrc;
        }
        else {
            this.src = checkImgSrc;
        }
    })
}

// Use JavaScript to append and create the style rules for the table within the <head> section of the HTML document
var tableStyle = document.createElement("style");
document.head.appendChild(tableStyle);
document.styleSheets[document.styleSheets.length - 1].insertRule(
    "table td {padding: 5px; border: 2px solid darkgrey; vertical-align: top;}", 0);
document.styleSheets[document.styleSheets.length - 1].insertRule(
    "table tr {height: 25px;}", 1);

// Link to other page
var linkText = document.createElement("h3");
var link = document.createElement("a");
link.setAttribute("href", "aboutme.html");
link.innerHTML = "About Me";
linkText.appendChild(link);
document.body.insertBefore(linkText, document.body.lastChild.nextSibling);