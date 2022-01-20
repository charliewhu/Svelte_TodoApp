<script>
    import Button from '../shared/Button.svelte'
    let fields = {todo: ''};
    let errors = {todo: ''};
    let valid = false;

    const submitHandler = () => {
        valid = true;
        if (fields.todo.trim().length < 1){
            valid = false;
            errors.todo = 'Todo cannot be blank';
        } else {
            errors.todo = '';
        }

        if (valid) {
            console.log('valid', fields)
        }
    }
</script>


<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <input type="text" id="todo" bind:value={fields.todo}>
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