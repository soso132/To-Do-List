let tasks = [];

const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const progressPercentage = document.getElementById('progressPercentage'); // To show percentage inside the bar
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

function updateProgress() {
    const totalTasks = tasks.length;   // Total number of tasks
    const completedTasks = tasks.filter(task => task.completed).length;  // Completed tasks

    if (totalTasks === 0) {
        progressBar.style.width = '0%';
        progressPercentage.textContent = '0%';  // Show 0% inside the progress bar
        progressText.textContent = `0/0`;
        progressBar.style.backgroundImage = "linear-gradient(to right, #55fff1, #0026ff)";  // Default gradient when 0%
    } else {
        const progress = (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;  // Display percentage inside the bar
        progressText.textContent = `${completedTasks}/${totalTasks}`;  // Show task completion count

        // Change the gradient based on progress
        if (progress === 0) {
            progressBar.style.backgroundImage = "linear-gradient(to right, #55fff1, #0026ff)"; // Gradient when 0%
        } else {
            progressBar.style.backgroundImage = "linear-gradient(to right, #55fff1, #0026ff)"; // Green gradient when fully completed
        }
    }
}

// Create task element
function createTaskElement(task, index) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem');
    if (task.completed) taskItem.classList.add('completed');  // Add 'completed' class if the task is completed

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;
    checkbox.id = 'checkbox-' + index;  // Unique ID for each checkbox

    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', 'checkbox-' + index);  // Link label to checkbox using "for" attribute

    checkbox.addEventListener('change', () => toggleCompletion(index, taskItem));

    const taskText = document.createElement('input');
    taskText.classList.add('taskText');
    taskText.value = task.text;
    taskText.addEventListener('blur', () => updateTask(index, taskText.value));
    taskText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateTask(index, taskText.value);
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '⌫';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(checkboxLabel);  // Add the label after the checkbox
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}

// Toggle completion of a task
function toggleCompletion(index, taskItem) {
    tasks[index].completed = !tasks[index].completed;  // Toggle completion status
    updateProgress();  // Update progress after toggling completion

    taskItem.classList.toggle('completed', tasks[index].completed);
}

// Update the task text
function updateTask(index, newText) {
    tasks[index].text = newText;
    createTaskList();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    updateProgress();  // Update the progress after deletion
    createTaskList();  // Re-render the task list
}

// Add a new task
function addTask(text) {
    tasks.push({ text, completed: false });
    createTaskList();
}

// Create task list (called whenever the list is updated)
function createTaskList() {
    taskList.innerHTML = '';  // Clear the task list
    tasks.forEach((task, index) => createTaskElement(task, index));  // Create each task element
    updateProgress();  // Update progress bar
}

// Listen for new task input and button click
addTaskBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        newTaskInput.value = ''; // Clear input after adding task
    }
});

// Allow adding tasks by pressing Enter
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            newTaskInput.value = ''; // Clear input after adding task
        }
        e.preventDefault();  // Prevent new line from being added in the input field
    }
});

// Initialize progress on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();  // Ensure progress bar is at 0% on initial load
});

