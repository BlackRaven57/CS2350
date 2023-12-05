"use strict";

window.addEventListener("load", makeOutline);

// Generates the text of the table of contents as a nested list
function makeOutline() {
   var outline = document.getElementById("outline");
   var source = document.getElementById("doc");
   var mainHeading = document.createElement("h1");
   var outlineList = document.createElement("ol");
   var headingText = document.createTextNode("Outline");

   mainHeading.appendChild(headingText);
   outline.appendChild(mainHeading);
   outline.appendChild(outlineList);

   // Call create function
   createList(source, outlineList);
}
      
// Creates an outline based on the source document
function createList(source, outlineList) {
   var headings = ["H1", "H2", "H3", "H4", "H5", "H6"];
   var headNum = 0;
   // Previous level of heading
   var prevLevel = 0;

   // Loop through child nodes
   for (var n = source.firstChild; n !== null; n = n.nextSibling) {
      var headLevel = headings.indexOf(n.nodeName);
      if (headLevel !== -1) {
         headNum++;
         if (n.hasAttribute("id") === false) {
            n.setAttribute("id", "head" + headNum);
         }
         var listElem = document.createElement("li");
         var linkElem = document.createElement("a");
         linkElem.innerHTML = n.innerHTML;
         linkElem.setAttribute("href", "#" + n.id);
         listElem.appendChild(linkElem);

         // Creates tabbing and spacing for different levels
         if (headLevel === prevLevel) {
            outlineList.appendChild(listElem);
         }
         else if (headLevel > prevLevel) {
            var nestedList = document.createElement("ol");
            nestedList.appendChild(listElem);
            outlineList.lastChild.appendChild(nestedList);
            outlineList = nestedList;
         }
         else {
            var levelUp = prevLevel - headLevel;
            for (var i = 1; i <= levelUp; i++) {
               outlineList = outlineList.parentNode.parentNode;
            }
            outlineList.appendChild(listElem);
         }
         prevLevel = headLevel;
      }
   }
}