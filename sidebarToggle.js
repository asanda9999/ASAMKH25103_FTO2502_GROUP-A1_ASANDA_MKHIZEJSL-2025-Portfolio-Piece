// Initializes the sidebar toggle functionality
export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const showBtn = document.getElementById("show-sidebar-btn");
  const hideBtn = document.getElementById("hide-sidebar-btn");

  // When the hide button is clicked:
  hideBtn.addEventListener("click", () => {
    sidebar.classList.add("closed");      // Collapse or hide the sidebar
    showBtn.style.display = "block";      // Show the "show sidebar" button
  });

  // When the show button is clicked:
  showBtn.addEventListener("click", () => {
    sidebar.classList.remove("closed");   // Expand or show the sidebar
    showBtn.style.display = "none";       // Hide the "show sidebar" button
  });
}
