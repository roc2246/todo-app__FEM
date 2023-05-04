let btnIndex = [];

const todoList = document.getElementsByClassName("todos__list")[0];
const todo = document.getElementsByClassName("todos__list--item");
const todoInput = document.getElementsByClassName("todos__layout--input")[0];

function toggleEmptyMssg() {
  const empty = document.getElementsByClassName("todos__empty")[0];
  if (todoList.length !== 0) {
    empty.style.display = "none";
  } else {
    empty.style.display = "flex";
  }
}

const newElement = (ele) => document.createElement(ele);
const newClass = (ele, name) => ele.classList.add(name);
const mod = (mod) => `todos__layout--${mod}`;

function assignDelete() {
  const deleteBtn = document.getElementsByClassName("todos__layout--delete");
  btnIndex.forEach((btn) => {
    let btnNo = btnIndex[btn];
    deleteBtn[btnNo].onclick = () => {
      const lastBtnIndex = btnIndex.length - 1;
      const firstBtnIndex = 0;
      if (btnNo === undefined) btnNo = lastBtnIndex;
      if (todo[btnNo] === undefined) btnNo = firstBtnIndex;

      todo[btnNo].remove();
      btnIndex.pop();
      assignDelete();
      assignCompleted();
    };
  });
}

function assignCompleted() {
  const circle = document.querySelectorAll(
    ".todos__layout--circle:not(.todos__new--circle"
  );
  btnIndex.forEach((btn) => {
    let btnNo = btnIndex[btn];
    circle[btnNo].onclick = () => {
      if (!circle[btnNo].classList.contains("completed")) {
        circle[btnNo].classList.add("completed");
      } else {
        circle[btnNo].classList.remove("completed");
      }
    };
  });
}

function newToDo() {
  // toggleEmptyMssg();

  const container = newElement("span");
  newClass(container, "todos__layout");
  newClass(container, "todos__list--item");

  const circleBtn = newElement("div");
  newClass(circleBtn, mod("circle"));

  const text = newElement("p");
  newClass(text, mod("text"));
  text.innerText = todoInput.value;

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

  todoList.append(container);

  btnIndex = [...btnIndex, btnIndex.length];
}

const form = document.getElementsByClassName("todos")[0];

todoInput.onkeydown = (e) => {
  if (e.key === "Enter") {
    newToDo();
    todoInput.value = "";
    todoInput.focus();
  }

  assignDelete();
  assignCompleted();
  // toggleEmptyMssg();
};

const circle = document.getElementsByClassName("todos__layout--circle");
const filterBtns = {
  clear: document.getElementsByClassName("filter--clear")[0],
  allMobile: document.getElementsByClassName("filter--all")[0],
  allDesktop: document.getElementsByClassName("filter--all")[1],
  activeMobile: document.getElementsByClassName("filter--active")[0],
  activeDesktop: document.getElementsByClassName("filter--active")[1],
  completedMobile: document.getElementsByClassName("filter--completed")[0],
  completedDesktop: document.getElementsByClassName("filter--completed")[1],
};

filterBtns.clear.onclick = () => {
  btnIndex = [];
  todoList.innerHTML = "";
};

filterBtns.allMobile.onclick = () => {
  filterBtns.allMobile.style.color="blue"
  Object.keys(todo).forEach((no) => {
    todo[no].style.display = "flex";
  });
};
filterBtns.allDesktop.onclick = () => {
  filterBtns.allDesktop.style.color="blue"
  Object.keys(todo).forEach((no) => {
    todo[no].style.display = "flex";
  });
};

filterBtns.activeMobile.onclick = () => {
  filterBtns.allMobile.style.color="hsl(234, 11%, 52%)"
  Object.keys(todo).forEach((no) => {
    if (circle[no].classList.contains("completed")) {
      todo[no].style.display = "none";
    } else {
      todo[no].style.display = "flex";
    }
  });
};
filterBtns.activeDesktop.onclick = () => {
  filterBtns.allDesktop.style.color="hsl(234, 11%, 52%)"
  Object.keys(todo).forEach((no) => {
    if (circle[no].classList.contains("completed")) {
      todo[no].style.display = "none";
    } else {
      todo[no].style.display = "flex";
    }
  });
};

filterBtns.completedMobile.onclick = () => {
  filterBtns.allMobile.style.color="hsl(234, 11%, 52%)"
  Object.keys(todo).forEach((no) => {
    if (!circle[no].classList.contains("completed")) {
      todo[no].style.display = "none";
    } else {
      todo[no].style.display = "flex";
    }
  });
};
filterBtns.completedDesktop.onclick = () => {
  filterBtns.allDesktop.style.color="hsl(234, 11%, 52%)"
  Object.keys(todo).forEach((no) => {
    if (!circle[no].classList.contains("completed")) {
      todo[no].style.display = "none";
    } else {
      todo[no].style.display = "flex";
    }
  });
};
