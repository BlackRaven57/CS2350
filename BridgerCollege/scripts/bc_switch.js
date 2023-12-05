"use strict";
   
window.addEventListener("load", setupStyles);

// Style sheet switcher
function setupStyles() {
   // Create link element
   var pageStyle = document.createElement("link");
   pageStyle.setAttribute("href", "styles/bc_page.css");
   pageStyle.setAttribute("rel", "stylesheet");
   pageStyle.setAttribute("disabled", "disabled");
   // Append to document head
   document.head.appendChild(pageStyle);
   pageStyle.disabled = true;

   //// Adding Buttons
   var buttonDIV = document.createElement("div");
   buttonDIV.setAttribute("id", "styleButtons");
   // Web
   var webButton = document.createElement("input");
   webButton.setAttribute("type", "button");
   webButton.setAttribute("value", "Web View");
   // Page
   var pageButton = document.createElement("input");
   pageButton.setAttribute("type", "button");
   pageButton.setAttribute("value", "Page View");
   // Append
   buttonDIV.appendChild(webButton);
   buttonDIV.appendChild(pageButton);
   document.body.insertBefore(buttonDIV, document.body.firstChild);

   //// Style
   var buttonStyles = document.createElement("style");
   document.head.appendChild(buttonStyles);
   // Rules
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "div#styleButtons {position: fixed;}", 0);
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "div#styleButtons input { \
         background-color: rgba(68, 94, 186, 0.6); \
         border: 3px solid rgba(0 24, 123, 0.6); \
         border-radius: 50%; \
         cursor: pointer; \
         color: white; \
         display: inline-block; \
         font-size: 1.2em; \
         height: 60px; \
         margin: 5px 10px; \
         width: 100px; }", 1);
   document.styleSheets[document.styleSheets.length - 1].insertRule(
      "@media print {div#styleButtons {display:none;}}", 2);

   //// Click Functions
   webButton.onclick = function () {pageStyle.disabled = true;}
   pageButton.onclick = function () {pageStyle.disabled = false;}
}
