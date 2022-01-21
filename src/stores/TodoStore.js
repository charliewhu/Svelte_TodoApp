import {writable} from 'svelte/store';

const url = 'http://127.0.0.1:8000/';

export let todos = writable(
    [
		// { 
		// 	id: 1, 
		// 	text: 'Todo1',
		// 	completed: false
		// },
		// { 
		// 	id: 2, 
		// 	text: 'Todo2', 
		// 	completed: true
		// }
	]
);

export const loadTodos = async () => {
	fetch(url)
		.then(res => res.json())
		.then(data => todos.set(data));
}

loadTodos();


export const createTodo = (newTodo) => {
    todos.update((currentTodos) => {
        const newTodos = [newTodo, ...currentTodos];
        return newTodos;
    })
}


export const deleteTodo = (id) => {
    todos.update(todos => todos.filter(todo => todo.id !== id));
}


