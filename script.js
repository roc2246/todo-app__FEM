let todoIndex = [];
let filterMode = "all";
let toggleMode = "light";

let toDoTracker = {
  todosLeft: document.getElementById("todos-left"),
  setTodos: (amt) => (toDoTracker.todosLeft.innerHTML = amt),
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
        toDoTracker.setTodos(todoIndex.length);

        this.toggleEmpty();
        this.assignDelete();
        this.assignCompleted();
      };
    });
    todoIndex.forEach((btn) => {
      this.todo[btn].ondragstart = () => {};
      this.todo[btn].ondragleave = () => {};
      this.todo[btn].ondragend = () => {};
      this.assignDrag();
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

        if (filterMode === "active") {
          filterBtns.setFilter("none", "flex");
          filterBtns.desktop.all.style.color = filterBtns.stateColor.inactive;
          filterBtns.mobile.all.style.color = filterBtns.stateColor.inactive;
        } else if (filterMode === "completed") {
          filterBtns.setFilter("flex", "none");
          filterBtns.desktop.all.style.color = filterBtns.stateColor.inactive;
          filterBtns.mobile.all.style.color = filterBtns.stateColor.inactive;
        }
      };
    });
  },
  assignDrag: function () {
    todoIndex.forEach((btn) => {
      let todoNo = todoIndex[btn];

      this.todo[todoNo].ondragstart = () => {
        this.todo[todoNo].classList.add("dragging");
      };
      this.todo[todoNo].ondragover = (e) => {
        const dragItem = document.querySelector(".dragging");
        const dragHeight = dragItem.getBoundingClientRect().y;

        const hoveredItem = this.todo[todoNo];
        const hoverHeight = hoveredItem.getBoundingClientRect().y;

        if (dragHeight < hoverHeight) {
          this.todoList.insertBefore(dragItem, hoveredItem);
        } else if (dragHeight > hoverHeight) {
          this.todoList.insertBefore(dragItem, hoveredItem);
          this.todo[todoNo].ondragover = () => {};
        }
      };
      this.todo[todoNo].ondragleave = (e) => {
        const dragItem = document.querySelector(".dragging");
        if (e.screenY == 358) {
          this.todoList.insertBefore(dragItem, this.todo[0]);
        }
        if (
          this.todo[todoNo] === this.todo[todoIndex.length - 1] &&
          e.screenY >= 489
        )
          this.todoList.append(dragItem);
      };
      this.todo[todoNo].ondragend = () => {
        const dragItem = document.querySelector(".dragging");
        dragItem.classList.remove("dragging");
        this.assignCompleted();
        this.assignDelete();
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
  if (toggleMode === "light") {
    newClass(container, mod("light"));
  } else if (toggleMode === "dark") {
    newClass(container, mod("light"));
  }

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

  container.setAttribute("draggable", true);
  containers.todoList.append(container);

  todoIndex = [...todoIndex, todoIndex.length];
  toDoTracker.setTodos(todoIndex.length);
  containers.toggleEmpty();
}

const filterBtns = {
  stateColor: {
    inactive: "hsl(234, 11%, 52%)",
    active: "blue",
  },
  setStateColor: function (all, completed, active) {
    this.desktop.all.style.color = all;
    this.desktop.completed.style.color = completed;
    this.desktop.active.style.color = active;

    this.mobile.all.style.color = all;
    this.mobile.completed.style.color = completed;
    this.mobile.active.style.color = active;
  },
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
  allState: () =>
    filterBtns.setStateColor(
      filterBtns.stateColor.active,
      filterBtns.stateColor.inactive,
      filterBtns.stateColor.inactive
    ),
  activeState: () =>
    filterBtns.setStateColor(
      filterBtns.stateColor.inactive,
      filterBtns.stateColor.inactive,
      filterBtns.stateColor.active
    ),
  completedState: () =>
    filterBtns.setStateColor(
      filterBtns.stateColor.inactive,
      filterBtns.stateColor.active,
      filterBtns.stateColor.inactive
    ),
  setFilter: function (completed, active) {
    Object.keys(containers.todo).forEach((no) => {
      if (containers.circle[no].classList.contains("completed")) {
        containers.todo[no].style.display = completed;
        containers.todo[no].style.borderTopLeftRadius = ".5rem";
        containers.todo[no].style.borderTopRightRadius = ".5rem";
      } else {
        containers.todo[no].style.display = active;
        containers.todo[no].style.borderTopLeftRadius = ".5rem";
        containers.todo[no].style.borderTopRightRadius = ".5rem";
      }
    });
  },
  setOnClick: function (filterCat, state) {
    function sortToDo() {
      if (filterCat === "all") {
        filterBtns.removeFilters();
      } else if (filterCat === "active") {
        filterBtns.setFilter("none", "flex");
      } else if (filterCat === "completed") {
        filterBtns.setFilter("flex", "none");
      }
    }
    function setOnCliCK() {
      state();
      sortToDo();
      filterMode = filterCat;
    }
    this.mobile[filterCat].onclick = () => setOnCliCK();
    this.desktop[filterCat].onclick = () => setOnCliCK();
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
        containers.assignDrag();
        this.clearCompleted();
      }
    });
  },
};

filterBtns.clear.onclick = () => {
  filterBtns.clearCompleted();
  containers.toggleEmpty();
  toDoTracker.setTodos(containers.todo.length);
};

filterBtns.setOnClick("all", filterBtns.allState);
filterBtns.setOnClick("active", filterBtns.activeState);
filterBtns.setOnClick("completed", filterBtns.completedState);

containers.todoInput.onfocus = () => {
  filterBtns.allState();
  filterBtns.removeFilters();
  filterMode = "all";
};

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
  containers.assignDrag();
};

const displayMode = {
  btn: document.getElementsByClassName("top__display-mode")[0],
  moon: document.getElementsByClassName("top__display-mode--dark")[0],
  sun: document.getElementsByClassName("top__display-mode--light")[0],
  element: function (ele, mode, no) {
    const cont = document.getElementsByClassName(`${ele}--${mode}`)[no];
    if (mode === "light") {
      cont.classList.remove(`${ele}--light`);
      cont.classList.add(`${ele}--dark`);
    } else if (mode === "dark") {
      cont.classList.remove(`${ele}--dark`);
      cont.classList.add(`${ele}--light`);
    }
  },
};

displayMode.btn.onclick = () => {
  if (
    displayMode.moon.style.display === "" ||
    displayMode.moon.style.display === "inline"
  ) {
    toggleMode = "dark"
    displayMode.moon.style.display = "none";
    displayMode.sun.style.display = "inline";
    displayMode.element("body", "light", 0);
    displayMode.element("text", "light", 0);
    displayMode.element("header", "light", 0);
    displayMode.element("todos__layout", "light", 0);
    displayMode.element("todos__manage", "light", 0);
    displayMode.element("filter-box", "light", 0);
    displayMode.element("filter-box", "light", 0);
  } else {
    toggleMode = "light"
    displayMode.moon.style.display = "inline";
    displayMode.sun.style.display = "none";
    displayMode.element("body", "dark", 0);
    displayMode.element("text", "dark", 0);
    displayMode.element("header", "dark", 0);
    displayMode.element("todos__layout", "dark", 0);
    displayMode.element("todos__manage", "dark", 0);
    displayMode.element("filter-box", "dark", 0);
    displayMode.element("filter-box", "dark", 0);
  }
};
