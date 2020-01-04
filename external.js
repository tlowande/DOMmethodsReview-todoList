window.onload = function () {

  // Step 1 -> create variables `form`, `todosList`, `button`, `input`
  // to target the form, unordered list, button and input.


  const form = document.querySelector("form");
  const todoList = document.querySelector("ul");
  const button = document.querySelector("button");
  const inputDescription = document.getElementById("description")
  const date = document.getElementById("date")
  const input = document.getElementById("user-todo");

  const todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []

  // const taskComplete = localStorage.getItem('taskComplete') ? JSON.parse(localStorage.getItem('taskComplete')) : []

  // use localStorage setItem() method to set `todos` to a string with `JSON.stringify()`
  // JSON.stringify() if used because localStorage works with strings. This is how
  // we sent data to localStorage.
  localStorage.setItem('todos', JSON.stringify(todosArray))

  // localStorage.setItem('taskComplete', JSON.stringify(taskComplete))

  // Declare a variable `storage` that contains all the information in localStorage.
  // We will assign to `storage` JSON.parse() method that converts strings from local
  // storage into data we can access with JavaScript.
  // When receiving data from a web server, the data is always a string.
  //Parse the data with JSON.parse(), and the data becomes a JavaScript object.
  const storage = JSON.parse(localStorage.getItem('todos'))
  const status = JSON.parse(localStorage.getItem('taskComplete'))

  // Step 2 -> attach an event listener to the `form` variable with `addEventListener`
  // to capture the user input on the `submit` event.
  // Make sure to run `preventDefault()` on the event when the form is submitted.
  // Call a `todoMaker` function which we will create in step three and pass to it
  // the `input` variable and target the value the user has provide with `input.value`.
  // Finally, set the `input.value` to an empty string.const form = document.querySelector("form");
  form.addEventListener("submit", e => {
    e.preventDefault()

    // push onto `todosArray` the `input.value`
    // todosArray.push(input.value)

    let todo = {
      "title": input.value,
      "description": inputDescription.value ? inputDescription.value : "",
      "complete": "false",
      "date": date.value
    }
    todosArray.push(todo)
    // taskComplete.push("false")
    // on localStorage now use `setItem()` for the key `'todos'` the value of the todosArray as a string with the `JSON.stringify()` method.
    localStorage.setItem('todos', JSON.stringify(todosArray))
    // localStorage.setItem('taskComplete', JSON.stringify(taskComplete))

    todoMaker(todo)
    input.value = ""
    inputDescription.value = ""
    date.value = ""
  })

  // Step 3 -> create a todoMaker function that creates 'li' elements with the text user provides
  // from their form and appends it to the 'ul'.
  const todoMaker = (value) => {

    let container = document.createElement("div");
    let wrap = document.createElement("div");
    let todoItem = document.createElement("p");
    let details = document.createElement("p");
    let date = document.createElement("p");
    wrap.classList.add('wrap')
    container.classList.add('container')
    // todoItem.textContent = value
    todoItem.textContent = value.title;
    todoItem.classList.add('to-do')
    details.textContent = value.description
    details.classList.add('description')
    date.textContent = (new Date(value.date)).toDateString();
    date.classList.add('date')

    // console.log(taskComplete[todosArray.indexOf(value)])

    // if (taskComplete[todosArray.indexOf(value)] === "true") {
    if (value.complete === "true") {
      container.classList.add('complete')
    } else if ((new Date(value.date)).toDateString() === (new Date()).toDateString()) {
      date.classList.add('warning')
    } else if (new Date(value.date) < new Date()) {
      date.classList.add('delayed')
    }

    todoItem.addEventListener("click", () => {
      if (container.classList.contains('complete')) {
        container.classList.remove('complete')
        // taskComplete.splice(todosArray.indexOf(value), 1, "false")
        todosArray.splice(todosArray.indexOf(value), 1, { ...value, "complete": "false" })

        localStorage.setItem('todos', JSON.stringify(todosArray))
        // localStorage.setItem('taskComplete', JSON.stringify(taskComplete))
      } else {
        container.classList.add('complete')
        // taskComplete.splice(todosArray.indexOf(value), 1, "true")
        todosArray.splice(todosArray.indexOf(value), 1, { ...value, "complete": "true" })

        localStorage.setItem('todos', JSON.stringify(todosArray))
        // localStorage.setItem('taskComplete', JSON.stringify(taskComplete))
      }
    })

    const icon = document.createElement("i")

    icon.setAttribute("class", "fas fa-times-circle")

    icon.addEventListener("click", () => {
      // taskComplete.splice(todosArray.indexOf(value), 1)
      todosArray.splice(todosArray.indexOf(value), 1)
      localStorage.setItem('todos', JSON.stringify(todosArray))
      // localStorage.setItem('taskComplete', JSON.stringify(taskComplete))
      wrap.parentNode.removeChild(wrap)
    })

    container.appendChild(todoItem)
    container.appendChild(details)
    container.appendChild(date)
    wrap.appendChild(container)
    wrap.appendChild(icon)
    todoList.appendChild(wrap)


  }

  todosArray.map(item => todoMaker(item))

  // Step 4 -> attach an event listener to the `clear all` button listening for
  // a user click.
  // In the function use a while loop checking to see whether there
  // is an li element as a child of the `ul` tag. In the code block use the
  // removeChild() DOM method to removed that `li` using the firstChild property.
  button.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild)
    }
  })
}
