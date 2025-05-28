

import { fetchTasksFromAPI } from './API.js';
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from './storage.js';

let initialTasks = [];
let currentTaskId = null;

const statusMessage = document.getElementById("statusMessage");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

function showLoading() {
  statusMessage.classList.remove("hidden");
  loadingMessage.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

function showError() {
  statusMessage.classList.remove("hidden");
  loadingMessage.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}

function hideStatus() {
  statusMessage.classList.add("hidden");
  loadingMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");
}

async function loadTasks() {
  showLoading();
  try {
    const tasks = await fetchTasksFromAPI();
    initialTasks = tasks;
    saveTasksToLocalStorage(initialTasks);
    renderTasks();
    hideStatus();
  } catch (e) {
    console.error("API fetch error:", e);
    initialTasks = getTasksFromLocalStorage();
    if (initialTasks.length > 0) {
      renderTasks();
      hideStatus();
    } else {
      showError();
    }
  }
}

function renderTasks() {
  const columns = {
    todo: document.querySelector('#todo-column .tasks'),
    doing: document.querySelector('#doing-column .tasks'),
    done: document.querySelector('#done-column .tasks'),
  };

  Object.values(columns).forEach(col => col.innerHTML = '');

  initialTasks.forEach(task => {
    const taskElement = document.createElement('span');
    taskElement.classList.add('task');
    taskElement.textContent = task.title;
    taskElement.title = task.description;
    taskElement.addEventListener('click', () => openModal(task.id));
    columns[task.status]?.appendChild(taskElement);
  });
}

function openModal(taskId) {
  currentTaskId = taskId;
  const task = initialTasks.find(k => k.id === taskId);
  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDescription").value = task.description;
  document.getElementById("taskStatus").value = task.status;
  document.getElementById("taskModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("taskModal").classList.add("hidden");
  currentTaskId = null;
}

function saveTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const status = document.getElementById("taskStatus").value;

  const task = initialTasks.find(k => k.id === currentTaskId);
  if (task) {
    task.title = title;
    task.description = description;
    task.status = status;
  }

  saveTasksToLocalStorage(initialTasks);
  renderTasks();
  closeModal();
}

function deleteTask() {
  const index = initialTasks.findIndex(k => k.id === currentTaskId);
  if (index !== -1) {
    initialTasks.splice(index, 1);
    saveTasksToLocalStorage(initialTasks);
    renderTasks();
    closeModal();
  }
}

function setupAddTaskModal() {
  document.querySelector(".add-task-button").addEventListener("click", () => {
    document.getElementById("newTaskTitle").value = "";
    document.getElementById("newTaskDescription").value = "";
    document.getElementById("newTaskStatus").value = "todo";
    document.getElementById("addTaskModal").classList.remove("hidden");
  });

  document.getElementById("addCloseBtn").addEventListener("click", () => {
    document.getElementById("addTaskModal").classList.add("hidden");
  });

  document.getElementById("addTaskSaveBtn").addEventListener("click", () => {
    const title = document.getElementById("newTaskTitle").value.trim();
    const description = document.getElementById("newTaskDescription").value.trim();
    const status = document.getElementById("newTaskStatus").value;
    const modalError = document.getElementById("modalError");

    if (!title || !description) {
      modalError.textContent = "❗ Please fill out this field.";
      modalError.classList.remove("hidden");
      return;
    } else {
      modalError.textContent = "";
      modalError.classList.add("hidden");
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status
    };

    initialTasks.push(newTask);
    saveTasksToLocalStorage(initialTasks);
    renderTasks();
    document.getElementById("addTaskModal").classList.add("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupAddTaskModal();
  document.getElementById("saveBtn").addEventListener("click", saveTask);
  document.getElementById("deleteBtn").addEventListener("click", deleteTask);
  document.getElementById("closeBtn").addEventListener("click", closeModal);
});
