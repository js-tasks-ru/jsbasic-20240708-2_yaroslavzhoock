/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */


export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement("table");
    this.elem.insertAdjacentHTML(
      "afterbegin",
      "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th<th>Город</th><th></th></tr></thead><tbody></tbody>"
    );

    this.render();
    this.onClick();
  }

  render() {
    let tbody = this.elem.querySelector("tbody");
    tbody.insertAdjacentHTML(
      "afterbegin",
      this.rows
        .map(
          (item) =>
            `<tr><td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td><td>${item.city}</td><td><button>X</button></td></tr>`
        )
        .join("")
    );

    return this.elem;
  }

  onClick() {
    this.elem.onclick = ({ target }) => {
      let btn = target.closest("button");
      if (btn) btn.closest("tr").remove();
    };
  }
}