const form = document.querySelector('#myForm')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#message')

form.addEventListener('submit', (event) => {
  event.preventDefault() // отменил стандартное поведение отправки формы

  // Проверил валидность полей
  const name = nameInput.value.trim()
  const email = emailInput.value.trim()
  const message = messageInput.value.trim()

  if (!name) {
    alert('Введите имя')
    nameInput.focus()
    return
  }

  if (!email) {
    alert('Введите email')
    emailInput.focus()
    return
  }

  if (!isValidEmail(email)) {
    alert('Некорректный email')
    emailInput.focus()
    return
  }

  if (!message) {
    alert('Введите сообщение')
    // const errorMes = 
    messageInput.focus()
    return
  }

  // создал объект с данными формы
  const formData = {
    name,
    email,
    message,
  }

  // Отправляем данные на сервер
  sendData(formData)


  // очищаю форму
  document.querySelector(`#myForm`).reset()
});

// f для проверки валидности email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

let arrayForms = []
// f для отправки данных на сервер
function sendData(formData) {
  // Здесь можно использовать любой метод отправки данных на сервер, например, fetch или axios
  // В данном случае просто выводим данные в консоль
  arrayForms.push(formData)
  console.log(arrayForms);
}
