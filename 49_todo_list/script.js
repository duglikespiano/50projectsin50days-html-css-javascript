const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const todos = JSON.parse(localStorage.getItem('todos'));

const addTodo = (todo) => {
	let todoText = input.value;
	if (todo) {
		todoText = todo.text;
	}
	if (todoText) {
		const todoElement = document.createElement('li');
		if (todo && todo.completed) {
			todoElement.classList.add('completed');
		}
		todoElement.innerText = todoText;
		todoElement.addEventListener('click', () => {
			todoElement.classList.toggle('completed');
			updateLocalStorage();
		});
		todoElement.addEventListener('contextmenu', (event) => {
			event.preventDefault();
			todoElement.remove();
			updateLocalStorage();
		});
		todosUL.appendChild(todoElement);
		input.value = '';
		updateLocalStorage();
	}
};

const updateLocalStorage = () => {
	const todosElements = document.querySelectorAll('li');
	const todos = [];
	todosElements.forEach((todosElement) => {
		todos.push({
			text: todosElement.innerText,
			completed: todosElement.classList.contains('completed'),
		});
	});
	localStorage.setItem('todos', JSON.stringify(todos));
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	addTodo();
});

if (todos) {
	todos.forEach((todo) => addTodo(todo));
}
