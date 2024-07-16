/**
 * Функция возвращает true, если str содержит '1xBet' или 'XXX', а иначе false
 * Функция должна быть нечувствительна к регистру
 * @param {string} str
 * @returns {boolean}
 */
function checkSpam(str) {
    str = str.toLowerCase();
  return str.includes("1xbet") || str.includes("xxx");
}
