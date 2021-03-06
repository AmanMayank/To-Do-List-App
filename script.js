//Selectors
const todoInput = document.querySelector('.input');
const todoButton = document.querySelector('.button');
const todoList = document.querySelector('.list');
const filterOption = document.querySelector('.filter-todo');
const countButton = document.querySelector('.count');
var count = 0;
var completed = 0;
var incomplete = count-completed;

//Event Listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
  //Prevent form from submitting
  event.preventDefault();
  
  if(todoInput.value === ""){
    return;
  }
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  //Checked Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class = "fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //Delete Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //clear Todo Input value
  todoInput.value = "";
  count++;
  counter(count);

}



function deleteCheck(e){
  const item = e.target;
  if(item.classList[0] === "trash-btn"){
    count--;
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function(){
      todo.remove();  
      counter(count);  
    });    
  }

  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    counter(count);
  }
}

function counter(count){
  this.count=count;
  const todos = todoList.childNodes;
  var completedcount=0;
  todos.forEach(function(todo){
    if(todo.classList.contains("completed")){
      completedcount++;
    }
  })
  completed = completedcount;
  incomplete = count-completed;
  countButton.innerText = 'Total tasks = ' + count + ' completed = ' + completed + ' Incomplete = ' + incomplete;
}

function filterTodo(e){
  const todos = todoList.childNodes;

  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
      todo.style.display="flex";
      break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;
        case "incomplete":
          if(!todo.classList.contains("completed")){
            todo.style.display = "flex";
          }else{
            todo.style.display = "none";
        }
        break;
     }
  });
}


