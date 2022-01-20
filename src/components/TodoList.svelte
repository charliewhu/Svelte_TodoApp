<script>
    export let todos = [];
</script>



<div class="todo-list">
    {#each todos as todo (todo.id)}
        <div>{ todo.text }</div>
    {/each}
</div>


<style>
    .todo-list {
        display: grid;
        grid-gap: 20px;
        
    }
</style>