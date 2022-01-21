import {writable} from 'svelte/store';


export const todos = writable(
    [
		{ 
			id: 1, 
			text: 'Todo1',
			completed: false
		},
		{ 
			id: 2, 
			text: 'Todo2', 
			completed: true
		}
	]
);


export const createTodo = (newTodo) => {
    todos.update((currentTodos) => {
        const newTodos = [newTodo, ...currentTodos];
        return newTodos;
    })
}


export const deleteTodo = (id) => {
    todos.update(todos => todos.filter(todo => todo.id !== id));
}


