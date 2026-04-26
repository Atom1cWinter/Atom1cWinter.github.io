$(document).ready(function () {
  if ($("#stream-accordion").length) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/streams.json", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const streams = JSON.parse(xhr.responseText);

          // prettier-ignore
          const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

          const formatTime = (hour, minute) => {
            const ampm = hour >= 12 ? "PM" : "AM";
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
          };

          const accordion = $("#stream-accordion");
          streams.forEach((stream) => {
            const dayName = dayNames[stream.weekday];
            const startTime = formatTime(stream.hour, stream.minute);
            const endTime = formatTime(stream.endHour, stream.endMinute);

            const $header = $(`<h3>${dayName}: ${stream.title}</h3>`);
            // prettier-ignore
            const $content = $(
          `<div><p><strong>Time:</strong> ${startTime} - ${endTime} EST</p><p><strong>Focus:</strong> ${stream.focus}</p></div>`
        );

            accordion.append($header);
            accordion.append($content);
          });

          // prettier-ignore
          $("#stream-accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
      });
        } catch (error) {
          console.error("Failed to parse streams JSON:", error);
          $("#stream-accordion").html(
            "<p>Error loading schedule data. Please refresh.</p>",
          );
        }
      } else {
        console.error("Failed to load streams.json. Status:", xhr.status);
        $("#stream-accordion").html(
          "<p>Error: Could not load schedule file (HTTP " +
            xhr.status +
            ").</p>",
        );
      }
    };
    xhr.onerror = function () {
      console.error("Network error loading streams.json");
      $("#stream-accordion").html(
        "<p>Error: Could not load schedule. Please ensure you are running this on a web server, not from a file path.</p>",
      );
    };
    xhr.send();
  }
});
