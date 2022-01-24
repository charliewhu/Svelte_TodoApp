<script>
    import { createEventDispatcher } from 'svelte';
    import Button from '../../shared/Button.svelte';
    import { signup } from '../../stores/TodoStore.js';

    let dispatch = createEventDispatcher(); //dispatcher for activeTab
    let fields = {username:'', email:'', password1:'', password2:''}; 
    let errors = ''; 
    let valid = false;

    const submitHandler = () => {
        valid = true;

        //validate login fields are not blank
        if ( fields.username.trim().length < 1 || 
            fields.email.trim().length < 1 || 
            fields.password1.length < 1 ){
            valid = false;
            errors = 'Fields cannot be blank';
        } else {
            errors = '';
        }

        if (valid) {
            signup(fields.username, fields.email, fields.password1, fields.password2);
            dispatch('signup'); //tell App.svelte to change activeTab
        }
    }
</script>


<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <input type="text" placeholder="Username..." bind:value={fields.username}>
    </div>
    <div class="form-field">
        <input type="text" placeholder="Email..." bind:value={fields.email}>
    </div>
    <div class="form-field">
        <input type="password" placeholder="Password..." bind:value={fields.password1}>
    </div>
    <div class="form-field">
        <input type="password" placeholder="Re-Enter Password..." bind:value={fields.password2}>
    </div>
    <div class="error">{ errors }</div>
    <Button>Sign Up</Button>
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