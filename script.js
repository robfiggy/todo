/* Version 1 of the TODO LIST

var todos = ["item 1", "item 2", "item 3"];
todos.push("item 4");
todos[1] = "updated item";
todos.splice(2, 1);

console.log(todos); */

/* Verson 2 of the TODO LIST 

var todos = ["item 1", "item 2", "item 3"];

function displayList() {
    console.log('My todos', todos);
}

function pushList(newItem) {
    todos.push(newItem);
    displayList();
}

function changeList(position, newValue) {
    todos[position] = newValue;
    displayList();
}

function deleteList(position) {
    todos.splice(position, 1);
    displayList();
}                                             */

/* V3 of the TODO LIST

var todoList = {
    todos: ["item 1", "items 2", "item 3"];
    displayTodos: function () {
        console.log("My Todos", this.todos);
    },
    addTodo: function (todo) {
        this.todos.push(todo);
        this.displayTodos();
    },
    changeTodo: function (position, newValue) {
        this.todos[position] = newValue;
        this.displayTodos();
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    }
};                                               */


var todoList = {
    todos: [], 
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    }, 
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos

        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        // Case 1: If everything is true, make everything false

        if (completedTodos === totalTodos) {
            this.todos.forEach(function (todo) {
                todo.completed = false;
            });
        
        // Case 2: Otherwise, make everything true

        } else {
            this.todos.forEach (function (todo) {
                todo.completed = true;
            });
        }
    }
};

/*

// Access to the display todos button, and ability to run the displayTodos method

var displayTodosButton = document.getElementById("displayTodosButton");
console.log(displayTodosButton);

displayTodosButton.addEventListener("click", function() {
    todoList.displayTodos();
});

// Access to the toggle all button, and ability to run the toggleAll method

var toggleAllButton = document.getElementById("toggleAllButton");
console.log(toggleAllButton);

toggleAllButton.addEventListener("click", function () {
    todoList.toggleAll();
});

*/

var handlers = {
    addTodo:  function () {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo (addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
    changeTodo: function () {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = "";
        changeTodoTextInput.value = "";
        view.displayTodos();

    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displayTodos();

    },
    toggleCompleted: function () {
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();

    },
    toggleAll: function () {
        todoList.toggleAll ();
        view.displayTodos();

    }
};

var view = {
    displayTodos: function () {
        var todosUl = document.querySelector("ul");
        todosUl.innerHTML = "";
        for (var i=0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement("li");
            var todo = todoList.todos[i];
            var todoTextWithCompletion = "";

            if (todo.completed === true) {
                todoTextWithCompletion = "(X)" + todo.todoText;
            } else {
                todoTextWithCompletion = "( )" + todo.todoText;
            }

            todoLi.id = i;

        }

        todoList.todos.forEach (function (todo, position) {
            var todoLi = document.createElement("li");
            var todoTextWithCompletion = "";

            if (todo.completed === true) {
                todoTextWithCompletion = "(X)  " + todo.todoText;
            } else {
                todoTextWithCompletion = "( )  " + todo.todoText;
            }

            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function (){
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector("ul");

        todosUl.addEventListener("click", function (event) {
            var elementClicked = event.target;
            if (elementClicked.className === "deleteButton") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));   
            }
        });
    }
};

view.setUpEventListeners();

