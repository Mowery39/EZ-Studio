const advancedPanel = document.querySelector(".advanced-panel");
const page = document.querySelector(".page");
const sounds = {
  1: new Audio("assets/sounds/kick.mp3"),
  2: new Audio("assets/sounds/snare.mp3"),
  3: new Audio("assets/sounds/closedHiHat.mp3"),
  4: new Audio("assets/sounds/openHiHat.mp3"),
  5: new Audio("assets/sounds/clap.mp3"),
  6: new Audio("assets/sounds/doubleRimShot.mp3"),
  7: new Audio("assets/sounds/tomLow.mp3"),
  8: new Audio("assets/sounds/accousticSnare.mp3"),
  9: new Audio("assets/sounds/hithopSnare.mp3"),
  10: new Audio("assets/sounds/splash.mp3"),
};

advancedPanel.addEventListener("click", () => {
  page.classList.toggle("advanced-open");
});

// listen for spacebar
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();

    const sound = sounds[soundLevel];

    // apply pitch
    sound.playbackRate = 0.5 + (pitchLevel - 1) * 0.15;

    // apply volume (convert 1–10 → 0.1–1.0)
    sound.volume = volumeLevel / 10;

    sound.currentTime = 0;
    sound.play();
  }
});

let pitchLevel = 5;
let volumeLevel = 5;
let soundLevel = 1;

// get elements
const pitchValue = document.getElementById("pitch-value");
const volumeValue = document.getElementById("volume-value");
const soundValue = document.getElementById("sound-value");

// PITCH
document.getElementById("pitch-up").onclick = () => {
  if (pitchLevel < 10) pitchLevel++;
  pitchValue.textContent = pitchLevel;
};

document.getElementById("pitch-down").onclick = () => {
  if (pitchLevel > 1) pitchLevel--;
  pitchValue.textContent = pitchLevel;
};

// VOLUME
document.getElementById("volume-up").onclick = () => {
  if (volumeLevel < 10) volumeLevel++;
  volumeValue.textContent = volumeLevel;
};

document.getElementById("volume-down").onclick = () => {
  if (volumeLevel > 1) volumeLevel--;
  volumeValue.textContent = volumeLevel;
};

// SOUND
document.getElementById("sound-up").onclick = () => {
  if (soundLevel < 10) soundLevel++;
  soundValue.textContent = soundLevel;
};

document.getElementById("sound-down").onclick = () => {
  if (soundLevel > 1) soundLevel--;
  soundValue.textContent = soundLevel;
};