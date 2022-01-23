import {writable} from 'svelte/store';

// API config
import axios from 'axios';
const url = 'http://127.0.0.1:8000/';
const headers = { 
	'Accept': 'application/json, text/plain',
	'Content-Type': 'application/json'
};
const config = {'headers':headers};


export let todos = writable([]);
export let isLoggedIn = writable(false);
export let loading = writable(true);


export const loadTodos = async () => {
	try {
		const res = await axios.get(url);
		todos.set(res.data);
		isLoggedIn.set(true);
		loading.set(false);
	} catch(err) {
		if (!err.response) {
			return console.log("Server timed out")  //5** error handle
		} else if (err.response.data.error == 401) {
			isLoggedIn = false; // user is not authenticated
		} else {
			console.log(err.response.status); // all other errors - HANDLE LATER
		}
	}

};

loadTodos();

export const createTodo = async (todoText) => {
	const todo = {'text': todoText}
	const body = JSON.stringify(todo);

	axios.post(url, body, config) //POST new todo
	.then(response => {
		todos.update((currentTodos) => { //take current Store todos and add the new one
			return [response.data, ...currentTodos];
		})
	});

};

export const deleteTodo = (id) => {
	const deleteUrl = url + id;

	axios.delete(deleteUrl);

    todos.update(
		todos => todos.filter(todo => todo.id !== id)
	);
};

export const updateTodo = (id, completed) => {
	const body = JSON.stringify({
		'id': id,
		'completed': !completed
	});

	const updateUrl = url + id + '/';

	axios.patch(updateUrl, body, config);

	todos.update(todos => {
		const newTodos = [...todos];
		const changedTodo = newTodos.find(todo => todo.id === id);
		changedTodo.completed = !completed;
		return newTodos;
	});
};
