const buttonAbout = document.querySelector("#aboutBtn");
const buttonClose = document.querySelector("#closePopup");
const popup = document.querySelector("#aboutPopup");

function openPopup() {
  popup.classList.add("active");
}

function closePopup() {
  popup.classList.remove("active");
}

buttonAbout.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
});

popup.addEventListener('click', (evt) => {
  if (evt.target === popup) {
    closePopup();
  }
});