let taskIdCounter = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const newTaskList = document.getElementById('newTaskList');

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.id = 'task-' + taskIdCounter++;
        newTask.innerHTML = ` <input type="checkbox" onchange="completeTask('${newTask.id}')"> 
		<span>${taskInput.value}</span> 
		<button onclick="removeTask('${newTask.id}')">X</button>`

        newTaskList.appendChild(newTask);

        taskInput.value = '';
        updateTaskColors();
    }
	toggleEmptyMessage();
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