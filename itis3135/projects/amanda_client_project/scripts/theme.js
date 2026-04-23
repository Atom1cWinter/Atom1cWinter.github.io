document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const savedTheme = localStorage.getItem("preferred-theme");
  const darkThemeKey = "preferred-dark-variant";
  // prettier-ignore
  const darkThemeClasses = [
    "dark-midnight-cobalt",
    "dark-graphite-neon",
    "dark-ember-night",
    "dark-frost-slate"
  ];

  // Change this default to preview another dark style:
  // dark-midnight-cobalt | dark-graphite-neon | dark-ember-night | dark-frost-slate
  const defaultDarkVariant = "dark-midnight-cobalt";

  function getDarkVariant() {
    const savedVariant = localStorage.getItem(darkThemeKey);
    return darkThemeClasses.includes(savedVariant)
      ? savedVariant
      : defaultDarkVariant;
  }

  function applyDarkVariant() {
    body.classList.remove(...darkThemeClasses);

    if (!body.classList.contains("light-theme")) {
      body.classList.add(getDarkVariant());
    }
  }

  if (savedTheme === "light") {
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
  }

  applyDarkVariant();

  function syncToggleState() {
    const toggle = document.getElementById("theme-toggle");

    if (!toggle) {
      return false;
    }

    toggle.checked = body.classList.contains("light-theme");
    return true;
  }

  syncToggleState();

  // Header is injected via HTMLInclude, so this keeps the slider state in sync
  const headerObserver = new MutationObserver(() => {
    if (syncToggleState()) {
      headerObserver.disconnect();
    }
  });

  headerObserver.observe(body, { childList: true, subtree: true });

  document.addEventListener("change", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement) || target.id !== "theme-toggle") {
      return;
    }

    const nextTheme = target.checked ? "light" : "dark";
    body.classList.toggle("light-theme", nextTheme === "light");
    localStorage.setItem("preferred-theme", nextTheme);
    applyDarkVariant();
  });
});
