async function initializeHomepagePlanner() {
  const planner = document.getElementById("stream-planner-banner");

  if (!planner) {
    return;
  }

  const timezoneSelect = document.getElementById("timezone-select");
  const titleOutput = document.getElementById("next-stream-title");
  const timeOutput = document.getElementById("next-stream-time");
  const countdownOutput = document.getElementById("countdown-timer");
  const listOutput = document.getElementById("upcoming-streams");
  const filterButtons = Array.from(document.querySelectorAll(".filter-chip"));
  const baseTimezone = "America/New_York";

  let activeFilter = "all";
  let nextStreamDate = null;
  let renderPlanner;

  // prettier-ignore
  let streamSlots = [];
  try {
    const response = await fetch("data/streams.json");
    streamSlots = await response.json();
  } catch (error) {
    console.error("Failed to load streams.json:", error);
    countdownOutput.textContent = "Error loading schedule.";
    return;
  }

  // prettier-ignore
  function getPartsInTimeZone(date, timeZone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short"
    });

    const parts = formatter.formatToParts(date);
    const map = {};

    parts.forEach((part) => {
      map[part.type] = part.value;
    });

    // prettier-ignore
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // prettier-ignore
    return {
      year: Number(map.year),
      month: Number(map.month),
      day: Number(map.day),
      weekday: weekdays.indexOf(map.weekday)
    };
  }

  // prettier-ignore
  function zonedTimeToDate(year, month, day, hour, minute, timeZone) {
    const utcGuess = Date.UTC(year, month - 1, day, hour, minute);
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date(utcGuess));

    const map = {};

    parts.forEach((part) => {
      map[part.type] = part.value;
    });

    // prettier-ignore
    const zonedAsUtc = Date.UTC(
      Number(map.year),
      Number(map.month) - 1,
      Number(map.day),
      Number(map.hour),
      Number(map.minute),
      Number(map.second)
    );

    return new Date(2 * utcGuess - zonedAsUtc);
  }

  function getUpcomingStreams(filter) {
    const now = new Date();
    const upcoming = [];

    for (let offset = 0; offset < 21; offset += 1) {
      const probe = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
      const etDay = getPartsInTimeZone(probe, baseTimezone);

      streamSlots.forEach((slot) => {
        if (slot.weekday !== etDay.weekday) {
          return;
        }

        if (filter !== "all" && filter !== slot.type) {
          return;
        }

        // prettier-ignore
        const candidate = zonedTimeToDate(
          etDay.year,
          etDay.month,
          etDay.day,
          slot.hour,
          slot.minute,
          baseTimezone
        );

        if (candidate > now) {
          upcoming.push({ ...slot, start: candidate });
        }
      });
    }

    upcoming.sort((a, b) => a.start - b.start);
    return upcoming;
  }

  // prettier-ignore
  function formatStreamTime(date, timeZone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });

    return formatter.format(date);
  }

  function updateCountdown() {
    if (!nextStreamDate) {
      countdownOutput.textContent = "No streams match this filter yet.";
      return;
    }

    const diffMs = nextStreamDate.getTime() - Date.now();

    if (diffMs <= 0) {
      countdownOutput.textContent = "Live now or about to start!";
      renderPlanner();
      return;
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownOutput.textContent = `Starts in ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  renderPlanner = function renderPlanner() {
    const timezone = timezoneSelect.value;
    const upcoming = getUpcomingStreams(activeFilter);

    if (!upcoming.length) {
      nextStreamDate = null;
      titleOutput.textContent = "Next stream:";
      timeOutput.textContent = "No stream found for this filter.";
      listOutput.innerHTML = "";
      updateCountdown();
      return;
    }

    const [next, ...rest] = upcoming;
    nextStreamDate = next.start;

    titleOutput.textContent = `Next stream: ${next.title}`;
    timeOutput.textContent = formatStreamTime(next.start, timezone);
    // prettier-ignore
    listOutput.innerHTML = rest
      .slice(0, 3)
      .map(
        (slot) =>
          `<li><strong>${slot.title}</strong><br>${formatStreamTime(slot.start, timezone)}</li>`
      )
      .join("");

    updateCountdown();
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";

      filterButtons.forEach((chip) => {
        chip.classList.toggle("active", chip === button);
      });

      renderPlanner();
    });
  });

  timezoneSelect.addEventListener("change", renderPlanner);

  renderPlanner();
  setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", initializeHomepagePlanner);
