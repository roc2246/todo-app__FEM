let todoIndex = [];
let filterMode = "all";

let toDoTracker = {
  todosLeft: document.getElementById("todos-left"),
  setTodos: function (amt) {
    this.todosLeft.innerHTML = amt;
  },
};
toDoTracker.setTodos(0);

const containers = {
  todoInput: document.getElementsByClassName("todos__layout--input")[0],
  todoList: document.getElementsByClassName("todos__list")[0],
  todo: document.getElementsByClassName("todos__list--item"),
  empty: document.getElementsByClassName("todos__empty")[0],
  toggleEmpty: function () {
    if (this.todo.length !== 0) {
      this.empty.style.display = "none";
    } else {
      this.empty.style.display = "flex";
    }
  },
  deleteBtn: document.getElementsByClassName("todos__layout--delete"),
  assignDelete: function () {
    todoIndex.forEach((btn) => {
      let btnNo = todoIndex[btn];
      this.deleteBtn[btnNo].onclick = () => {
        if (btnNo === undefined) btnNo = todoIndex.length - 1;
        if (this.todo[btnNo] === undefined) btnNo = 0;

        this.todo[btnNo].remove();
        todoIndex.pop();

        this.toggleEmpty();
        this.assignDelete();
        this.assignCompleted();

        toDoTracker.setTodos(todoIndex.length);
      };
    });
  },
  circle: document.getElementsByClassName("todos__layout--circle"),
  assignCompleted: function () {
    todoIndex.forEach((btn) => {
      let btnNo = todoIndex[btn];
      this.circle[btnNo].onclick = () => {
        if (!this.circle[btnNo].classList.contains("completed")) {
          this.circle[btnNo].classList.add("completed");
        } else {
          this.circle[btnNo].classList.remove("completed");
        }

        filterBtns.setFocus();
      };
    });
  },
};

function newToDo() {
  const newElement = (ele) => document.createElement(ele);
  const newClass = (ele, name) => ele.classList.add(name);
  const mod = (mod) => `todos__layout--${mod}`;

  const container = newElement("span");
  newClass(container, "todos__layout");
  newClass(container, "todos__list--item");

  const circleBtn = newElement("div");
  newClass(circleBtn, mod("circle"));

  const text = newElement("p");
  newClass(text, mod("text"));
  text.innerText = containers.todoInput.value;

  const deleteBtn = newElement("button");
  newClass(deleteBtn, "btn");
  newClass(deleteBtn, mod("delete"));

  const xImg = newElement("img");
  newClass(xImg, mod("delete-icon"));
  xImg.src = "./images/icon-cross.svg";
  xImg.alt = "Delete To Do";
  deleteBtn.append(xImg);

  container.append(circleBtn);
  container.append(text);
  container.append(deleteBtn);

  containers.todoList.append(container);

  todoIndex = [...todoIndex, todoIndex.length];
  toDoTracker.setTodos(todoIndex.length);
  containers.toggleEmpty();
}

const filterBtns = {
  clear: document.getElementsByClassName("filter--clear")[0],
  mobile: {
    all: document.getElementsByClassName("filter--all")[0],
    active: document.getElementsByClassName("filter--active")[0],
    completed: document.getElementsByClassName("filter--completed")[0],
  },
  desktop: {
    all: document.getElementsByClassName("filter--all")[1],
    active: document.getElementsByClassName("filter--active")[1],
    completed: document.getElementsByClassName("filter--completed")[1],
  },
  setFilter: function (completed, active) {
    Object.keys(containers.todo).forEach((no) => {
      if (containers.circle[no].classList.contains("completed")) {
        containers.todo[no].style.display = completed;
      } else {
        containers.todo[no].style.display = active;
      }
    });
  },
  setFocus: function () {
    if (filterMode === "active") {
      this.setFilter("none", "flex");
      this.desktop.active.focus();
      this.mobile.active.focus();
      this.desktop.all.style.color = "hsl(234, 11%, 52%)";
      this.mobile.all.style.color = "hsl(234, 11%, 52%)";
    } else if (filterMode === "completed") {
      this.setFilter("flex", "none");
      this.desktop.completed.focus();
      this.mobile.completed.focus();
      this.desktop.all.style.color = "hsl(234, 11%, 52%)";
      this.mobile.all.style.color = "hsl(234, 11%, 52%)";
    }
  },
  removeFilters: function () {
    Object.keys(containers.todo).forEach((no) => {
      containers.todo[no].style.display = "flex";
    });
  },
  clearCompleted: function () {
    todoIndex.forEach((no) => {
      let btnNo = todoIndex[no];
      if (containers.circle[btnNo].classList.contains("completed")) {
        todoIndex.pop();
        containers.todo[btnNo].remove();
        containers.assignCompleted();
        containers.assignDelete();
        this.clearCompleted();
        this.setFocus();
      }
    });
  },
};

filterBtns.clear.onclick = () => {
  filterBtns.clearCompleted();
  containers.toggleEmpty();
  toDoTracker.setTodos(containers.todo.length);
  filterBtns.setFocus();
};

filterBtns.mobile.all.onclick = () => {
  filterBtns.mobile.all.style.color = "blue";
  filterBtns.removeFilters();
  filterMode = "all";
};
filterBtns.desktop.all.onclick = () => {
  filterBtns.desktop.all.style.color = "blue";
  filterBtns.removeFilters();
  filterMode = "all";
};

filterBtns.mobile.active.onclick = () => {
  filterBtns.mobile.all.style.color = "hsl(234, 11%, 52%)";
  filterBtns.setFilter("none", "flex");
  filterMode = "active";
};
filterBtns.desktop.active.onclick = () => {
  filterBtns.desktop.all.style.color = "hsl(234, 11%, 52%)";
  filterBtns.setFilter("none", "flex");
  filterMode = "active";
};

filterBtns.mobile.completed.onclick = () => {
  filterBtns.mobile.all.style.color = "hsl(234, 11%, 52%)";
  filterBtns.setFilter("flex", "none");
  filterMode = "completed";
};
filterBtns.desktop.completed.onclick = () => {
  filterBtns.desktop.all.style.color = "hsl(234, 11%, 52%)";
  filterBtns.setFilter("flex", "none");
  filterMode = "completed";
};

containers.todoInput.onfocus = () => {
  filterBtns.removeFilters();
  filterBtns.desktop.all.style.color = "blue";
  filterBtns.mobile.all.style.color = "blue";
}

containers.todoInput.onkeydown = (e) => {
  if (e.key === "Enter") {
    containers.todoInput.value.trim().length === 0
      ? alert("Please enter a todo")
      : newToDo();
    containers.todoInput.value = "";
    containers.todoInput.focus();
  }

  containers.assignDelete();
  containers.assignCompleted();
};
