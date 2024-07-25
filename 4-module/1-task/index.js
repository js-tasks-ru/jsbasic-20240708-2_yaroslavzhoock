/**
 * Функция преобразует переданный массив в стандартный HTML.
 * @param {Array} arr — Массив друзей.
 * @return {Object} — Возвращает узел-элемент.
 */
function makeFriendsList(friends) {
  const ul = document.createElement("ul");

  for (let key of friends) {
    let li = document.createElement("li");
    li.innerHTML = `${key.firstName} ${key.lastName}`;
    ul.append(li);
  }
  return ul;
}
