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

	let newTodoJson = JSON.stringify(newTodo);

	fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: headers,
		body: newTodoJson
	})
	.then(res => res.json())
	.then(data => todos.update((currentTodos) => {
        const newTodos = [data, ...currentTodos];
        return newTodos;
    }));
}


export const deleteTodo = (id) => {

	let deleteUrl = url + id

	fetch(deleteUrl, {
		method: 'DELETE',
		mode: 'cors',
		headers: headers,
	});

    todos.update(todos => todos.filter(todo => todo.id !== id));
}


