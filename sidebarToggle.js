export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const showBtn = document.getElementById("show-sidebar-btn");
  const hideBtn = document.getElementById("hide-sidebar-btn");

  hideBtn.addEventListener("click", () => {
    sidebar.classList.add("closed");
    showBtn.style.display = "block";
  });

  showBtn.addEventListener("click", () => {
    sidebar.classList.remove("closed");
    showBtn.style.display = "none";
  });
}
