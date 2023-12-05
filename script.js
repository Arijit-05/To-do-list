// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks on the UI
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    
    // Add event listeners for completing and removing tasks
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      tasks[index] = taskInput.value;
      saveTasks();
    });

    li.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Event listener to add new task
addTaskBtn.addEventListener('click', () => {
  if (taskInput.value.trim() !== '') {
    tasks.push(taskInput.value.trim());
    saveTasks();
    renderTasks();
    taskInput.value = '';
  } else {
    alert('Please enter a task!');
  }
});

// Initial render of tasks
renderTasks();
