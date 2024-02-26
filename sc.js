let taskIdCounter = 0;
let filterMode = 'all'; // Default filter mode

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTaskList = document.getElementById('newTaskList');

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.id = 'task-' + taskIdCounter++;
        newTask.innerHTML = `
            <input type="checkbox" onchange="completeTask('${newTask.id}')">
            <span>${taskInput.value}</span>
            <button onclick="removeTask('${newTask.id}')">X</button>`;

        newTaskList.appendChild(newTask);

        taskInput.value = '';
        updateTaskColors();
        toggleEmptyMessage();
    }
}

function completeTask(taskId) {
    const task = document.getElementById(taskId);
    task.classList.toggle('task-completed');
}

function removeTask(taskId) {
    const task = document.getElementById(taskId);
    task.remove();
    updateTaskColors();
    toggleEmptyMessage();
}

function updateTaskColors() {
    const tasks = document.querySelectorAll('li');

    tasks.forEach((task, index) => {
        task.style.backgroundColor = index % 2 === 0 ? '#808080' : 'White';
    });
}

function removeAllTasks() {
    const newTaskList = document.getElementById('newTaskList');
    newTaskList.innerHTML = '';
    taskIdCounter = 0;
    updateTaskColors();
    toggleEmptyMessage();
}

function toggleEmptyMessage() {
    const emptyMessage = document.getElementById('emptyMessage');
    const newTaskList = document.getElementById('newTaskList');

    if (newTaskList.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

function applyFilter(mode) {
    filterMode = mode;
    updateTaskList();
}

function sortTasksByName() {
    const tasks = Array.from(document.querySelectorAll('li'));
    const sortedTasks = tasks.sort((a, b) => {
        const nameA = a.textContent.trim().toLowerCase();
        const nameB = b.textContent.trim().toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const newTaskList = document.getElementById('newTaskList');
    newTaskList.innerHTML = '';
    sortedTasks.forEach(task => newTaskList.appendChild(task));

    updateTaskColors();
}

function updateTaskList() {
    const tasks = document.querySelectorAll('li');

    tasks.forEach(task => {
        if (filterMode === 'all' || (filterMode === 'completed' && task.classList.contains('task-completed')) || (filterMode === 'incomplete' && !task.classList.contains('task-completed'))) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Event Listeners
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('filterAll').addEventListener('click', () => applyFilter('all'));
document.getElementById('filterCompleted').addEventListener('click', () => applyFilter('completed'));
document.getElementById('filterIncomplete').addEventListener('click', () => applyFilter('incomplete'));
document.getElementById('sortByName').addEventListener('click', sortTasksByName);