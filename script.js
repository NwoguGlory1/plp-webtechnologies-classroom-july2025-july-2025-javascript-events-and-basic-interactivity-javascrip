// ==============================
// 1. Function Examples (Scope, Params, Return)
// ==============================

// Global variable example
let boxState = "reset";

// Reusable function with parameters and return values
function triggerBoxAnimation(type) {
  const box = document.getElementById("box");

  // Reset previous state
  box.className = "box";

  if (type === "slide") {
    box.classList.add("slide");
    boxState = "slid";
  } else if (type === "fade") {
    box.classList.add("fade");
    boxState = "faded";
  } else {
    boxState = "reset";
  }

  // Return new state
  return boxState;
}

// ==============================
// 2. Card Flip (demonstrates DOM + scope)
// ==============================
const card = document.getElementById("card");
card.addEventListener("click", function () {
  card.classList.toggle("flipped");
});

// ==============================
// 3. Modal System
// ==============================
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

// Show modal
openBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Hide modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});