const container = document.getElementById("bubble-container");

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const size = 35 + Math.random() * 45;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.animationDuration = (8 + Math.random() * 6) + "s";

bubble.addEventListener("mousedown", (e) => {
  e.stopPropagation();

  // stop movement immediately
  bubble.style.animation = "none";

  bubble.classList.add("pop");

  setTimeout(() => {
    if (bubble.parentNode) bubble.remove();
  }, 350);
});


  container.appendChild(bubble);

  // Auto cleanup
  setTimeout(() => {
    if (bubble.parentNode) bubble.remove();
  }, 16000);
}

// Generate bubbles
setInterval(createBubble, 400);
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");

yesBtn.addEventListener("click", () => {
  response.textContent = "I’m really glad you said yes 🌸 This made me smile.";
});

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 200;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});
let noStartTime = null;
let popupShown = false;
let popupMoveInterval = null;

// create popup
const popup = document.createElement("div");
popup.className = "popup";
popup.innerHTML = `
  <p>😅 You’re really trying to say no?<br>Think once more 💖</p>
`;
document.body.appendChild(popup);

// move popup randomly
function movePopupRandomly() {
  const maxX = window.innerWidth - popup.offsetWidth;
  const maxY = window.innerHeight - popup.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  popup.style.left = x + "px";
  popup.style.top = y + "px";
}

// detect No attempts
noBtn.addEventListener("mouseenter", () => {
  if (!noStartTime) {
    noStartTime = Date.now();
  }

  if (!popupShown && Date.now() - noStartTime >= 5000) {
    popupShown = true;
    popup.style.display = "block";

    // start moving popup
    movePopupRandomly();
    popupMoveInterval = setInterval(movePopupRandomly, 800);

    // auto hide after 10 seconds
    setTimeout(() => {
      popup.style.display = "none";
      clearInterval(popupMoveInterval);
    }, 10000);
  }
});

// reset timer if she stops trying
noBtn.addEventListener("mouseleave", () => {
  noStartTime = null;
});



