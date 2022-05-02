
// All DOM Elements.
let taskInput = document.getElementById('task-input');
let addTAsk = document.getElementById('add-task');
let filterTask = document.getElementById('filter-task');
let taskList = document.getElementById('task-list');
let clearTask = document.getElementById('clear-task');


// All Event Listeners.
addTAsk.addEventListener('submit', addData);
taskList.addEventListener('click', removeData);
clearTask.addEventListener('click', clearData);
filterTask.addEventListener('keyup', filterData);
document.addEventListener('DOMContentLoaded', getData);




// Add data.
function addData(e){
    if(taskInput.value == ''){
        alert("Please Add a Task");
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.innerHTML = 'x';
        link.setAttribute('href', '#');
        link.setAttribute('style', 'color : red; text-decoration : none');
        li.appendChild(link);
        addDataToLocalStorage(taskInput.value);
        taskInput.value = '';
    }
    e.preventDefault();
}


// Remove Single Element.
function removeData(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are You Sure?')){
            let ele = e.target.parentElement;
            ele.remove();
            removeDataFromLocalStorage(ele);
        }
    }
}

// Clear All Tasks.
function clearData(e){
    if(confirm('Are You Sure ?')){
        taskList.innerHTML = '';
        localStorage.clear();
    }
}


// Filter Tasklist Data.
function filterData(e){
    let text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('li').forEach(item => {
        let liItem = item.textContent.toLowerCase();
        if(liItem.indexOf(text) != -1){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
}


// Add Data to Local Storage.
function addDataToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Get Data from Local Storage.
function getData(){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.innerHTML = 'x';
        link.setAttribute('href', '#');
        link.setAttribute('style', 'color : red; text-decoration : none');
        li.appendChild(link);
    })
}


// Remove Data from Local Storage.
function removeDataFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    taskItem.removeChild(taskItem.lastChild);
    tasks.forEach((item, index)=>{
        if(taskItem.textContent.trim() == item){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
