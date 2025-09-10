// =========================================
// PART 1: EVENT HANDLING SETUP
// =========================================
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  initializeThemeToggle();
  initializeTabSystem();
  initializeCounterGame();
  initializeFAQSystem();
  initializeDropdownMenu();
  initializeFormValidation();
  initializeInteractiveCards();
});

// Dummy placeholder so your code won’t break
function initializeEventListeners() {}

// =========================================
// THEME TOGGLE FUNCTIONALITY
// =========================================
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = "☀️ Light Mode";
  }

  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = "☀️ Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.innerHTML = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });
}

// =========================================
// TAB SYSTEM FUNCTIONALITY
// =========================================
function initializeTabSystem() {
  const tabButtons = document.querySelectorAll(".nav-tab");
  const contentSections = document.querySelectorAll(".content-section");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");
      tabButtons.forEach((tab) => tab.classList.remove("active"));
      contentSections.forEach((section) => section.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
}

// =========================================
// INTERACTIVE ELEMENTS
// =========================================
function initializeCounterGame() {
  const counterDisplay = document.getElementById("counterDisplay");
  const incrementBtn = document.getElementById("incrementBtn");
  const decrementBtn = document.getElementById("decrementBtn");
  const multiplyBtn = document.getElementById("multiplyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const historyElement = document.getElementById("transactionHistory");

  let counter = 0;
  let history = [];

  function updateCounter(newValue, action) {
    counter = newValue;
    counterDisplay.textContent = counter;
    history.unshift(action);
    if (history.length > 5) history.pop();
    historyElement.textContent = `Recent: ${history.join(" → ")}`;
    counterDisplay.style.transform = "scale(1.1)";
    setTimeout(() => {
      counterDisplay.style.transform = "scale(1)";
    }, 200);
  }

  incrementBtn.addEventListener("click", () => updateCounter(counter + 1, "+1"));
  decrementBtn.addEventListener("click", () =>
    updateCounter(Math.max(0, counter - 1), "-1")
  );
  multiplyBtn.addEventListener("click", () =>
    updateCounter(counter * 2, "×2")
  );
  resetBtn.addEventListener("click", () => {
    updateCounter(0, "Reset");
    history = [];
    historyElement.textContent = "";
  });

  document.addEventListener("keydown", function (e) {
    if (document.getElementById("interactive").classList.contains("active")) {
      switch (e.key) {
        case "+":
        case "=":
          incrementBtn.click();
          break;
        case "-":
          decrementBtn.click();
          break;
        case "*":
          multiplyBtn.click();
          break;
        case "r":
        case "R":
          resetBtn.click();
          break;
      }
    }
  });
}

// FAQ Collapsible System
function initializeFAQSystem() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");
      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        faq.querySelector(".faq-answer").classList.remove("open");
      });
      if (!isActive) {
        item.classList.add("active");
        answer.classList.add("open");
      }
    });
  });
}

// Dropdown Menu System
function initializeDropdownMenu() {
  const dropdownToggle = document.getElementById("dropdownToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const selectedTech = document.getElementById("selectedTech");

  dropdownToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  dropdownMenu.addEventListener("click", function (e) {
    if (e.target.classList.contains("dropdown-item")) {
      e.preventDefault();
      const techDisplayName = e.target.textContent;
      selectedTech.textContent = `Selected: ${techDisplayName}`;
      selectedTech.style.color = "var(--primary-color)";
      dropdownMenu.classList.remove("show");
    }
  });

  document.addEventListener("click", () => dropdownMenu.classList.remove("show"));
}

// Interactive Cards
function initializeInteractiveCards() {
  const cards = document.querySelectorAll(".interactive-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
      this.style.borderColor = "var(--primary-color)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
      this.style.borderColor = "var(--border-light)";
    });
    card.addEventListener("click", function () {
      this.style.background = "var(--primary-color)";
      this.style.color = "white";
      setTimeout(() => {
        this.style.background = "";
        this.style.color = "";
      }, 300);
    });
  });
}

// =========================================
// FORM VALIDATION
// =========================================
function initializeFormValidation() {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll(".form-input");

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateField(this);
    });
    input.addEventListener("blur", function () {
      validateField(this);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isFormValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isFormValid = false;
    });
    if (isFormValid) showFormSuccess();
    else {
      const firstInvalid = form.querySelector(".form-input.invalid");
      if (firstInvalid) firstInvalid.focus();
    }
  });
}

function validateField(input) {
  // Validation logic (same as before)
}

function showFormSuccess() {
  const feedback = document.getElementById("formFeedback");
  feedback.style.display = "block";
}
