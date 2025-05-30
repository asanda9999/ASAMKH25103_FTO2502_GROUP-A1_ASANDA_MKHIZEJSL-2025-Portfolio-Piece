// taskData.js
import { initialTasks } from "./initialData.js";

// Asynchronously fetch tasks from localStorage, falling back to initial data
export function getTasks() {
  // Simulate async fetch with a 300ms delay (mimics server call)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Try to get tasks from localStorage or fallback to default data
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [...initialTasks];
      resolve(tasks);
    }, 300);
  });
}

// Save the updated task list to localStorage
export function setTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
