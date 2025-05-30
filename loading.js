const loadingBox = document.getElementById("loading-box");

// Show the loading indicator
export function showLoading() {
  loadingBox.style.display = "block";
}

// Hide the loading indicator
export function hideLoading() {
  loadingBox.style.display = "none";
}
