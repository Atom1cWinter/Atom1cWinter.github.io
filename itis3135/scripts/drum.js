const display = document.getElementById("display");

const owlSounds = {
  Q: "Nocturnal Hoot",
  W: "Feather Snap",
  E: "Barn Owl Screech",
  A: "Forest Flutter",
  S: "Talon Tap",
  D: "Owl Wing Whoosh",
  Z: "Midnight Chirp",
  X: "Wise Echo",
  C: "Parliament Beat",
};

function playSound(key) {
  const audio = document.getElementById(key);
  if (audio) {
    audio.currentTime = 0; // Restart if already playing
    audio.play();
    display.innerText = owlSounds[key]; // Update the display with unique owl string
  }
}

// Click Event Listener
document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => {
    const key = pad.innerText.trim();
    playSound(key);
  });
});

// Keyboard Event Listener
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  if (owlSounds[key]) {
    playSound(key);
  }
});
