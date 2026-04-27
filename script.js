let isRecording = false;
let isPlaying = false;
let recordedNotes = [];
let startTime = 0;
let recordingOffset = 0;

const recordBtn = document.querySelector(".record-btn");
const playBtn = document.querySelector(".play-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");
const grid = document.querySelector(".music-grid");
const gridWindow = document.querySelector(".music-grid-window");

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
const soundNames = ["Kick", "Snare", "Closed Hi Hat", "Open Hi Hat", "Clap", "Double Rim Shot", "Tom Low", "Hit Hop Snare", "Splash"]

advancedPanel.addEventListener("click", () => {
  page.classList.toggle("advanced-open");
});

// listen for spacebar
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {

  if (isRecording) {
    recordedNotes.push({
      time: recordingOffset + (Date.now() - startTime),
      sound: soundLevel,
      pitch: pitchLevel,
      volume: volumeLevel
    });

      drawNote(recordedNotes[recordedNotes.length - 1]);
  }

    e.preventDefault();

    const sound = sounds[soundLevel];

    sound.playbackRate = 0.5 + (pitchLevel - 1) * 0.015;
    sound.volume = volumeLevel / 100;

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

const advancedVolume = document.getElementById("advanced-volume");
const advancedPitch = document.getElementById("advanced-pitch");
const advancedSound = document.getElementById("advanced-sound");

const advancedVolumeValue = document.getElementById("advanced-volume-value");
const advancedPitchValue = document.getElementById("advanced-pitch-value");
const advancedSoundValue = document.getElementById("advanced-sound-value");

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
  soundValue.textContent = soundNames[soundLevel];

  //Update Advanced Slider
  advancedSoundValue.textContent = soundNames[soundLevel];
};

document.getElementById("sound-down").onclick = () => {
  if (soundLevel > 1) soundLevel--;
  soundValue.textContent = soundNames[soundLevel];

   //Update Advanced Slider
  advancedSoundValue.textContent = soundNames[soundLevel];
};

// ===== ADVANCED SLIDERS =====

// Volume slider
advancedVolume.oninput = () => {
  volumeLevel = Number(advancedVolume.value);
  advancedVolumeValue.textContent = volumeLevel;

  // sync main display (1–100 → 1–10)
  volumeValue.textContent = Math.ceil(volumeLevel / 10);
};

// Pitch slider
advancedPitch.oninput = () => {
  pitchLevel = Number(advancedPitch.value);
  advancedPitchValue.textContent = pitchLevel;

  pitchValue.textContent = Math.ceil(pitchLevel / 10);
};

// Sound slider
advancedSound.oninput = () => {
  soundLevel = Number(advancedSound.value);
  advancedSoundValue.textContent = soundNames[soundLevel];

  // also update main display
  soundValue.textContent = soundNames[soundLevel];
};

const infoBtn = document.querySelector(".info-btn");
const overlay = document.getElementById("tutorial-overlay");
const title = document.getElementById("tutorial-title");
const text = document.getElementById("tutorial-text");

const nextBtn = document.getElementById("tutorial-next");
const backBtn = document.getElementById("tutorial-back");
const exitBtn = document.getElementById("tutorial-exit");
const closeBtn = document.getElementById("tutorial-close");

let step = 0;

const steps = [
  {
    title: "Welcome to EZ Studio!",
    text: "Let’s walk through some key functions. You can exit anytime by pressing the X."
  },
  {
    title: "The Drum...",
    text: "Press the spacebar to play a sound."
  },
  {
    title: "Simple Settings",
    text: "Use arrows to change pitch, volume, and sound."
  },
  {
    title: "Advanced Settings",
    text: "Use the Advanced tab for more features."
  },
  {
    title: "You're Ready to Go!",
    text: "Good luck!"
  }
];

// open tutorial
infoBtn.onclick = () => {
  step = 0;
  showStep();
  overlay.classList.remove("hidden");
};

// show step
function showStep() {
  const tutorialBox = document.querySelector(".tutorial-box");

  tutorialBox.style.opacity = "0";
  tutorialBox.style.transform = "scale(0.97)";

  setTimeout(() => {
    title.textContent = steps[step].title;
    text.textContent = steps[step].text;

    backBtn.style.display = step === 0 ? "none" : "inline-block";
    nextBtn.style.display = step === steps.length - 1 ? "none" : "inline-block";
    exitBtn.classList.toggle("hidden", step !== steps.length - 1);

    overlay.className = "tutorial-overlay";
    overlay.classList.add(`tutorial-step-${step}`);

    tutorialBox.style.opacity = "1";
    tutorialBox.style.transform = "scale(1)";
  }, 180);
}

// next
nextBtn.onclick = () => {
  step++;
  showStep();
};

// back
backBtn.onclick = () => {
  step--;
  showStep();
};

// exit
exitBtn.onclick = () => {
  overlay.classList.add("hidden");
};

// close (X)
closeBtn.onclick = () => {
  overlay.classList.add("hidden");
};

// Automatically gets the tutorial to pop up on load up 
window.onload = () => {
  step = 0;
  showStep();
  overlay.classList.remove("hidden");
};

recordBtn.onclick = () => {
  isRecording = !isRecording;

  if (isRecording) {
    recordingOffset = recordedNotes.length > 0
      ? Math.max(...recordedNotes.map(note => note.time)) + 500
      : 0;

    startTime = Date.now();
    recordBtn.style.background = "darkred";
  } else {
    recordBtn.style.background = "red";
  }
};

function drawNote(noteData) {
  const note = document.createElement("div");

  note.style.position = "absolute";
  note.style.width = "16px";
  note.style.height = "16px";
  note.style.background = "black";
  note.style.borderRadius = "3px";

  note.style.left = `${noteData.time / 20}px`;
  note.style.bottom = `${Math.ceil(noteData.pitch / 10) * 12}px`;

  grid.appendChild(note);

  gridWindow.scrollTo({
    left: note.offsetLeft - 200,
    behavior: "smooth"
  });
}

playBtn.onclick = () => {
  if (recordedNotes.length === 0) return;

  isPlaying = true;

  recordedNotes.forEach(note => {
    setTimeout(() => {
      if (!isPlaying) return;

      const sound = sounds[note.sound];

      sound.playbackRate = 0.5 + (note.pitch - 1) * 0.015;
      sound.volume = note.volume / 100;
      sound.currentTime = 0;
      sound.play();
    }, note.time);
  });
};

stopBtn.onclick = () => {
  isPlaying = false;
};

resetBtn.onclick = () => {
  isRecording = false;
  isPlaying = false;
  recordedNotes = [];
  grid.innerHTML = "";
  recordBtn.style.background = "red";
  gridWindow.scrollLeft = 0;
};