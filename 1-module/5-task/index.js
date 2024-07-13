/**
 * Функция проверяет длину строки str и, если она превосходит maxlength, заменяет конец str на "…"
 * @param {string} str
 * @param {number} maxlength
 * @returns {string} ту же строку, если усечение не требуется, либо
 * усечённую строку, если длина исходной строки больше maxlength.
 */
function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}
