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
}

function completeTask(taskId) {
    const task = document.getElementById(taskId);
    task.classList.toggle('task-completed');
}

function removeTask(taskId) {
    const task = document.getElementById(taskId);
    task.remove();
    updateTaskColors();
}

function updateTaskColors() {
    const tasks = document.querySelectorAll('li');

    tasks.forEach((task, index) => {
        task.style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : '#ffffff';
    });
}
