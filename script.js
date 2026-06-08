const buttonAbout = document.querySelector("#aboutBtn");
const buttonClose = document.querySelector("#closePopup");
const popup = document.querySelector("#aboutPopup");
const body = document.body;

function openPopup() {
  popup.classList.add("active");
document.body.classList.add("no-scroll");
}

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("no-scroll");
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