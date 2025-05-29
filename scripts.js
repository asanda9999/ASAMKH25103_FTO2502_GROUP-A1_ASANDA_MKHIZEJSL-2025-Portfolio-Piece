import { initialTasks } from "./initialData.js";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [...initialTasks];
let currentTaskId = null; // To track the currently edited task

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}

function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

function renderTasks(taskArray) {
  taskArray.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

function openTaskModal(task) {
  currentTaskId = task.id; // Track task being edited

  const modal = document.getElementById("task-modal");
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status;

  document.getElementById("deleteBtn").style.display = "inline-block"; // Show delete button
  modal.showModal();
}

function openNewTaskModal() {
  currentTaskId = null; // No current task for new task

  const modal = document.getElementById("task-modal");
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
  document.getElementById("task-status").value = "todo"; // default status

  document.getElementById("deleteBtn").style.display = "none"; // Hide delete button for new task
  modal.showModal();
}

function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  document.getElementById("close-modal-btn").addEventListener("click", () => {
    modal.close();
  });
}

function setupModalSaveDeleteHandlers() {
  const modal = document.getElementById("task-modal");

  const saveBtn = document.getElementById("saveBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  saveBtn.addEventListener("click", () => {
    if (!titleInput.value.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    if (currentTaskId === null) {
      // Create new task
      const newTask = {
        id: Date.now(), // unique id based on timestamp
        title: titleInput.value,
        description: descInput.value,
        status: statusSelect.value,
      };
      tasks.push(newTask);
    } else {
      // Update existing task
      const task = tasks.find((t) => t.id === currentTaskId);
      if (task) {
        task.title = titleInput.value;
        task.description = descInput.value;
        task.status = statusSelect.value;
      }
    }

    saveTasksToLocalStorage(); // Save after add/update
    clearExistingTasks();
    renderTasks(tasks);
    modal.close();
  });

  deleteBtn.addEventListener("click", () => {
    if (currentTaskId !== null) {
      tasks = tasks.filter((t) => t.id !== currentTaskId);
      saveTasksToLocalStorage(); // Save after delete
      clearExistingTasks();
      renderTasks(tasks);
      modal.close();
    }
  });
}

function initTaskBoard() {
  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupModalSaveDeleteHandlers();

  // Setup new task button handler
  const addNewTaskBtn = document.getElementById("add-new-task-btn");
  if (addNewTaskBtn) {
    addNewTaskBtn.addEventListener("click", () => {
      openNewTaskModal();
    });
  }
}

function setupThemeToggle() {
  const checkbox = document.getElementById("theme-toggle-checkbox");
  const body = document.body;

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}

function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const showBtn = document.getElementById("show-sidebar-btn");
  const hideBtn = document.getElementById("hide-sidebar-btn");




  // Hide sidebar and show floating button
  hideBtn.addEventListener("click", () => {
    sidebar.classList.add("closed");
    showBtn.style.display = "block";
  });

  // Show sidebar and hide floating button
  showBtn.addEventListener("click", () => {
    sidebar.classList.remove("closed");
    showBtn.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTaskBoard();
  setupThemeToggle();
  setupSidebarToggle();
   
});


