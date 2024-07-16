/**
 * Функцию возращает true, если в объекте нет свойств и false – если хоть одно свойство есть.
 * @param {Object} obj
 * @return {boolean}
 */

function isEmpty(obj) {
  for (let k in obj) return false;
  return true;
}
