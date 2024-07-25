/**
 * Функция выделит красным цветом все ячейки в таблице по диагонали.
 * @param {Element} e - table.
 */
function makeDiagonalRed(e) {
  for (const [i, v] of Object.entries(e.rows)) {
    v.cells[i].style.background = "red";
  }
}
