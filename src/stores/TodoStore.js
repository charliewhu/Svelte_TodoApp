import {writable} from 'svelte/store';
import axios from 'axios';

const url = 'http://127.0.0.1:8000/';
const headers = { 
	'Accept': 'application/json, text/plain',
	'Content-Type': 'application/json'
};

const config = {'headers':headers};
axios.defaults.headers.common['header1'];

export let todos = writable([]);

export const loadTodos = async () => {

	axios.get(url) //GET todoList
	.then(response => {todos.set(response.data)})
	.catch(err => console.log(err.response.status, err.message)); //set todoList in Store

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
