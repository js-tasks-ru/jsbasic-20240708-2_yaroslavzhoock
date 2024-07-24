/**
 * Функция принимает строку с числами и возвращает объект, содержащий минимальное и максимальное значения чисел из этой строки.
 * Элементы в строке могут быть разделены только одним пробелом. При этом кроме чисел там могут быть слова и нечисловые символы (+, -, = и др).
 * @param {str} str — Cтрока с числами.
 * @return {Object}
 */
function getMinMax(str) {
  return str
    .split(" ")
    .filter(item => isFinite(item))
    .map(item => +item)
    .reduce((acc, item, i, arr) => ({
      ...acc,
      min: Math.min(...arr),
      max: Math.max(...arr)
    }));
}


