import "./styles.css";

const inputEl = document.getElementById("input");
const tasks = document.getElementById("tasks");
const addButton = document.getElementById("add_button");

tasks.innerHTML = localStorage.getItem("list") || "";

let editEvent = null;

function addTask() {
  const taskValue = inputEl.value.trim();
  if (addButton.textContent === "Update") {
    addButton.textContent = "Add";
    editEvent.target.parentElement.parentElement.childNodes[0].data =
      inputEl.value;
    editEvent.target.parentElement.parentElement.classList.remove("edit");
    editEvent = null;
  } else if (taskValue) {
    const li = createTaskElement(taskValue);
    tasks.appendChild(li);
  }
  inputEl.value = "";
  saveData();
}

function createTaskElement(taskValue) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${taskValue} 
    <div class="editCrossContainer">
      <span id="edit">✍️</span>
      <span id="cross">❌</span>
    </div>
  `;
  return li;
}

function checkUncheck(e) {
  e.stopPropagation();
  editEvent = e;
  e.target.classList.toggle("checked");
  if (e.target.tagName === "SPAN" && e.target.id === "cross") {
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.tagName === "SPAN" && e.target.id === "edit") {
    editText(e);
  }
  saveData();
}

function editText(e) {
  inputEl.focus();
  e.target.parentElement.parentElement.className = "edit";
  addButton.textContent = "Update";
  inputEl.value =
    e.target.parentElement.parentElement.childNodes[0].data.trim();
}

function saveData() {
  localStorage.setItem("list", tasks.innerHTML);
}

addButton.addEventListener("click", addTask);
tasks.addEventListener("click", checkUncheck);
