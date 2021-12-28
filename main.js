import {createTodoApp as createTodoAppWithServer} from './todo-app-with-server/view.js';
import {getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem} from './todo-app-with-server/api.js';
import {createTodoApp as createTodoAppWithLS} from './todo-app-with-ls/todo-app-local-storage.js';


const owner = 'me';
const btn = document.querySelector('.btn-change');

(async () => {


    const todoItemList = await getTodoList(owner);

    btn.addEventListener('click', () => {

        if(localStorage.getItem('localStorage') || localStorage.getItem('server')) {
            localStorage.removeItem('localStorage');
            localStorage.removeItem('server');
        }

        if(btn.textContent == 'Change to Local Storage') {
            btn.textContent = 'Change to Server';
            document.getElementById('todo-app').innerHTML = '';
            createTodoAppWithLS(document.getElementById('todo-app'),'Мои дела', owner);

            localStorage.setItem('server', 'withServer');
        } else {
            btn.textContent = 'Change to Local Storage';
            document.getElementById('todo-app').innerHTML = '';
            createTodoAppWithServer(document.getElementById('todo-app'),{title: 'Мои дела', owner,
            todoItemList , 
            onCreateFormSubmit: createTodoItem, 
            onDoneClick: switchTodoItemDone, 
            onDeleteClick: deleteTodoItem, 
            });

            localStorage.setItem('localStorage', 'withLocalStorage');
        }

    });

    createTodoAppWithServer(document.getElementById('todo-app'),{title: 'Мои дела', owner,
    todoItemList , 
    onCreateFormSubmit: createTodoItem, 
    onDoneClick: switchTodoItemDone, 
    onDeleteClick: deleteTodoItem, 
    });
})();