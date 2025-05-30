export function setupThemeToggle() {
  const checkbox = document.getElementById("theme-toggle-checkbox");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", () => {
    const isDark = checkbox.checked;
    body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
