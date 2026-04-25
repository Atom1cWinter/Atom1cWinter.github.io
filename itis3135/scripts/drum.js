const display = document.getElementById("display");

// prettier-ignore
const owlSounds = {
  Q: "Nocturnal Hoot",
  W: "Feather Snap",
  E: "Barn Owl Screech",
  A: "Forest Flutter",
  S: "Talon Tap",
  D: "Owl Wing Whoosh",
  Z: "Midnight Chirp",
  X: "Wise Echo",
  C: "Parliament Beat"
};

function playSound(key) {
  const audio = document.getElementById(key);
  if (audio) {
    audio.currentTime = 0; // Restart if already playing
    audio.play();
    const button = document.querySelector(`.drum-pad[data-key="${key}"]`);
    const label = button && button.dataset ? button.dataset.label : null;
    display.innerText = label || owlSounds[key];
  }
}

document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => {
    const key = pad.dataset.key || pad.innerText.trim();
    playSound(key);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  if (owlSounds[key]) {
    playSound(key);
  }
});
