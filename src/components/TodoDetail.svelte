<script>
    import {deleteTodo, updateTodo} from '../stores/TodoStore';
    import Button from '../shared/Button.svelte';
    export let todo;
</script>


<div class="todo" >
    <h4 class:completed={todo.completed}>{ todo.text }</h4>
    <div>
        <input type="checkbox" checked={todo.completed} on:change={() =>updateTodo(todo.id, todo.completed)}>
        <button type="button" on:click={() => deleteTodo(todo.id)}>Delete</button>
    </div>
</div>


<style>
    .todo{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 6px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }
    .completed{
        text-decoration: line-through;
    }
</style>