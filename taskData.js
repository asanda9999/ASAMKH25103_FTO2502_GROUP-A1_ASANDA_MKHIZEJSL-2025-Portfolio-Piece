// taskData.js
import { fetchTasks, saveTasks, updateTask, deleteTask } from "./apiService.js";

// Asynchronously fetch tasks from API
export async function getTasks() {
  try {
    const tasks = await fetchTasks();
    
    // Check if we have any recent local updates that should override API data
    const lastUpdate = JSON.parse(localStorage.getItem('lastUpdatedTask') || '{}');
    const timeSinceUpdate = Date.now() - (lastUpdate.timestamp || 0);
    
    // If we have a recent update (within last 10 seconds), apply it to the API data
    if (lastUpdate.id && timeSinceUpdate < 10000) {
      const updatedTasks = tasks.map(task => 
        task.id === lastUpdate.id ? { ...task, status: lastUpdate.status } : task
      );
      console.log('Applied recent local update to API data');
      return updatedTasks;
    }
    
    return tasks;
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
}

// Save the updated task list to API
export async function setTasks(tasks) {
  try {
    await saveTasks(tasks);
    return { success: true };
  } catch (error) {
    console.error('Error setting tasks:', error);
    return { success: false, error: error.message };
  }
}

// Update a specific task
export async function updateTaskById(taskId, updatedTask) {
  try {
    console.log('Updating task:', taskId, 'with data:', updatedTask);
    const result = await updateTask(taskId, updatedTask);
    console.log('Update result:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating task:', error);
    return { success: false, error: error.message };
  }
}

// Delete a task
export async function deleteTaskById(taskId) {
  try {
    await deleteTask(taskId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: error.message };
  }
}
