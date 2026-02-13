const music = document.getElementById("bg-music");
const control = document.getElementById("music-control");

let isPlaying = false;
let hasStarted = false;

/* First click anywhere starts music */
document.body.addEventListener("click", function (e) {

  if (e.target.id === "music-control") return;

  if (!hasStarted) {
    music.volume = 0.4;
    music.play().catch(() => {});
    isPlaying = true;
    hasStarted = true;
    control.innerHTML = "🎵 Playing";
  }

}, false);

/* Toggle Music */
function toggleMusic(event) {
  event.stopPropagation();

  if (isPlaying) {
    music.pause();
    isPlaying = false;
    control.innerHTML = "▶ Play";
  } else {
    music.play().catch(() => {});
    isPlaying = true;
    control.innerHTML = "🎵 Playing";
  }
}

function reduceVolume() {
  if (isPlaying) music.volume = 0.2;
}

function restoreVolume() {
  if (isPlaying) music.volume = 0.4;
}

function typeDayMessage(elementId, lines, buttonId) {

  const messageElement = document.getElementById(elementId);
  const button = document.getElementById(buttonId);

  messageElement.innerHTML = "";
  button.classList.remove("show-line");

  let lineIndex = 0;
  let charIndex = 0;

  function typeChar() {

    if (lineIndex < lines.length) {

      const currentLine = lines[lineIndex];

      if (charIndex < currentLine.length) {

        messageElement.innerHTML += currentLine.charAt(charIndex);
        charIndex++;

        setTimeout(typeChar, 35); // typing speed

      } else {

        messageElement.innerHTML += "<br>";
        lineIndex++;
        charIndex = 0;

        setTimeout(typeChar, 400); // pause between lines
      }

    } else {

      setTimeout(() => {
        button.classList.add("show-line");
      }, 600);

    }
  }

  typeChar();
}


/* ---------------- ROSE DAY ---------------- */

function openRoseDay() {
  reduceVolume();
  document.getElementById("rose-modal").style.display = "flex";

  const message = "This rose is beautiful… but not as beautiful as you ❤️";
  const messageElement = document.getElementById("rose-message");
  const secondLine = document.getElementById("rose-second-line");

  messageElement.innerHTML = "";
  secondLine.classList.remove("show-line");

  let index = 0;

  function typeEffect() {
    if (index < message.length) {
      messageElement.innerHTML += message.charAt(index);
      index++;
      setTimeout(typeEffect, 40);
    } else {
      setTimeout(() => {
        secondLine.classList.add("show-line");
        setTimeout(showPlacardSequence, 2000);
      }, 500);
    }
  }

  typeEffect();
  createPetals();
}

function closeModal() {
  document.getElementById("rose-modal").style.display = "none";
  restoreVolume();
}

function showPlacardSequence() {
  const placard = document.getElementById("placard");
  const placardText = document.getElementById("placard-text");

  placard.classList.add("show-placard");

  setTimeout(() => {
    placardText.innerText = "Okay okay… I know that was cheesy 😅";
  }, 200);

  setTimeout(() => {
    placardText.innerText = "But you deserve it.";
  }, 3800);

  setTimeout(() => {
    placardText.innerText = "For being awesome ❤️";
  }, 6500);

  setTimeout(() => {
    placardText.innerText = "Happy Rose Day, my rose 🌹❤️";
  }, 9200);
}

function createPetals() {
  const modal = document.querySelector(".rose-modal-content");

  for (let i = 0; i < 10; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = 4 + Math.random() * 3 + "s";
    petal.style.animationDelay = Math.random() * 2 + "s";

    modal.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 7000);
  }
}

/* ---------------- PROPOSE DAY ---------------- */

