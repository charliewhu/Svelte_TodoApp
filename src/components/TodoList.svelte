<script>
    import TodoStore from '../stores/TodoStore.js';
    import TodoDetail from './TodoDetail.svelte';

</script>



<div class="todo-list">
    {#each $TodoStore as todo (todo.id)}
        <div>
            <TodoDetail {todo} />
        </div>
    {/each}
</div>


<style>
    .todo-list {
        display: grid;
        grid-gap: 20px;
        max-width: 400px;
        margin: 0 auto;
    }
</style>