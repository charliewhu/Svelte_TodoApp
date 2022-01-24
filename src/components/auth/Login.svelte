<script>
    import { createEventDispatcher } from 'svelte';
    import Button from '../../shared/Button.svelte';

    let dispatch = createEventDispatcher(); //dispatcher for activeTab
    let fields = {email: '', password: ''}; 
    let errors = ''; 
    let valid = false;

    const submitHandler = () => {
        valid = true;

        //validate login fields are not blank
        if ( fields.email.trim().length < 1 || fields.password.length < 1 ){
            valid = false;
            errors = 'Fields cannot be blank';
        } else {
            errors = '';
        }

        // if (valid) {

            // login(fields.email, fields.password); //send form data to Store function
            // dispatch('logIn'); //tell App.svelte to change activeTab

        //     let todo = fields.text; //get form data
        //     createTodo(todo); //send form data to store/create function
        //     dispatch('logIn'); 
        // }
    }
</script>


<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <input type="text" placeholder="Email..." bind:value={fields.email}>
    </div>
    <div class="form-field">
        <input type="password" placeholder="Password..." bind:value={fields.password}>
    </div>
    <div class="error">{ errors }</div>
    <Button>Log In</Button>
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