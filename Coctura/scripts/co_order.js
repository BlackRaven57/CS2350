"use strict";

window.addEventListener("load", function() {
   var orderForm = this.document.forms.orderForm;
   orderForm.elements.orderDate.value = new Date().toDateString();
   orderForm.elements.model.focus();
   calcOrder();

   // Change Events
   orderForm.elements.model.onchange = calcOrder;
   orderForm.elements.qty.onchange = calcOrder;
   var planOptions = this.document.querySelectorAll("input[name = 'protection']");
   for (var i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
   }
})

// Calculates the cost of the customer order
function calcOrder() {
   var orderForm = document.forms.orderForm;
   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;
   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity = orderForm.elements.qty[qIndex].value;

   var initialCost = parseFloat(mCost * quantity);
   orderForm.elements.initialCost.value = formatUSACurrency(initialCost);

   // Protection Plan
   var pCost = parseFloat(document.querySelector("input[name = 'protection']:checked").value);
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

   // Subtotal
   orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

   // Sales Tax
   var salesTax = 0.05 * (initialCost + pCost);
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   // Total Cost
   var totalCost = initialCost + pCost + salesTax;
   orderForm.elements.totalCost.value = formatUSACurrency(totalCost);

   // Store Text Details
   orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;
   orderForm.elements.protectionName.value = document.querySelector("input[name = 'protection']:checked").nextSibling.nodeValue;
}
      
// Format a numeric value, val, using the local numeric format to the number of decimal places specified by decimals
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
} 
     
// Formats value as US currency
function formatUSACurrency(val) {
   return val.toLocaleString("en-US", {style: "currency", currency: "USD"});
}
      
