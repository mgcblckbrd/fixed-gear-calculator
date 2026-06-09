
const buttonAbout = document.querySelector("#aboutBtn");
const buttonClose = document.querySelector("#closePopup");
const popup = document.querySelector("#aboutPopup");
const buttonCalc = document.querySelector("#calculateBtn");
const chainringEl = document.querySelector("#chainring");
const cogEl = document.querySelector("#cog");
const tireEl = document.querySelector("#tire");
const ambidextrousEl = document.querySelector("#ambidextrous");

function openPopup() {
  popup.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function drawWheel(
  skidPatches,
  cogTeeth,
  chainringTeeth,
  isAmbidextrous,
  baseSkidPatches,
  showAmbidextrous,
) {
  const canvas = document.querySelector("#wheelCanvas");
  const ctx = canvas.getContext("2d");
  const cx = 150;
  const cy = 150;
  const outerRadius = 110;
  const innerRadius = 95;

  // Размеры cog
  const teethCount = cogTeeth || 17;
  const cogRadius = 10 + teethCount * 0.6;
  const innerCog = cogRadius - 4;

  // Размеры chainring
  const chainringTeethCount = chainringTeeth || 48;
  const chainringRadius = 20 + chainringTeethCount * 0.8;
  const innerChainring = chainringRadius - 5;
  const chainringX = cx + outerRadius + chainringRadius + 10;
  const chainringY = cy;

  // Очистка
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Спицы
  const spokeCount = 16;
  ctx.strokeStyle = "#c0c0c0";
  ctx.lineWidth = 1;
  for (let i = 0; i < spokeCount; i++) {
    const angle = ((2 * Math.PI) / spokeCount) * i;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + innerRadius * Math.cos(angle),
      cy + innerRadius * Math.sin(angle),
    );
    ctx.stroke();
  }

  // Обод
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "#b0b0b0";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Покрышка
  ctx.beginPath();
  ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 14;
  ctx.stroke();

  // Цепь — единый контур
  ctx.beginPath();
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;

  ctx.moveTo(cx, cy - cogRadius);
  ctx.lineTo(chainringX, chainringY - chainringRadius);

  ctx.arc(
    chainringX,
    chainringY,
    chainringRadius,
    -Math.PI / 2,
    Math.PI / 2,
    false,
  );

  ctx.lineTo(cx, cy + cogRadius);

  ctx.arc(cx, cy, cogRadius, Math.PI / 2, -Math.PI / 2, false);

  ctx.closePath();
  ctx.stroke();

  // Зубья cog
  for (let i = 0; i < teethCount; i++) {
    const angle = ((2 * Math.PI) / teethCount) * i;
    const x1 = cx + innerCog * Math.cos(angle);
    const y1 = cy + innerCog * Math.sin(angle);
    const x2 = cx + cogRadius * Math.cos(angle);
    const y2 = cy + cogRadius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Основа cog
  ctx.beginPath();
  ctx.arc(cx, cy, innerCog, 0, Math.PI * 2);
  ctx.fillStyle = "#666";
  ctx.fill();
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Зубья chainring
  for (let i = 0; i < chainringTeethCount; i++) {
    const angle = ((2 * Math.PI) / chainringTeethCount) * i;
    const x1 = chainringX + innerChainring * Math.cos(angle);
    const y1 = chainringY + innerChainring * Math.sin(angle);
    const x2 = chainringX + chainringRadius * Math.cos(angle);
    const y2 = chainringY + chainringRadius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Основа chainring
  ctx.beginPath();
  ctx.arc(chainringX, chainringY, innerChainring, 0, Math.PI * 2);
  ctx.fillStyle = "#888";
  ctx.fill();
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Скидпатчи (дуги)
  const baseArcLength = (2 * Math.PI * outerRadius) / baseSkidPatches / 2;

  // Красные (базовые) патчи — всегда на своих местах
  for (let i = 0; i < baseSkidPatches; i++) {
    const centerAngle = ((2 * Math.PI) / baseSkidPatches) * i;
    const halfArc = baseArcLength / outerRadius / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius, centerAngle - halfArc, centerAngle + halfArc);
    ctx.strokeStyle = "#e53935";
    ctx.lineWidth = 6;
    ctx.stroke();
  }

  // Синие (ambidextrous) патчи — между красными
  if (showAmbidextrous) {
    for (let i = 0; i < baseSkidPatches; i++) {
      const centerAngle =
        ((2 * Math.PI) / baseSkidPatches) * i + Math.PI / baseSkidPatches;
      const halfArc = baseArcLength / outerRadius / 2;

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        outerRadius,
        centerAngle - halfArc,
        centerAngle + halfArc,
      );
      ctx.strokeStyle = "#0088FF";
      ctx.lineWidth = 6;
      ctx.stroke();
    }
  }
}

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

buttonAbout.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
});

popup.addEventListener("click", (evt) => {
  if (evt.target === popup) {
    closePopup();
  }
});

// Обработчик чекбокса — мгновенное обновление
ambidextrousEl.addEventListener("change", () => {
  const chainringNumber = +chainringEl.value;
  const cogNumber = +cogEl.value;
  const isAmbidextrous = ambidextrousEl.checked;
  const divisor = gcd(chainringNumber, cogNumber);
  const simplifiedChainring = chainringNumber / divisor;
  const baseSkidPatches = cogNumber / divisor;
  let skidPatches = baseSkidPatches;
  const showAmbidextrous = isAmbidextrous && simplifiedChainring % 2 !== 0;
  if (showAmbidextrous) {
    skidPatches = baseSkidPatches * 2;
  }
  drawWheel(
    skidPatches,
    cogNumber,
    chainringNumber,
    isAmbidextrous,
    baseSkidPatches,
    showAmbidextrous,
  );
});

// Обработчик кнопки «Рассчитать»
buttonCalc.addEventListener("click", () => {
  const chainringNumber = +chainringEl.value;
  const cogNumber = +cogEl.value;
  const tire = tireEl.value;
  const isAmbidextrous = ambidextrousEl.checked;
  const ratio = chainringNumber / cogNumber;
  const divisor = gcd(chainringNumber, cogNumber);
  const simplifiedChainring = chainringNumber / divisor;
  const baseSkidPatches = cogNumber / divisor;
  let skidPatches = baseSkidPatches;
  const showAmbidextrous = isAmbidextrous && simplifiedChainring % 2 !== 0;
  if (showAmbidextrous) {
    skidPatches = baseSkidPatches * 2;
  }
  console.log(ratio.toFixed(2), skidPatches);
  drawWheel(
    skidPatches,
    cogNumber,
    chainringNumber,
    isAmbidextrous,
    baseSkidPatches,
    showAmbidextrous,
  );
});

// Дефолтная отрисовка при загрузке
const defaultChainring = 48;
const defaultCog = 17;
const defaultDivisor = gcd(defaultChainring, defaultCog);
const defaultBaseSkidPatches = defaultCog / defaultDivisor;
drawWheel(defaultBaseSkidPatches, 17, 48, false, defaultBaseSkidPatches, false);