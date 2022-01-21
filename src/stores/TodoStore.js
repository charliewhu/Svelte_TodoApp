import {writable} from 'svelte/store';

const url = 'http://127.0.0.1:8000/';
const headers = { 
	'Accept': 'application/json, text/plain',
	'Content-Type': 'application/json'
};

export let todos = writable([]);

export const loadTodos = async () => {
	fetch(url)
	.then(res => res.json())
	.then(data => todos.set(data));
}

loadTodos();


export const createTodo = (newTodo) => {

	let body = JSON.stringify(newTodo);

	fetch(url, {
		method: 'POST',
		headers: headers,
		body: body
	})
	.then(res => res.json())
	.then(
		data => todos.update((currentTodos) => {
			const newTodos = [data, ...currentTodos];
			return newTodos;
    }));
}


export const deleteTodo = (id) => {

	let deleteUrl = url + id + '/'

	fetch(deleteUrl, {
		method: 'DELETE',
		headers: headers,
	});

    todos.update(
		todos => todos.filter(todo => todo.id !== id)
	);
}


export const updateTodo = (id, text, completed) => {

	let body = JSON.stringify({
		'id': id,
		'text': text,
		'completed': !completed
	});

	let updateUrl = url + id + '/'

	fetch(updateUrl, {
		method: 'PATCH',
		headers: headers,
		body: body
	});

	todos.update(todos => {
		let newTodos = [...todos];
		let changedTodo = newTodos.find(todo => todo.id === id);
		changedTodo.completed = !completed;
		return newTodos;
	});
}


