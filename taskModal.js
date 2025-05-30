// taskModal.js
import { getTasks, setTasks } from "./taskData.js";
import { clearExistingTasks, renderTasks } from "./taskRender.js";

let currentTaskId = null;

export function openTaskModal(task) {
  currentTaskId = task.id;

  const modal = document.getElementById("task-modal");
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status;

  document.getElementById("deleteBtn").style.display = "inline-block";
  document.getElementById("saveBtn").style.display = "inline-block";
  document.getElementById("createBtn").style.display = "none";

  modal.showModal();
}

export function openNewTaskModal() {
  currentTaskId = null;

  const modal = document.getElementById("task-modal");
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
  document.getElementById("task-status").value = "todo";

  document.getElementById("deleteBtn").style.display = "none";
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("createBtn").style.display = "inline-block";

  modal.showModal();
}

export function setupModalHandlers() {
  const modal = document.getElementById("task-modal");

  const saveBtn = document.getElementById("saveBtn");
  const createBtn = document.getElementById("createBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  document.getElementById("close-modal-btn").addEventListener("click", () => modal.close());

  saveBtn.addEventListener("click", () => {
    if (!titleInput.value.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const tasks = getTasksSync();
    if (currentTaskId !== null) {
      const task = tasks.find(t => t.id === currentTaskId);
      if (task) {
        task.title = titleInput.value;
        task.description = descInput.value;
        task.status = statusSelect.value;
      }
      setTasks(tasks);
      clearExistingTasks();
      renderTasks(tasks);
      modal.close();
    }
  });

  createBtn.addEventListener("click", () => {
    if (!titleInput.value.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const tasks = getTasksSync();
    tasks.push({
      id: Date.now(),
      title: titleInput.value,
      description: descInput.value,
      status: statusSelect.value,
    });
    setTasks(tasks);
    clearExistingTasks();
    renderTasks(tasks);
    modal.close();
  });

  deleteBtn.addEventListener("click", () => {
    if (currentTaskId !== null) {
      const tasks = getTasksSync().filter(t => t.id !== currentTaskId);
      setTasks(tasks);
      clearExistingTasks();
      renderTasks(tasks);
      modal.close();
    }
  });
}

// A helper function to get tasks synchronously from localStorage
function getTasksSync() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
