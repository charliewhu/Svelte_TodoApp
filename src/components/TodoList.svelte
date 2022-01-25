<script>
    import {todos, isLoggedIn} from '../stores/TodoStore.js';
    import TodoDetail from './TodoDetail.svelte';
</script>


<div class="todo-list">



    {#if $todos.length < 1 }
        <h3>No items yet...</h3>
    {:else}
        {#each $todos as todo (todo.id)}
            <div>
                <TodoDetail {todo} />
            </div>
        {/each}
    {/if}

</div>


<style>
    .todo-list {
        display: grid;
        grid-gap: 20px;
        max-width: 400px;
        margin: 0 auto;
    }
</style>