/* 1. https://jsonplaceholder.typicode.com/todos 로부터 데이터를 불러와서 추가해주는 함수 getTodos() 선언 */
// getTodos()는 추후에 HTML DOM 내용이 완전히 로드되었을 때 실행되어야 합니다.

fetch("https://jsonplaceholder.typicode.com/todos") //json파일 읽어오기
  .then((response) => response.json()) //읽어온 데이터를 json으로 변환
  .then((json) => {
    data = json;
    let count = 0;
    data.forEach((element) => {
      if (element.completed) {
        if (count < 10) {
          document.querySelector(
            "#container"
          ).innerHTML += `<div class="todo_${count}">
          <input type="checkbox" name = "todo"/>
            ${element.title}
          <button onclick="deleteTodo(${count})">x</button></div>`;
          count += 1;
        }
      }
    });
  });
async function getTodos() {}

/* 
  2. 새로운 입력창의 Todo를 Todo 목록에 추가하고, 입력창을 초기화합니다.
  - 공백이나 빈 문자열의 경우 추가될 수 없습니다.
  - 작성 버튼 클릭 시 addTodo() 함수가 실행됩니다.
  - 입력 창에서 Enter 키 입력시에도 addTodo() 함수가 실행됩니다.
*/

const todoForm = document.querySelector("#todo-form"); // form 태그
const todos = document.querySelector(".todos"); // ul 태그

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInput = document.querySelector('input[name="todo"]');
  console.dir(todoInput); // 요소가 가지고 있는 데이터를 출력
  console.log(todoInput.value);

  const todo = todoInput.value.trim();
  if (todo != "") {
    let co = Math.floor(Math.random() * 100) + 11;

    document.querySelector("#container").innerHTML += `
        <div class="todo_${co}">
          <input type="checkbox" name = "todo"/>
            ${todo}
        <button onclick="deleteTodo(${co})">x</button></div>`;
  } else {
    alert("오늘의 할 일을 작성해주세요!! :)");
  }

  todoInput.value = "";
});

/*  3. x 버튼을 클릭하면 클릭한 버튼을 갖는 Todo 항목이 삭제됩니다. */
// 삭제 함수의 이름 및 모양 변경 가능
function deleteTodo(item) {
  let target = document.querySelector(".todo_" + item);
  target.remove();
}

/* 
 4. Todo 목록 불러오기,  
 - GET https://jsonplaceholder.typicode.com/todos 요청의 응답 결과에서 맨 처음부터 10개의 원소만 잘라내어 
   투두 목록에 초기 Todo를 표시해야 합니다.
 - HTML 문서의 DOM 내용이 완전히 로드되었을 때 실행됩니다.
 - 따로 함수를 만들어도 좋고, 함수를 만들지 않아도 좋습니다.
*/
