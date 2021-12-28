const createAppTitle = (title) => {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  const createTodoItemForm = () => {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  const createTodoList = () => {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  const createTodoItem = (name) => {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    return {
      item,
      doneButton,
      deleteButton,
      name,
    };
  }

  function createTodoApp(
    container,
    title = "Список дел",
    localStorageKey
  ) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let newTodos = [];

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.button.classList.add("disabled");

    todoItemForm.input.addEventListener("input", () => {
      if (!todoItemForm.input.value) {
        todoItemForm.button.classList.add("disabled");
      } else {
        todoItemForm.button.classList.remove("disabled");
      }
    });

    if (localStorage.getItem(localStorageKey)) {
      newTodos = JSON.parse(localStorage.getItem(localStorageKey));
      for (let item of newTodos) {
        let todoItem = createTodoItem(item.name, item.done);
        if (item.done === true) {
          todoItem.item.classList.add("list-group-item-success");
        }
        
        todoItem.doneButton.addEventListener("click", () => {
          todoItem.item.classList.toggle("list-group-item-success");
          const newItems = newTodos.map((i) => {
            if(i.name === todoItem.name){
              console.log(i);
              i.done = !i.done;
            }
            return i;
          })
          localStorage.setItem(localStorageKey, JSON.stringify(newItems));
        });

        todoItem.deleteButton.addEventListener("click", () => {
          if (confirm("Вы уверены?")) {
            todoItem.item.remove();
            newTodos = JSON.parse(localStorage.getItem(localStorageKey));
            let filteredItems = newTodos.filter((i) => i.name !== todoItem.name);
            localStorage.setItem(localStorageKey, JSON.stringify(filteredItems));
          }
        });
        todoList.append(todoItem.item);
      }
    }

    todoItemForm.form.addEventListener("submit", (e) => {
      e.preventDefault();
      todoItemForm.button.classList.add("disabled");
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      let todo = {
        name: todoItemForm.input.value,
        done: false,
      };

      newTodos.push(todo);
      localStorage.setItem(localStorageKey, JSON.stringify(newTodos));

      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");

        const newItems = newTodos.map((i) => {
          if(i.name === createTodoItem(todo.name, todo.done).name){
            console.log(i);
            i.done = !i.done;
          }
          return i;
        })
        localStorage.setItem(localStorageKey, JSON.stringify(newItems));
      });

      todoItem.deleteButton.addEventListener("click", () => {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
          newTodos = JSON.parse(localStorage.getItem(localStorageKey));
          let filteredItems = newTodos.filter((i) => i.name !== createTodoItem(todo.name, todo.done).name);
          localStorage.setItem(localStorageKey, JSON.stringify(filteredItems));
        }
      });
      todoList.append(todoItem.item);
      todoItemForm.input.value = "";
    });
}

export{createTodoApp};