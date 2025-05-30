// taskModal.js
import { getTasks, setTasks } from "./taskData.js";
import { clearExistingTasks, renderTasks } from "./taskRender.js";

let currentTaskId = null;

// Opens modal for editing an existing task
export function openTaskModal(task) {
  currentTaskId = task.id;

  const modal = document.getElementById("task-modal");

  // Populate modal fields with task data
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status;

  // Show edit-related buttons, hide create button
  document.getElementById("deleteBtn").style.display = "inline-block";
  document.getElementById("saveBtn").style.display = "inline-block";
  document.getElementById("createBtn").style.display = "none";

  modal.showModal(); // Display the modal
}

// Opens modal for creating a new task
export function openNewTaskModal() {
  currentTaskId = null;

  const modal = document.getElementById("task-modal");

  // Clear input fields for new task creation
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
  document.getElementById("task-status").value = "todo";

  // Show create button, hide edit-related buttons
  document.getElementById("deleteBtn").style.display = "none";
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("createBtn").style.display = "inline-block";

  modal.showModal(); // Display the modal
}

// Attach event listeners to modal buttons
export function setupModalHandlers() {
  const modal = document.getElementById("task-modal");

  const saveBtn = document.getElementById("saveBtn");
  const createBtn = document.getElementById("createBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  // Close modal on button click
  document.getElementById("close-modal-btn").addEventListener("click", () => modal.close());

  // Save updated task data
  saveBtn.addEventListener("click", () => {
    if (!titleInput.value.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const tasks = getTasksSync();
    if (currentTaskId !== null) {
      const task = tasks.find(t => t.id === currentTaskId);
      if (task) {
        // Update task fields
        task.title = titleInput.value;
        task.description = descInput.value;
        task.status = statusSelect.value;
      }

      // Save updated task list and refresh UI
      setTasks(tasks);
      clearExistingTasks();
      renderTasks(tasks);
      modal.close();
    }
  });

  // Create and add a new task
  createBtn.addEventListener("click", () => {
    if (!titleInput.value.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const tasks = getTasksSync();
    tasks.push({
      id: Date.now(), // Unique ID using timestamp
      title: titleInput.value,
      description: descInput.value,
      status: statusSelect.value,
    });

    // Save and display updated task list
    setTasks(tasks);
    clearExistingTasks();
    renderTasks(tasks);
    modal.close();
  });

  // Delete the currently edited task
  deleteBtn.addEventListener("click", () => {
    if (currentTaskId !== null) {
      const tasks = getTasksSync().filter(t => t.id !== currentTaskId);

      // Save filtered list and refresh UI
      setTasks(tasks);
      clearExistingTasks();
      renderTasks(tasks);
      modal.close();
    }
  });
}

// Synchronous helper to fetch tasks directly from localStorage
function getTasksSync() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
