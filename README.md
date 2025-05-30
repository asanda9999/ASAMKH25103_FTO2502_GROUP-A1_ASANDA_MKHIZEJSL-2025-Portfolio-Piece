# 🗂️ Task Management Board

A client-side task management web application that helps you organize tasks into **TODO**, **DOING**, and **DONE** columns, mimicking a kanban board. The app allows creating, editing, deleting, and categorizing tasks with persistent storage using `localStorage`.

---

## ✨ Features

- 🆕 **Create, Edit, and Delete Tasks:** Easily manage tasks through a modal interface.
- 📋 **Task Status Columns:** Organize tasks visually into **TODO**, **DOING**, and **DONE** columns.
- 💾 **Persistent Storage:** Tasks are saved in `localStorage` to maintain data between sessions.
- 🔢 **Dynamic Task Counts:** Column headers update with real-time task counts.
- 🖥️ **Modal Form:** Reusable modal for creating new tasks or editing existing ones.
- 🎨 **Theme Toggle:** Switch between light and dark modes for better accessibility and preference.
- 📂 **Sidebar Toggle:** Show or hide the sidebar for a cleaner workspace.
- ⏳ **Loading Indicator:** Displays while fetching tasks to enhance user experience.

---

## 🛠️ Technologies Used

- 💻 JavaScript (ES Modules)
- 🌐 HTML & CSS
- 📦 `localStorage` API for data persistence

---

## 💻 Installation & Running the Project

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Optional but recommended: a local HTTP server to avoid CORS issues when loading modules

### How to Run

1. **Clone or Download** the project files to your local machine.

2. **Using a simple local server (recommended):**

   If you have **Node.js** installed, you can use `http-server` or `live-server` to serve the files.

   - Install a server globally (if you don’t have it):

     ```bash
     npm install -g live-server
     ```

   - Navigate to your project directory:

     ```bash
     cd path/to/your/project
     ```

   - Start the server:

     ```bash
     live-server
     ```

   This will open the project in your default browser and enable proper ES module support.

3. **Alternatively, open `index.html` directly** by double-clicking it in your file explorer.  
   *Note:* Some browsers restrict ES module loading from local files, so the above server method is preferred.

---

## ⚙️ How It Works

1. 🚀 On load, the app fetches tasks asynchronously from `localStorage`, or falls back to default initial data.
2. 🧩 Tasks are rendered dynamically into columns based on their status (**todo**, **doing**, **done**).
3. ✍️ Clicking a task opens a modal to edit or delete it.
4. ➕ The "Add New Task" button opens a modal to create a new task.
5. 💾 Changes are saved back to `localStorage` and immediately reflected on the board.
6. 🌗 Users can toggle themes and sidebar visibility to customize their workspace.

---

## 🔮 Future Enhancements

- ☁️ Sync tasks with a backend server or cloud storage.
- 🖱️ Add drag-and-drop functionality for easier task management.
- 🔐 Implement user authentication for personalized boards.
- 📅 Add due dates, priorities, and notifications.

---

## 🎥 Presentation Video

Watch a walkthrough of the project here:  
[https://www.veed.io/view/20874eb4-f7ea-49ff-9bdb-89c3297d9269?panel=share]

---

## 🌐 Live Demo

Access the live version of this project hosted on Netlify:  
[https://jslkanban-asamkh25103.netlify.app/]

---

Feel free to contribute or suggest improvements! 🙌

---

© 2025 Asanda Mkhize
