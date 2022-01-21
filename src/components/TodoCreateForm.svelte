<script>
    import { createEventDispatcher } from 'svelte';
    import Button from '../shared/Button.svelte';
    import {createTodo} from '../stores/TodoStore.js';

    let dispatch = createEventDispatcher();
    let fields = {text: ''};
    let errors = {todo: ''};
    let valid = false;

    const submitHandler = () => {
        valid = true;
        
        //validate new Todo is not blank
        if (fields.text.trim().length < 1){
            valid = false;
            errors.todo = 'Todo cannot be blank';
        } else {
            errors.todo = '';
        }

        if (valid) {
            let todo = {id: Date.now(), text: fields.text, completed: false}; //get form data
            createTodo(todo); //send form data to store/create function
            dispatch('create'); //tell App.svelte to change activeTab
        }
    }
</script>


<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <input type="text" id="text" bind:value={fields.text}>
        <div class="error">{ errors.todo }</div>
    </div>
    <Button>Add Todo</Button>
</form>


<style>
    .form-field {
        margin-bottom: 10px;
    }
    .error {
        color: #ff3e00;
        font-weight: bold;
        font-size: 12px;
    }
</style>