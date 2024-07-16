/**
 * Функция принимает массив чисел
 * Функция не должна изменять исходный массив
 * @param {Array} arr - Массив чисел
 * @param {number} a
 * @param {number} b
 * @returns {Array} — возвращает новый массив элементов между a и b включая значения a и b
 */
function filterRange(arr, a, b) {
  return arr.filter(item => item >= a && item <= b);
}
