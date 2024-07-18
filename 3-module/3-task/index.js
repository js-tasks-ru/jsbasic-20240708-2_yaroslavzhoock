/**
 * Функция которая преобразует строки вида 'my-short-string' в 'myShortString'
 * Дефисы удаляются, а все слова после них получают заглавную букву
 * @param {string} str
 * @return {string} — возвращает преобразованную строку
 */
function camelize(str) {
    return str
    .split("-")
    .reduce(
      (concat, current) => concat + current[0].toUpperCase() + current.slice(1)
    );
}
