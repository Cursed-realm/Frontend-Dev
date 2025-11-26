// Simple multi-step form with Next/Back and basic validation

const steps = Array.from(document.querySelectorAll(".step"));
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

const summarySection = document.getElementById("summary");
const summaryName = document.getElementById("summary-name");
const summaryEmail = document.getElementById("summary-email");
const summaryPassword = document.getElementById("summary-password");

let currentStepIndex = 0; // 0 → step 1, 1 → step 2, 2 → step 3

function showStep(index) {
  steps.forEach((step, i) => {
    step.style.display = i === index ? "block" : "none";
  });

  // Back button hidden on first step
  backBtn.style.display = index === 0 ? "none" : "inline-block";

  // Next button text changes to "Finish" on last step
  nextBtn.textContent = index === steps.length - 1 ? "Finish" : "Next";

  // Hide summary when navigating steps
  summarySection.style.display = "none";
}

// Basic validation for each step
function validateCurrentStep() {
  let isValid = true;

  // Clear all old errors
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";

  if (currentStepIndex === 0) {
    if (!nameInput.value.trim()) {
      nameError.textContent = "Name is required.";
      isValid = false;
    }
  }

  if (currentStepIndex === 1) {
    const email = emailInput.value.trim();
    if (!email) {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!email.includes("@")) {
      emailError.textContent = "Enter a valid email.";
      isValid = false;
    }
  }

  if (currentStepIndex === 2) {
    const password = passwordInput.value.trim();
    if (!password) {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
    }
  }

  return isValid;
}

// Next button logic
nextBtn.addEventListener("click", () => {
  // Validate current step first
  const ok = validateCurrentStep();
  if (!ok) return;

  // If on last step, show summary instead of moving further
  if (currentStepIndex === steps.length - 1) {
    summaryName.textContent = nameInput.value.trim();
    summaryEmail.textContent = emailInput.value.trim();
    summaryPassword.textContent = passwordInput.value.trim();
    summarySection.style.display = "block";
    return;
  }

  currentStepIndex++;
  showStep(currentStepIndex);
});

// Back button logic
backBtn.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    showStep(currentStepIndex);
  }
});

// Initialize
showStep(currentStepIndex);
