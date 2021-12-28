// создаем и возвращаем заголовок приложения
function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дел
  function createTodoItemForm() {
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

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItemElement(todoItem, {onDone, onDelete}) {
    const doneClass = 'list-group-item-success';

    let item = document.createElement("li");
    //кнопки помещаем в элемент, которые красиво покажет их в одной группе
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    // устанавливаем стили для элемента списка, а также для размещения кнопок в его правой части с помощью flex
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = todoItem.name;

    if(todoItem.done) {
      item.classList.add(doneClass)
    }

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

     // добавляем обработчики на кнопки
    doneButton.addEventListener("click", function () {
      onDone({todoItem, element: item});
      item.classList.toggle(doneClass, todoItem.done);
    });

    deleteButton.addEventListener("click", function () {
      onDelete({todoItem, element: item});
    });

    //вкладываем кнопки в отдельный элемент. чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item
  }

  async function createTodoApp(container, {title, owner, todoItemList = [], onCreateFormSubmit, onDoneClick, onDeleteClick }) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    const handlers = {onDone: onDoneClick, onDelete: onDeleteClick};

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);


    todoItemList.forEach(todoItem => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement);
    })

    todoItemForm.button.classList.add("disabled");

    todoItemForm.input.addEventListener("input", () => {
      if (!todoItemForm.input.value) {
        todoItemForm.button.classList.add("disabled");
      } else {
        todoItemForm.button.classList.remove("disabled");
      }
    });

    //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener("submit", async function (e) {
      //эта строчка необходимо, чтобы предотвратить стандартное действие браузера
      //в данном случаи мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();
      todoItemForm.button.classList.add("disabled");
      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      const todoItem = await onCreateFormSubmit({owner, name: todoItemForm.input.value.trim()});

      let todoItemElement = createTodoItemElement(todoItem, handlers);

      //создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItemElement);
      //обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = "";
    });
  }

 export {createTodoApp} ;