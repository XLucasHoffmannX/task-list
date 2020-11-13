const 
    inputData = document.querySelector('.input-data'),
    submit  = document.querySelector('.submit'),
    displayTask = document.querySelector('.display');

displayTask.style.display = 'none';
const setLi = ()=>{
    const li = document.createElement('li');
    return li;
}  
const resetInput = ()=>{
    inputData.value = '';
    inputData.focus();
}  

const setTask = (value)=>{
    const li = setLi();
    li.innerText = value;
    displayTask.appendChild(li);
    displayTask.style.display = ''
    resetInput();
    setDelete(li);
    saveStorage();
}

inputData.addEventListener('keypress', e => {
    if(e.keyCode === 13){
        if (!inputData.value) return;
        setTask(inputData.value);
    }
})
submit.addEventListener('click', ()=>{
    if (!inputData.value) return;
    setTask(inputData.value);
})

const setDelete = (li)=>{
    li.inner += ' ';
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'Remover';
    buttonDelete.setAttribute('class', 'delete-button');
    buttonDelete.setAttribute('title', 'Remover tarefa');
    li.appendChild(buttonDelete);
}

document.addEventListener('click', e=>{
    const click = e.target;
    if(click.classList.contains('delete-button')){
        click.parentElement.remove();
        saveStorage();
        resetInput();
    }
})

const saveStorage = ()=>{
    const tasks = displayTask.querySelectorAll('li');
    const taskList = [];
    for (let task of tasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Remover', '').trim();
        taskList.push(taskText); 
    }

    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);
}



const getStorage = ()=>{
    const tasks = localStorage.getItem('tasks');
    const list = JSON.parse(tasks)
    for(let task of list) setTask(task); 
}
getStorage();



