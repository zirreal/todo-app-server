import {getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem} from '../todo-app-with-server/api.js';

export const createBtn = () => {
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    const btn = document.createElement('button');

    btn.textContent = 'Перейти на серверное хранилище';
    btn.classList.add('btn', 'btn-outline-danger', 'btn-change');

    div.append(btn);
    container.append(btn);

    return {btn};
}


export const toggleButton = async  (owner, title) => {
    const todoItemList = await getTodoList(owner);
    const btn = createBtn().btn;


    const btnWithLS = async (btn, title, owner) => {
        btn.textContent = 'Перейти на серверное хранилище';
        document.getElementById('todo-app').innerHTML = '';
        const createTodoAppWithLS = await import('../todo-app-with-ls/todo-app-local-storage.js');
        createTodoAppWithLS.createTodoApp(document.getElementById('todo-app'),title, owner);
        localStorage.setItem('localStorage', 'withLocalStorage');
        localStorage.removeItem('server');
    }

    const btnWithServer = async (btn, title, owner) => {
        btn.textContent = 'Перейти на локальное хранилище';
        document.getElementById('todo-app').innerHTML = '';
        const createTodoAppWithServer = await import('../todo-app-with-server/view.js');
        createTodoAppWithServer.createTodoApp(document.getElementById('todo-app'),{title: title, owner,
        todoItemList , 
        onCreateFormSubmit: createTodoItem, 
        onDoneClick: switchTodoItemDone, 
        onDeleteClick: deleteTodoItem, 
        });

        localStorage.setItem('server', 'withServer');
        localStorage.removeItem('localStorage');
    }



    if(localStorage.getItem('localStorage')) {
        btnWithLS(btn, title, owner);
    }

    if(localStorage.getItem('server')) {
        btnWithServer(btn, title, owner);
    }

    btn.addEventListener('click', () => {

    
        if(btn.textContent === 'Перейти на локальное хранилище') {
            btnWithLS(btn, title, owner);
        } else {
            btnWithServer(btn, title, owner);
        }

    });
}




