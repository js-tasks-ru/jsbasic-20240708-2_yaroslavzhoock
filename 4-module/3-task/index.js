/**
 * Метод устанавливает необходимые по условию атрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let tr of table.rows) {
    for (let td of tr.cells) {
      let tr = td.parentElement;

      if (td.dataset.available == "true") tr.classList.add("available");
      if (td.dataset.available == "false") tr.classList.add("unavailable");

      !td.hasAttribute("data-available")
        ? (tr.hidden = true)
        : (tr.hidden = false);

      if (td.innerHTML == "m") tr.classList.add("male");
      if (td.innerHTML == "f") tr.classList.add("female");

      if (+td.innerHTML < 18) tr.style.textDecoration = "line-through";
    }
  }
}
