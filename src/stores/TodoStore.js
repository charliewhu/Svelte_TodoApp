import {writable} from 'svelte/store';

const TodoStore = writable(
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




export default TodoStore;