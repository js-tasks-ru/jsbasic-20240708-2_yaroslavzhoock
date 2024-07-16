/**
 * Функция возращает number, как сумму всех зарплат команды
 * @param {Object} obj
 * @return {number}
 */
function sumSalary(obj) {
  let sum = 0;
  for(let key in obj) {
    if(typeof obj[key] == "number" && isFinite(obj[key])) {
      sum += obj[key];
    }
  }
  return sum;
}
