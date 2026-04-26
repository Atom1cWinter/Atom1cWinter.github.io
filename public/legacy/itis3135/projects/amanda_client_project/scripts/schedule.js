$(document).ready(function () {
  if ($("#stream-accordion").length) {
    // prettier-ignore
    $("#stream-accordion").accordion({
      collapsible: true,
      active: false,
      heightStyle: "content"
    });
  }
});
