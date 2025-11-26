const search = document.getElementById("search");
const tbody = document.querySelector("#students tbody");
const noRes = document.getElementById("empty");

search.addEventListener("input", () => {
  const val = search.value.toLowerCase();
  let visibleCount = 0;

  for (let tr of tbody.rows) {
    const rowText = tr.textContent.toLowerCase();
    if (rowText.includes(val)) {
      tr.style.display = "";
      visibleCount++;
    } else {
      tr.style.display = "none";
    }
  }

  noRes.style.display = visibleCount === 0 ? "block" : "none";
});
