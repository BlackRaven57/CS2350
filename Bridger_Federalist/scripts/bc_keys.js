"use strict";

window.addEventListener("load", findKeyWords);
window.addEventListener("load", makeKeyStyles);

// Locate the keywords in the article and add those keywords in alphabetical order
function findKeyWords() {
   // Aside
   var keyAside = document.createElement("aside");
   keyAside.setAttribute("id", "keywords");
   // h1
   var heading = document.createElement("h1");
   heading.appendChild(document.createTextNode("Keyword List"));
   keyAside.appendChild(heading);
   // ol
   var keyList = document.createElement("ol");
   keyAside.appendChild(keyList);

   // List of keywords
   var keyWordElems = document.querySelectorAll("dfn");
   var keyWords = new Array(keyWordElems.length);
   for (var i = 0; i < keyWordElems.length; i++) {
      keyWords[i] = keyWordElems[i].innerText;
      var linkID = /*replaceWS*/(keyWordElems[i].innerText);
      keyWordElems[i].setAttribute("id", "keyword_" + linkID);
   }
   keyWords.sort();

   for (var i = 0; i < keyWords.length; i++) {
      var keyWordListItem = document.createElement("li");
      var keyWordLink = document.createElement("a");
      keyWordLink.innerHTML = keyWords[i];
      var linkID = /*replaceWS*/(keyWords[i]);
      keyWordLink.setAttribute("href", "#keyword_" + linkID);
      keyWordListItem.appendChild(keyWordLink);
      keyList.appendChild(keyWordListItem);
   }
   document.getElementById("doc").insertBefore(keyAside, document.getElementById("doc").firstChild);
}
      
// Create an embedded style sheet for the keyword box
function makeKeyStyles() {
   var keyStyles = document.createElement("style");
   document.head.appendChild(keyStyles);
   // Rules
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "aside#keywords { \
         border: 3px solid rgb(101, 101, 101); \
         float: right; \
         margin: 20px 0px 20px 20px; \
         padding: 10px; \
         width: 320px; }", 0);
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "aside#keywords h1 { \
         font-size: 2em; \
         margin: 5px; \
         text-align: center; }", 1);
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "aside#keywords ol { \
         margin-left: 20px; \
         font-size: 1.2em; }", 2);
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "aside#keywords ol li {line-height: 1.5em;}", 3);
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "aside#keywords ol li a {color: rgb(101, 101, 101); text-decoration: none;}", 4);
}

// Already Made -- for whatever reason my computer will not take the .replace method so it is currently not working right
function replaceWS(textStr) {
   var revText = textStr.replace(/\s/g, "_");
   return revText;
}
