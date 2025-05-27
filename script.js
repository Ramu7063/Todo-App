
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const remainingTasksSpan = document.getElementById('remainingTasks');


let tasks = [];
let taskIdCounter = 1;

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});


function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    
    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

   
    tasks.push(newTask);
    
    
    taskInput.value = '';
    
    
    renderTasks();
    updateStats();
}


function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    tasks.forEach(task => {
        createTaskElement(task);
    });
}


function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    
    const checkbox = li.querySelector('.task-checkbox');
    const deleteBtn = li.querySelector('.delete-btn');
    
    checkbox.addEventListener('change', function() {
        toggleTask(task.id);
    });
    
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
    });
    
    taskList.appendChild(li);
}


function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
    }
}


function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        renderTasks();
        updateStats();
    }
}


function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;
    
    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    remainingTasksSpan.textContent = remaining;
}


function init() {
    renderTasks();
    updateStats();
    taskInput.focus();
}


document.addEventListener('DOMContentLoaded', init);
