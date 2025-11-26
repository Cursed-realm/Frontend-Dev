const box = document.getElementById("box");
const coords = document.getElementById("coords");

box.addEventListener("mousemove", e => {
  coords.textContent = `X: ${e.clientX} Y: ${e.clientY}`;
});

box.addEventListener("dblclick", e => {
  const dot = document.createElement("div");
  dot.style.width = "10px";
  dot.style.height = "10px";
  dot.style.background = "red";
  dot.style.borderRadius = "50%";
  dot.style.position = "absolute";
  // Position relative to box, accounting for box's offset in viewport
  const rect = box.getBoundingClientRect();

  dot.style.left = `${e.clientX - rect.left - 5}px`; // center dot horizontally
  dot.style.top = `${e.clientY - rect.top - 5}px`; // center dot vertically

  box.appendChild(dot);
});
