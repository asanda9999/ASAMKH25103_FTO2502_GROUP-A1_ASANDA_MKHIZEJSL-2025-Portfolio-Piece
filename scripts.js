import { getTasks } from "./taskData.js";
import { clearExistingTasks, renderTasks } from "./taskRender.js";
import { setupModalHandlers, openNewTaskModal } from "./taskModal.js";
import { showLoading, hideLoading } from "./loading.js";
import { setupThemeToggle } from "./themeToggle.js";
import { setupSidebarToggle } from "./sidebarToggle.js";

// Initialize and render tasks, set up modal and new task button
async function initTaskBoard() {
  showLoading();

  const tasks = await getTasks();

  clearExistingTasks();
  renderTasks(tasks);

  hideLoading();

  setupModalHandlers();

  const addNewTaskBtn = document.getElementById("add-new-task-btn");
  if (addNewTaskBtn) {
    addNewTaskBtn.addEventListener("click", openNewTaskModal);
  }
}

// Run on DOM ready: initialize task board, theme, and sidebar toggles
document.addEventListener("DOMContentLoaded", () => {
  initTaskBoard();
  setupThemeToggle();
  setupSidebarToggle();
});
