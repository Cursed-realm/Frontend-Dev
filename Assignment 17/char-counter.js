// Live character counter with warnings and typing limit

const textarea = document.getElementById("message");
const remainingSpan = document.getElementById("char-remaining");
const resetBtn = document.getElementById("reset-btn");

const MAX_CHARS = 100;

// Update counter UI
function updateCounter() {
  const length = textarea.value.length;
  const remaining = MAX_CHARS - length;
  remainingSpan.textContent = remaining;

  // Color changes based on remaining chars
  if (remaining <= 0) {
    remainingSpan.style.color = "red";
  } else if (remaining <= 20) {
    remainingSpan.style.color = "orange"; // yellow/orange warning
  } else {
    remainingSpan.style.color = "black";
  }
}

// Handle typing and prevent extra characters beyond 100
textarea.addEventListener("keydown", (event) => {
  const length = textarea.value.length;

  // Allow control keys (Backspace, Delete, arrows etc.)
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab"
  ];

  if (length >= MAX_CHARS && !allowedKeys.includes(event.key)) {
    // already at limit → prevent more typing
    event.preventDefault();
  }
});

textarea.addEventListener("input", updateCounter);

// Reset button clears everything
resetBtn.addEventListener("click", () => {
  textarea.value = "";
  updateCounter();
});

// Initialize on page load
updateCounter();
