"use strict";

// Date Variables
var thisDay = new Date ();
var endDate = new Date(thisDay.getTime() + 12096e5);

// Variable for table values
var tableHTML = "<table id='eventTable'> <caption>Upcoming Events</caption> <tr><th>Date</th><th>Event</th><th>Price</th></tr>";

for (var i = 0; i < eventDates.length; i++) {
   // Date Variables for Array
   var eventDate = new Date(eventDates[i]);
   var eventDay = eventDate.toDateString();
   var eventTime = eventDate.toLocaleTimeString();
   // Condition for dates in range
   if (thisDay.getTime() <= eventDate.getTime() && eventDate.getTime() <= endDate.getTime()) {
      tableHTML += "<tr><td>" + eventDay + "@" + eventTime + "</td><td>" + eventDescriptions[i] + "</td><td>" + eventPrices[i] + "</td></tr>";
   }
}
tableHTML += "</table>";
// Inserting the table into the document
document.getElementById("eventList").innerHTML = tableHTML;