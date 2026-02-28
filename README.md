# 📋 My Tasks — Todo List App

> **Keep it simple. Get it done.**
> A clean, minimal, dark-themed todo list application built with pure HTML, CSS, and JavaScript. No frameworks. No dependencies. Just fast, elegant task management.

---

## 🖼️ Overview

**My Tasks** is a lightweight, fully client-side todo application with a polished dark UI. It lets you add, edit, complete, and delete tasks — all in a beautifully styled interface that stays out of your way and helps you focus on what matters.

---

## ✨ Features

| Feature | Description |
|---|---|
| ➕ **Add Tasks** | Type and press `Enter` or click `+ Add` to create a task instantly |
| ✅ **Complete Tasks** | Click the circular check button to toggle a task as done |
| ✎ **Edit Tasks** | Click the pencil icon to edit any task inline |
| 🗑 **Delete Tasks** | Remove individual tasks with the trash icon |
| ✕ **Clear Completed** | Bulk-remove all completed tasks in one click |
| 📊 **Live Stats** | See total, done, and remaining task counts update in real-time |
| ⌨️ **Keyboard Shortcuts** | Full keyboard support for power users |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `Enter` (in add input) | Add a new task |
| `Enter` (while editing) | Save the edited task |
| `Escape` (while editing) | Cancel editing without saving |

---

## 🗂️ Project Structure

```
📁 todo-app/
├── index.html       # App markup and layout
├── style.css        # Dark theme styling with animations
└── script.js        # All task logic and DOM manipulation
```

---

## 🚀 Getting Started

No build tools. No package manager. No setup required.

### Run Locally

1. **Clone or download** this repository
2. **Open** `index.html` in any modern browser
3. **Start adding tasks** — that's it!

```bash
# If you have Python installed, you can also serve it locally:
python -m http.server 8080

# Then visit:
http://localhost:8080
```

---

## 🧠 How It Works

### Data Model

Each task is stored as a plain JavaScript object in a `tasks` array:

```js
{
  id: 1700000000000,   // Unique ID using Date.now()
  text: "Buy groceries",
  done: false
}
```

### Core Functions

| Function | What It Does |
|---|---|
| `addtask()` | Reads input, creates a task object, pushes to array, re-renders |
| `toggledone(id)` | Finds task by ID and flips its `done` boolean |
| `deletetask(id)` | Filters task out of the array |
| `edittask(id)` | Re-renders with that task in edit mode |
| `savetask(id)` | Updates the task's text and exits edit mode |
| `canceledit()` | Re-renders without saving changes |
| `cleardone()` | Filters out all tasks where `done === true` |
| `showtasks(editingid)` | Full DOM re-render of the task list |
| `updatestats()` | Recalculates and updates the stat counters |

### Rendering Strategy

The app uses a **full re-render** approach — every state change calls `showtasks()`, which wipes and rebuilds the task list from scratch. This keeps the logic simple and predictable.

Closures are used inside loops to correctly bind event handlers to each task's ID:

```js
checkbtn.onclick = (function (id) {
  return function () { toggledone(id); };
})(task.id);
```

---

## 🎨 Design System

The UI uses a custom dark design language with two Google Fonts:

| Property | Value |
|---|---|
| **Background** | `#0e0e10` — deep near-black |
| **Card Surface** | `#18181c` — slightly lighter |
| **Border** | `#2a2a32` — subtle separator |
| **Accent Gold** | `#e8c87a` — highlights & focus states |
| **Accent Purple** | `#c084fc` — gradient partner |
| **Success Green** | `#6ee7b7` — completed task check |
| **Danger Red** | `#f87171` — delete & cancel actions |
| **Heading Font** | `DM Serif Display` — editorial serif |
| **Body Font** | `DM Mono` — clean monospace |

### Gradient Header

The `h1` uses a CSS text gradient from gold to purple:

```css
background: linear-gradient(135deg, #e8c87a, #c084fc);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Ambient Background

Two radial gradients give the page a subtle warm/cool glow using a CSS `::before` pseudo-element — no extra HTML needed.

### Slide-In Animation

New tasks animate into view with a smooth keyframe:

```css
@keyframes slidein {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 📐 Layout

The app is centered on the page using flexbox on `body`, with a max-width of `540px`. On smaller screens it adapts naturally thanks to `width: 100%` and `padding: 2rem`.

---

## 🔧 Customization

### Change the App Title

In `index.html`, update:
```html
<h1>My Tasks</h1>
<p class="subtitle">Keep it simple. Get it done.</p>
```

### Change Accent Colors

In `style.css`, find and replace `#e8c87a` (gold) and `#c084fc` (purple) with your preferred palette.

### Add localStorage Persistence

To persist tasks across page refreshes, add these two lines:

```js
// After every state change (inside showtasks):
localStorage.setItem('tasks', JSON.stringify(tasks));

// At page load (top of script.js):
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```

### Add Task Priority Levels

Extend the task object:
```js
var newtask = {
  id: Date.now(),
  text: text,
  done: false,
  priority: 'normal'   // 'low' | 'normal' | 'high'
};
```

---

## 🌐 Browser Compatibility

Works in all modern browsers:

- ✅ Chrome / Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

No polyfills needed. Uses only standard DOM APIs.

---

## 📄 License

This project is open source and free to use. Do whatever you want with it.

---

## 🙌 Credits

- Fonts: [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) & [DM Mono](https://fonts.google.com/specimen/DM+Mono) via Google Fonts
- Built with: Pure HTML · CSS · Vanilla JavaScript

---

*Made with focus. No fluff.*
