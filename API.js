export async function fetchTasksFromAPI() {
  const response = await fetch("https://jsl-kanban-api.vercel.app/");
  if (!response.ok) throw new Error("Failed to fetch tasks from API");
  return await response.json();
}