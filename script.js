const advancedPanel = document.querySelector(".advanced-panel");
const page = document.querySelector(".page");

advancedPanel.addEventListener("click", () => {
  page.classList.toggle("advanced-open");
});