function openProposeDay() {
  reduceVolume();
  document.getElementById("propose-modal").style.display = "flex";

  const messageElement = document.getElementById("propose-message");
  const loveQuestion = document.getElementById("love-question");
  const finalText = document.getElementById("propose-final");
  const noBtn = document.getElementById("no-button");
  const loveButtons = document.querySelector(".love-buttons");

  // Reset NO button
  noBtn.style.position = "relative";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transition = "0.2s ease";
  noBtn.onmouseenter = null;   // remove previous handler

  loveButtons.style.opacity = "1";
  loveButtons.style.pointerEvents = "auto";

  messageElement.innerHTML = "";
  loveQuestion.classList.remove("show-line");
  finalText.classList.remove("show-line");
  finalText.innerHTML = "";

  const lines = [
    "Hey... Okay, yes,",
    "too many words sorry for annoying you always",
    "But I know how to make you happy.",
    "And I want to make you the happiest.",
    
    "So here it goes...",
  ];

  let i = 0;

  function typeLine() {
    if (i < lines.length) {
      messageElement.innerHTML += lines[i] + "<br>";
      i++;
      setTimeout(typeLine, 1000);
    } else {
      setTimeout(() => {
        loveQuestion.classList.add("show-line");
        activateNoButton(); // activate movement AFTER visible
      }, 800);
    }
  }

  typeLine();
}

function yesResponse() {
  const finalText = document.getElementById("propose-final");
  const loveButtons = document.querySelector(".love-buttons");

  loveButtons.style.opacity = "0";
  loveButtons.style.pointerEvents = "none";

  finalText.innerHTML = "Ohh Thankyou!! Badi mehnat lagi hai ise banane me😌❤️";
  finalText.classList.add("show-line");
}

function activateNoButton() {
  const noBtn = document.getElementById("no-button");
  const container = document.querySelector(".love-buttons");

  noBtn.onmouseenter = function () {

    const maxX = container.offsetWidth - noBtn.offsetWidth - 20;
    const maxY = 50;

    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
  };
}

function closeProposeModal() {
  document.getElementById("propose-modal").style.display = "none";
  restoreVolume();
}

function openChocolateDay() {
  reduceVolume();
  document.getElementById("chocolate-modal").style.display = "flex";

  const message = [
    "Some things are sweet…",
    "Like chocolate.",
    "",
    "But some things are sweeter.",
    "Like you ❤️"
  ];

  typeDayMessage("chocolate-message", message, "choco-btn");
}

function chocolateResponse() {
  const finalText = document.getElementById("chocolate-final");
  finalText.innerHTML = "But I am your favourite sweet🤭🍫";
  finalText.classList.add("show-line");
}

function closeChocolateModal() {
  document.getElementById("chocolate-modal").style.display = "none";
  restoreVolume();
}

function openTeddyDay() {
  reduceVolume();
  document.getElementById("teddy-modal").style.display = "flex";

  const message = [
    "Life gets messy sometimes…",
    "But you are there to make it better.",
    "",
    "If I could, I’d hug you right now 🤍"
  ];

  typeDayMessage("teddy-message", message, "hug-btn");
}

function teddyResponse() {
  const finalText = document.getElementById("teddy-final");
  finalText.innerHTML = "Consider this your official warm hug 🤗❤️";
  finalText.classList.add("show-line");
}

function closeTeddyModal() {
  document.getElementById("teddy-modal").style.display = "none";
  restoreVolume();
}

/* ---------------- PROMISE DAY ---------------- */

function openPromiseDay() {
  reduceVolume();
  document.getElementById("promise-modal").style.display = "flex";

  const message = [
    "I don’t promise fairy tales.",
    "But I promise…",
    "",
    "To choose you.",
    "To annoy you.",
    "To stand by you.",
    "To make you laugh.",
    "To tease you.",
    "To support you.",
    "And make you happy.",
    "",
    "And maybe steal your fries sometimes 😌"
  ];

  typeDayMessage("promise-message", message, "promise-btn");
}

function promiseResponse() {
  const finalText = document.getElementById("promise-final");
  finalText.innerHTML = "Deal sealed 🤝❤️";
  finalText.classList.add("show-line");
}

function closePromiseModal() {
  document.getElementById("promise-modal").style.display = "none";
  restoreVolume();
}

