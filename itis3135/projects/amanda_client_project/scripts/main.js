// main.js
$(document).ready(function () {
  // Initialize the jQuery UI Accordion on the schedule page
  if ($("#stream-accordion").length) {
    // prettier-ignore
    $("#stream-accordion").accordion({
      collapsible: true, // Allows all sections to be closed at once
      active: false, // Starts with all sections closed
      heightStyle: "content" // Adjusts height to fit the text inside
    });
  }
});
