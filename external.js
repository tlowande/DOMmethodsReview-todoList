window.onload = function () {


  const form = document.querySelector("form");
  const todoList = document.querySelector("ul");
  const button = document.querySelector("button");
  const inputDescription = document.getElementById("description")
  const date = document.getElementById("date")
  const input = document.getElementById("user-todo");

  const todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []

  localStorage.setItem('todos', JSON.stringify(todosArray))

  //____________________

  form.addEventListener("submit", e => {
    e.preventDefault()

    let todo = {
      "title": input.value,
      "description": inputDescription.value ? inputDescription.value : "",
      "complete": "false",
      "date": date.value
    }
    todosArray.push(todo)

    localStorage.setItem('todos', JSON.stringify(todosArray))

    todoMaker(todo)
    input.value = ""
    inputDescription.value = ""
    date.value = ""
  })

  //____________________

  const todoMaker = (value) => {

    let container = document.createElement("div");
    let wrap = document.createElement("div");
    let todoItem = document.createElement("p");
    let details = document.createElement("p");
    let date = document.createElement("p");

    wrap.classList.add('wrap')
    container.classList.add('container')

    todoItem.textContent = value.title;
    todoItem.classList.add('to-do')
    todoItem.setAttribute("contenteditable", "true");


    details.textContent = value.description
    details.classList.add('description')
    details.setAttribute("contenteditable", "true");

    date.textContent = (new Date(value.date.replace(/-/g, "/"))).toDateString();
    date.classList.add('date')
    // date.setAttribute("contenteditable", "true");

    //_________________________

    //sets CSS when refreshing the page to each item
    if (value.complete === "true") {
      container.classList.add('complete')
    } else if ((new Date(value.date.replace(/-/g, "/"))).toDateString() === (new Date()).toDateString()) {
      date.classList.add('warning')
    } else if (Date.parse(value.date.replace(/-/g, "/")) < Date.parse(new Date().toDateString())) {
      date.classList.add('delayed')
    }

    //_________________________

    //when clicked, edit description
    details.addEventListener("focusout", () => {

      let newValue = {
        ...value,
        "description": details.innerText,
      }
      let index = todosArray.findIndex(e => e === value)

      todosArray.splice(index, 1, newValue)
      localStorage.setItem('todos', JSON.stringify(todosArray))
    })

    //_________________________

    //when clicked, edit title
    todoItem.addEventListener("focusout", () => {

      console.log(todoItem.innerText)
      let newValue = {
        ...value,
        "title": todoItem.innerText
      }
      console.log(newValue)

      let index = todosArray.findIndex(e => e === value)
      console.log(index)

      todosArray.splice(index, 1, newValue)

      localStorage.setItem('todos', JSON.stringify(todosArray))
    })

    //_________________________

    date.addEventListener("click", () => {
      console.log('date clicked')
    })

    //_________________________

    const check = document.createElement("i")
    check.setAttribute("class", "fas fa-check")

    //when clicking on the checkmark, task is marked as complete
    check.addEventListener("click", () => {
      if (container.classList.contains('complete')) {

        container.classList.remove('complete')



        if ((new Date(value.date.replace(/-/g, "/"))).toDateString() === (new Date()).toDateString()) {
          date.classList.add('warning')
        } else if (Date.parse(value.date.replace(/-/g, "/")) < Date.parse(new Date().toDateString())) {
          date.classList.add('delayed')
        }

        // if ((new Date(value.date)).toDateString() === (new Date()).toDateString()) {
        //   date.classList.add('warning')
        // } else if (new Date(value.date) < new Date()) {
        //   date.classList.add('delayed')
        // }

        todosArray.splice(todosArray.indexOf(value), 1, { ...value, "complete": "false" })

        localStorage.setItem('todos', JSON.stringify(todosArray))

      } else {

        date.classList.remove('warning')
        date.classList.remove('delayed')
        container.classList.add('complete')

        todosArray.splice(todosArray.indexOf(value), 1, { ...value, "complete": "true" })

        localStorage.setItem('todos', JSON.stringify(todosArray))
      }
    })

    //_________________________

    const del = document.createElement("i")

    del.setAttribute("class", "fas fa-times-circle")

    del.addEventListener("click", () => {

      todosArray.splice(todosArray.indexOf(value), 1)
      localStorage.setItem('todos', JSON.stringify(todosArray))
      wrap.parentNode.removeChild(wrap)
    })

    container.appendChild(todoItem)
    container.appendChild(details)
    container.appendChild(date)
    wrap.appendChild(check)
    wrap.appendChild(container)
    wrap.appendChild(del)
    todoList.appendChild(wrap)

  }
  //todoMaker ends here

  //_________________________

  todosArray.map(item => todoMaker(item))

  //_________________________

  button.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild)
    }
  })
}
