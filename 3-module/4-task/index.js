/**
 * Функция принимает массив пользователей arr и максимальный возраст age
 * Функция возвращает строку с именами и зарплатами пользователей, у которых возраст меньше или равен параметру age.
 * @param {Array} arr — массив пользователей
 * @param {number} age — максимальный возраст пользователя (любое число)
 * @return {string}
 */
const showSalary = (arr, age) =>
  arr
    .filter(i => i.age <= age)
    .map(i => `${i.name}, ${i.balance}\n`)
    .join('')
    .slice(0, this.length - 1);
