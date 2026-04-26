const advancedPanel = document.querySelector(".advanced-panel");
const page = document.querySelector(".page");
const drumSound = new Audio("assets/sounds/splash.mp3");

advancedPanel.addEventListener("click", () => {
  page.classList.toggle("advanced-open");
});

// listen for spacebar
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();

    drumSound.currentTime = 0; // lets you spam it
    drumSound.play();
  }
});