function openHugDay() {
  reduceVolume();
  document.getElementById("hug-modal").style.display = "flex";

  const message = [
    "Some days are heavy…",
    "Some days are chaotic…",
    "Some days we fight with the world…",
    "Some days with each other…",
    "Some days we just need to escape it all…",
    "And give each other a long hug.",
    "",
    "Everything feels lighter.",
    "And sleep peacefully in each other’s arms.",
    "",
  ];

  typeDayMessage("hug-message", message, "hugday-btn");
}

function hugResponse() {
  const finalText = document.getElementById("hug-final");
  finalText.innerHTML = "When things get tough, I’m here for you 🤗❤️";
  finalText.classList.add("show-line");
}

function closeHugModal() {
  document.getElementById("hug-modal").style.display = "none";
  restoreVolume();
}

function openKissDay() {
  reduceVolume();

  const modal = document.getElementById("kiss-modal");
  const finalText = document.getElementById("kiss-final");
  const container = document.getElementById("kiss-animation-container");

  modal.style.display = "flex";

  // reset state
  finalText.innerHTML = "";
  finalText.classList.remove("show-line");

  container.innerHTML = "";

  const message = [
    "Okay listen…",
    "I have a news for you.",
    "",
    "Scientist found something sweeter than chocolate.",
    "And it’s your kiss ❤️",
    "",
    "A kiss a day keeps the doctor away, they say.",
    "So I guess we are safe from doctors forever 😌"
  ];

  typeDayMessage("kiss-message", message, "kiss-btn");
}


function kissResponse() {

  const container = document.getElementById("kiss-animation-container");
  const button = document.getElementById("kiss-btn");
  const finalText = document.getElementById("kiss-final");

  // clear previous kisses if any
  container.innerHTML = "";

  // get button position
  const btnRect = button.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const startX = btnRect.left - containerRect.left + btnRect.width / 2;
  const startY = btnRect.top - containerRect.top;

  // create flying kisses
  for (let i = 0; i < 8; i++) {

    const kiss = document.createElement("div");
    kiss.className = "kiss";
    kiss.innerHTML = "💋";

    kiss.style.left = startX + "px";
    kiss.style.top = startY + "px";

    kiss.style.setProperty("--x", (Math.random() * 200 - 100) + "px");

    kiss.style.animationDelay = (i * 0.15) + "s";

    container.appendChild(kiss);

    setTimeout(() => kiss.remove(), 3000);
  }

  // show final text after animation
  finalText.classList.remove("show-line");

  setTimeout(() => {
    finalText.innerHTML = "😘❤️😘❤️😘❤️😘❤️😘❤️😘❤️ ";
    finalText.classList.add("show-line");
  }, 1200);
}

function closeKissModal() {
  document.getElementById("kiss-modal").style.display = "none";
  restoreVolume();
}

function openValentineDay() {
  reduceVolume();
  document.getElementById("valentine-modal").style.display = "flex";

  const message = [
    "All these days…",
    "All these little moments…",
    "They all lead to this.",
    "",
    "I’m grateful for you.",
    "Today and always."
  ];

  typeDayMessage("valentine-message", message, "valentine-btn");
}

function valentineResponse() {
  const finalText = document.getElementById("valentine-final");

  if (isPlaying) music.volume = 0.5;

  finalText.innerHTML = "Happy Valentine’s Day, my love ❤️";
  finalText.classList.add("show-line");
}

function closeValentineModal() {
  document.getElementById("valentine-modal").style.display = "none";
  restoreVolume();
}


/* ---------------- GENERAL ---------------- */

function wrongAnswer() {
  document.getElementById("custom-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("custom-popup").style.display = "none";
}

function correctAnswer() {
  document.getElementById("welcome-page").classList.remove("active");
  document.getElementById("calendar-page").classList.add("active");
}

/* Sparkles */
const sparkleContainer = document.querySelector(".sparkle-container");

for (let i = 0; i < 20; i++) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.animationDuration = 6 + Math.random() * 6 + "s";
  sparkle.style.animationDelay = Math.random() * 5 + "s";
  sparkle.style.opacity = 0.3 + Math.random() * 0.4;

  sparkleContainer.appendChild(sparkle);
}
