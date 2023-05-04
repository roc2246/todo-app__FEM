let btnIndex = [];
const deleteBtn = document.getElementsByClassName("todos__layout--delete");

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
  btnIndex.forEach((btn) => {
    let btnNo = btnIndex[btn];
    deleteBtn[btnNo].onclick = () => {
      const lastBtnIndex = btnIndex.length - 1;
      const firstBtnIndex = 0;
      if (btnNo === undefined) btnNo = lastBtnIndex;
      if (todo[btnNo] === undefined) btnNo = firstBtnIndex;

      todo[btnNo].remove();
      btnIndex.pop();
    };
  });
}

function newToDo() {
  toggleEmptyMssg();

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
  if (e.key === "Enter") newToDo();
  assignDelete();
};
