// config.js
// Configuration settings for the application

export const API_CONFIG = {
  // JSL Kanban API endpoint
  BASE_URL: 'https://jsl-kanban-api.vercel.app',
  
  // API endpoints
  ENDPOINTS: {
    TASKS: '/',
    TASK: '/{id}'
  },
  
  // Request settings
  REQUEST_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
};

// The API endpoint is now configured to use the JSL Kanban API
// This API returns tasks in the correct format for your application 