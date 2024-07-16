/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Функцию валидирует имя пользователя
 * по следующему условию — имя не пустое, без пробелов, минимум 4 символа
 * @param {string | null} name
 * @returns {boolean}
 */
function isValid(name) {
  return name !== null && name.length >= 4 && !name.includes(" ") || false;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
