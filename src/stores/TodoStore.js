import {writable} from 'svelte/store';
import Cookies from 'js-cookie';

// API Axios config
import axios from 'axios';
const url = 'http://127.0.0.1:8000/';
const signupUrl = url + 'rest-auth/registration/';
const loginUrl = url + 'rest-auth/login/';
let token = Cookies.get('token') || '';

const removeAuthHeader = {
	headers: {
		'Authorization': ''
	}
}
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers = {
	'Accept': 'application/json, text/plain',
	'Authorization': `Token ${token}`,
	'Content-Type': 'application/json'
}


export let todos = writable([]);
export let isLoggedIn = writable(false);
export let loading = writable(true);


const resetAuthHeader = (res) => {
	//after receiving a new token, reassign the cookie and axio header
	Cookies.set('token', res.data.key, { secure: true });
	token = Cookies.get('token') || '';
	axios.defaults.headers.Authorization = `Token ${token}`;
}

export const signup = async (username, email, password1, password2) => {
	try {
		const user = {
			'username': username,
			'email': email,
			'password1': password1,
			'password2':password2
		};
		const body = JSON.stringify(user);
		const res = await axios.post(signupUrl, body, removeAuthHeader);
		resetAuthHeader(res);
		loadTodos();
	} catch (err) {
		console.log(err.response);
	};
};


export const login = async (username, password) => {
	try {
		const user = {
			'username': username,
			'password': password,
		};
		const body = JSON.stringify(user);
		const res = await axios.post(loginUrl, body, removeAuthHeader);
		resetAuthHeader(res);
		loadTodos();
	} catch (err) {
		console.log(err);
		console.log(err.response);
	};
};


export const loadTodos = async () => {
	try {
		const res = await axios.get(url);
		todos.set(res.data);
		isLoggedIn.set(true);
		loading.set(false);
	} catch(err) {
		if (!err.response) {
			console.log(err.response);
			console.log("Server timed out") ; //5** error handle
		} else if (err.response.status == 401) {
			console.log('Unauthorized')
			loading.set(false); 
		} else {
			console.log(err.response.status); // all other errors - HANDLE LATER
		}
	}

};


loadTodos();


export const createTodo = async (todoText) => {
	const todo = {'text': todoText}
	const body = JSON.stringify(todo);

	axios.post(url, body) //POST new todo
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

	axios.patch(updateUrl, body);

	todos.update(todos => {
		const newTodos = [...todos];
		const changedTodo = newTodos.find(todo => todo.id === id);
		changedTodo.completed = !completed;
		return newTodos;
	});
};
