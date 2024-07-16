/**
 * Функцию преобразует массив объектов в массив имён
 * Функция возращает Array
 * @param {Object[]} obj
 * @return {Array}
 */
function namify(obj) {
  return obj.map(item => item.name);
}
