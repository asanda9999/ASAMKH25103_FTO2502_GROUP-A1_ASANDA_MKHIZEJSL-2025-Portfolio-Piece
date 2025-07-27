// taskRender.js
import { openTaskModal } from "./taskModal.js";

// Clears all existing task elements from their containers
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "";
  });
}

// Finds the task container div for a given status
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column?.querySelector(".tasks-container") || null;
}

// Creates a single task DOM element with click-to-edit behavior
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => openTaskModal(task));
  return taskDiv;
}

// Updates the headers with the number of tasks in each column
function updateColumnCounts(tasks) {
  const counts = {
    todo: 0,
    doing: 0,
    done: 0,
  };

  tasks.forEach(task => {
    if (counts.hasOwnProperty(task.status)) {
      counts[task.status]++;
    }
  });

  const todoText = document.getElementById("todoText");
  const doingText = document.getElementById("doingText");
  const doneText = document.getElementById("doneText");

  if (todoText) todoText.textContent = `TODO (${counts.todo})`;
  if (doingText) doingText.textContent = `DOING (${counts.doing})`;
  if (doneText) doneText.textContent = `DONE (${counts.done})`;
}

// Renders all tasks to the appropriate status columns
export function renderTasks(taskArray) {
  console.log('Rendering tasks:', taskArray);
  
  // Clear all containers first
  clearExistingTasks();
  
  taskArray.forEach(task => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
      console.log(`Task "${task.title}" placed in ${task.status} column`);
    } else {
      console.warn(`No container found for status: ${task.status}`);
    }
  });

  updateColumnCounts(taskArray);
}
