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

	const response = await axios.get(url); //GET todoList
	todos.set(response.data); //set todoList in Store

};

loadTodos();

export const createTodo = async (todoText) => {
	const todo = {'text': todoText}
	const body = JSON.stringify(todo);

	const response = await axios.post(url, body, config) //POST new todo
	todos.update(
		(currentTodos) => { //take current Store todos and add the new one
			const newTodos = [response.data, ...currentTodos];
			return newTodos;
	});

};

export const deleteTodo = (id) => {
	const deleteUrl = url + id;

	axios.delete(deleteUrl, config);

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
