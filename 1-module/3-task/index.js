
/**
 * Функция возвращающает строку str с заглавным первым символом.
 * Функция также должна работать со строкой:
 * содержащей только один символ 'В'
 * не содержащей символы ''
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
