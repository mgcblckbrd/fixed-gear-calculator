const aboutButton = document.querySelector("#aboutBtn");

aboutButton.addEventListener("click", () => {
  let popup = document.querySelector("#aboutPopup");
  popup.classList.add("active");
});
