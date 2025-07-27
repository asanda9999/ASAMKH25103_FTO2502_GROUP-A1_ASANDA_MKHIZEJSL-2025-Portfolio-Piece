// taskModal.js
import { getTasks, setTasks, updateTaskById, deleteTaskById } from "./taskData.js";
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
  saveBtn.addEventListener("click", async () => {
    if (!titleInput.value.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    if (currentTaskId !== null) {
      const updatedTask = {
        id: currentTaskId,
        title: titleInput.value,
        description: descInput.value,
        status: statusSelect.value,
        board: "Launch Career"
      };

      // Update task via API
      const result = await updateTaskById(currentTaskId, updatedTask);
      
      if (result.success) {
        // Update the UI immediately with the new data
        const currentTasks = await getTasks();
        const updatedTasks = currentTasks.map(task => 
          task.id === currentTaskId ? updatedTask : task
        );
        clearExistingTasks();
        renderTasks(updatedTasks);
        modal.close();
        
        // Store the updated task locally to prevent reverting
        localStorage.setItem('lastUpdatedTask', JSON.stringify({
          id: currentTaskId,
          status: updatedTask.status,
          timestamp: Date.now()
        }));
        
        // Optional: Refresh from API after a longer delay, but don't override if our update is newer
        setTimeout(async () => {
          try {
            const lastUpdate = JSON.parse(localStorage.getItem('lastUpdatedTask') || '{}');
            const timeSinceUpdate = Date.now() - (lastUpdate.timestamp || 0);
            
            // Only refresh if it's been more than 5 seconds since our update
            if (timeSinceUpdate > 5000) {
              const freshTasks = await getTasks();
              clearExistingTasks();
              renderTasks(freshTasks);
            }
          } catch (error) {
            console.error("Error refreshing tasks after update:", error);
          }
        }, 5000);
      } else {
        alert("Error updating task: " + result.error);
      }
    }
  });

  // Create and add a new task
  createBtn.addEventListener("click", async () => {
    if (!titleInput.value.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const newTask = {
      id: Date.now(), // Unique ID using timestamp
      title: titleInput.value,
      description: descInput.value,
      status: statusSelect.value,
      board: "Launch Career"
    };

    // Get current tasks and add new one
    const tasks = await getTasks();
    tasks.push(newTask);

    // Save updated task list via API
    const result = await setTasks(tasks);
    
    if (result.success) {
      clearExistingTasks();
      renderTasks(tasks);
      modal.close();
    } else {
      alert("Error creating task: " + result.error);
    }
  });

  // Delete the currently edited task
  deleteBtn.addEventListener("click", async () => {
    if (currentTaskId !== null) {
      // Delete task via API
      const result = await deleteTaskById(currentTaskId);
      
      if (result.success) {
        // Refresh tasks from API and update UI
        const tasks = await getTasks();
        clearExistingTasks();
        renderTasks(tasks);
        modal.close();
      } else {
        alert("Error deleting task: " + result.error);
      }
    }
  });
}
