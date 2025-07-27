// apiService.js
// API service for task management

const API_BASE_URL = 'https://jsl-kanban-api.vercel.app';

// Fetch tasks from API
export async function fetchTasks() {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const tasks = await response.json();
    
    // The API returns tasks in the correct format, so no transformation needed
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Fallback to default tasks if API fails
    return getDefaultTasks();
  }
}

// Save tasks to API (POST/PUT request)
export async function saveTasks(tasks) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving tasks:', error);
    // Fallback to localStorage if API fails
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return { success: true, message: 'Saved to localStorage' };
  }
}

// Update a specific task
export async function updateTask(taskId, updatedTask) {
  try {
    console.log('Sending update to API:', `${API_BASE_URL}/${taskId}`, updatedTask);
    
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Task update successful:', result);
    
    // Also update localStorage as backup
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? updatedTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error updating task:', error);
    // Fallback to localStorage if API fails
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? updatedTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return { success: true, message: 'Updated in localStorage' };
  }
}

// Delete a task
export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    // Fallback to localStorage if API fails
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    return { success: true, message: 'Deleted from localStorage' };
  }
}

// Default tasks as fallback
function getDefaultTasks() {
  return [
    {
      id: 1,
      title: "Launch Epic Career 🚀",
      description: "Create a killer Resume",
      status: "todo",
      board: "Launch Career",
    },
    {
      id: 2,
      title: "Master JavaScript 💛",
      description: "Get comfortable with the fundamentals",
      status: "doing",
      board: "Launch Career",
    },
    {
      id: 3,
      title: "Keep on Going 🏆",
      description: "You're almost there",
      status: "doing",
      board: "Launch Career",
    },
    {
      id: 11,
      title: "Learn Data Structures and Algorithms 📚",
      description: "Study fundamental data structures and algorithms to solve coding problems efficiently",
      status: "todo",
      board: "Launch Career",
    },
    {
      id: 12,
      title: "Contribute to Open Source Projects 🌐",
      description: "Gain practical experience and collaborate with others in the software development community",
      status: "done",
      board: "Launch Career",
    },
    {
      id: 13,
      title: "Build Portfolio Projects 🛠️",
      description: "Create a portfolio showcasing your skills and projects to potential employers",
      status: "done",
      board: "Launch Career",
    },
  ];
} 