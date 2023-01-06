// Define UI Vars

const form = document.getElementById("task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener("submit", addTask)
    // DOM load event 
    document.addEventListener("DOMContentLoaded", getTasks)
    // Remove task event
    taskList.addEventListener("click", removeTask)
    // Remove all tasks
    clearBtn.addEventListener("click", removeAllTasks)
    // Filter through tasks
    filter.addEventListener("keyup", filterTask)
};

// Get Tasks from  LS
function getTasks() {
        let tasks;
        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }
        tasks.forEach(function(task) {
                  // Create List Item
                  let newLi = document.createElement('li');
                  newLi.className = "collection-item";
                  newLi.appendChild(document.createTextNode(task));
              // Add the Delete Icon
                  let link = document.createElement('a');
                  link.className = "delete-item secondary-content";
                  link.innerHTML = `<i class="fa fa-remove"></i>`;
                  newLi.appendChild(link);
              // Append the li to the ul
                  taskList.appendChild(newLi);
        })
    }

// Add Task
function addTask(e) {
    e.preventDefault()

    if (taskInput.value === "") {
        alert("You forgot to add a task")
    } else {
        // Create List Item
            let newLi = document.createElement('li');
            newLi.className = "collection-item";
            newLi.appendChild(document.createTextNode(taskInput.value));
        // Add the Delete Icon
            let link = document.createElement('a');
            link.className = "delete-item secondary-content";
            link.innerHTML = `<i class="fa fa-remove"></i>`;
            newLi.appendChild(link);
        // Append the li to the ul
            taskList.appendChild(newLi);

        // Store tasks in local Storage
            storeTaskInLocalStorage(taskInput.value);
        // Clear input
            taskInput.value = "";
    
    }
}

// Store task in Local Storage
function storeTaskInLocalStorage(task) {
        let tasks;
        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }
        tasks.push(task)

        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

// Remove Task
function removeTask(e) {
    // e.preventDefault()
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?"))
        e.target.parentElement.parentElement.remove()

        // Remove from Local Storage
        removeTaskFromLocalStorage( e.target.parentElement.parentElement);
    } 
}

// Remove Single Task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Remove All Tasks
function removeAllTasks(e) {
    localStorage.clear()
    e.preventDefault()
    // taskList.innerHTML = ``  
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}

// Filter Task
function filterTask(e) {
    const text = e.target.value.toLowerCase()
    console.log(text) 

    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}


