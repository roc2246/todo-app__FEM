const form = document.getElementsByClassName("todos")[0];
form.onsubmit = (e) => {
  e.preventDefault();
};

const todos = document.getElementsByClassName("todos__list--item");

const deleteBtn = document.getElementsByClassName("todos__layout--delete");

let btnNo = [];
Object.keys(deleteBtn).forEach((btn) => {
  btnNo = [...btnNo, parseInt(btn)];
});

btnNo.forEach((btn) => {
  deleteBtn[btnNo[btn]].onclick = () => {
    const lastBtnNo = btnNo.length - 1;
    const firstBtnNo = 0;
    if (btnNo[btn] === undefined) btnNo[btn] = lastBtnNo;
    if (todos[btnNo[btn]] === undefined) btnNo[btn] = firstBtnNo;

    todos[btnNo[btn]].remove();
    btnNo.pop();
  };
});
