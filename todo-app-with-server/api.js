export const getTodoList = async (owner) => {
    const response = await fetch(`https://todo-app-dfc31g5.herokuapp.com/api/todos?owner=${owner}`);
    return await response.json();
};

export const createTodoItem = async ({owner, name}) => {
    const response = await fetch("https://todo-app-dfc31g5.herokuapp.com/api/todos", {
        method: "POST",
        body: JSON.stringify({
          name,
          owner,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
};

export const switchTodoItemDone = ({todoItem}) => {
    todoItem.done = !todoItem.done;
    fetch(`https://todo-app-dfc31g5.herokuapp.com/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({done: todoItem.done}),
        headers: {
        'Content-Type': 'application/json',
        }
    });
};

export const deleteTodoItem = ({element, todoItem}) => {
    if(!confirm('Вы уверены?')) {
        return;
    }
    element.remove();
    fetch(`https://todo-app-dfc31g5.herokuapp.com/api/todos/${todoItem.id}`, {
        method: 'DELETE',
    });
};
