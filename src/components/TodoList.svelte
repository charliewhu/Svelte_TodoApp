<script>
    import TodoDetail from './TodoDetail.svelte';
    export let todos = [];
</script>



<div class="todo-list">
    {#each todos as todo (todo.id)}
        <div>
            <TodoDetail {todo} />
        </div>
    {/each}
</div>


<style>
    .todo-list {
        display: grid;
        grid-gap: 20px;
    }
</style>