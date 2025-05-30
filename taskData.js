// taskData.js
import { initialTasks } from "./initialData.js";

export function getTasks() {
  // Simulate async fetch with a delay (300ms)
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [...initialTasks];
      resolve(tasks);
    }, 300);
  });
}

export function setTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
