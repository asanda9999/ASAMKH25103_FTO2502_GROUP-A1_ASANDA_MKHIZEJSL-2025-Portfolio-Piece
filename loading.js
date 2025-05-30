// loading.js
const loadingBox = document.getElementById("loading-box");

export function showLoading() {
  loadingBox.style.display = "block";
}

export function hideLoading() {
  loadingBox.style.display = "none";
}
