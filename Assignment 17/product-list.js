const productInput = document.getElementById("product-input");
const addBtn = document.getElementById("add-btn");
const productList = document.getElementById("product-list");

let currentlyEditing = null; 

addBtn.addEventListener("click", () => {
  const name = productInput.value.trim();
  if (!name) return;

  const li = document.createElement("li");
  li.className = "product-item";

  const span = document.createElement("span");
  span.className = "product-name";
  span.textContent = name;

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  productList.appendChild(li);
  productInput.value = "";
});

productList.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("delete-btn")) {
    const li = target.closest(".product-item");
    if (li) li.remove();
    return;
  }
  if (target.classList.contains("edit-btn")) {
    const li = target.closest(".product-item");
    if (!li) return;

    const nameSpan = li.querySelector(".product-name");

    if (currentlyEditing && currentlyEditing.parentElement === li) return;
    if (currentlyEditing) {
      saveCurrentEdit();
    }
    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = nameSpan.textContent;

    li.insertBefore(input, nameSpan);
    li.removeChild(nameSpan);

    input.focus();
    currentlyEditing = input;
  }
});

document.addEventListener("click", (event) => {
  if (!currentlyEditing) return;

  const li = currentlyEditing.closest(".product-item");
  if (li && li.contains(event.target)) {
    return;
  }

  saveCurrentEdit();
});

function saveCurrentEdit() {
  if (!currentlyEditing) return;

  const li = currentlyEditing.closest(".product-item");
  const newName = currentlyEditing.value.trim() || "Unnamed product";

  const nameSpan = document.createElement("span");
  nameSpan.className = "product-name";
  nameSpan.textContent = newName;

  li.insertBefore(nameSpan, currentlyEditing);
  li.removeChild(currentlyEditing);

  currentlyEditing = null;
}
