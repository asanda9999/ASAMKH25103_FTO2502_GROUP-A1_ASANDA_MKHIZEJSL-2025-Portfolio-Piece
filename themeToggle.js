// Function to initialize and manage the theme toggle (light/dark mode)
export function setupThemeToggle() {
  const checkbox = document.getElementById("theme-toggle-checkbox");
  const body = document.body;

  // Retrieve saved theme from localStorage 
  const savedTheme = localStorage.getItem("theme");

  // If the saved theme is dark, apply dark mode and set the toggle
  if (savedTheme === "dark") {
    body.classList.add("dark");
    checkbox.checked = true;
  }

  // Listen for toggle switch changes
  checkbox.addEventListener("change", () => {
    const isDark = checkbox.checked;

    // Apply or remove the 'dark' class on the body based on the toggle
    body.classList.toggle("dark", isDark);

    // Save the user's preference in localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
