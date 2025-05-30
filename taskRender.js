// taskRender.js
import { openTaskModal } from "./taskModal.js";

export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "";
  });
}

function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column?.querySelector(".tasks-container") || null;
}

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => openTaskModal(task));
  return taskDiv;
}

export function renderTasks(taskArray) {
  taskArray.forEach(task => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      container.appendChild(createTaskElement(task));
    }
  });
}
