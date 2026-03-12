document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("value");
    const val = input.value.trim();

    if (!val) {
      showError("Value field must not be empty");
      return;
    }

    const res = await fetch(form.action, {
      method: form.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: val }),
    });
    const data = await res.json();

    if (data.status === "ok") {
      addItem(data.value, data.id);
      input.value = "";
    } else {
      showError(data.value);
    }
  });
});

function addItem(value, id) {
  const list = document.getElementById("list");
  const li = document.createElement("li");
  li.id = id;
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML =
    `<span>${escapeHtml(value)}</span>` +
    `<button class="btn btn-danger btn-sm" data-id="${id}" onclick="deleteItem(this)">Delete</button>`;
  list.appendChild(li);
}

async function deleteItem(button) {
  const id = button.dataset.id;
  const res = await fetch(`/values/${id}`, { method: "DELETE" });
  const data = await res.json();

  if (data.status === "ok") {
    document.getElementById(data.value).remove();
  } else {
    showError(data.value);
  }
}

function showError(message) {
  document.getElementById("errorField").textContent = message;
  const modal = new bootstrap.Modal(document.getElementById("errorModal"));
  modal.show();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
