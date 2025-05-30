// main.js
import { getTasks } from "./taskData.js";
import { clearExistingTasks, renderTasks } from "./taskRender.js";
import { setupModalHandlers, openNewTaskModal } from "./taskModal.js";
import { showLoading, hideLoading } from "./loading.js";
import { setupThemeToggle } from "./themeToggle.js";
import { setupSidebarToggle } from "./sidebarToggle.js";

async function initTaskBoard() {
  showLoading();

  const tasks = await getTasks();

  clearExistingTasks();
  renderTasks(tasks);

  hideLoading();

  setupModalHandlers();

  // Setup new task button handler
  const addNewTaskBtn = document.getElementById("add-new-task-btn");
  if (addNewTaskBtn) {
    addNewTaskBtn.addEventListener("click", () => {
      openNewTaskModal();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTaskBoard();
  setupThemeToggle();
  setupSidebarToggle();
});
