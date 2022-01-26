<script>
	import { isLoggedIn, logout } from '../stores/TodoStore.js';

</script>


<header>
    <h1>
        To-Do List
    </h1>

	{#if $isLoggedIn}
		<h5 on:click|preventDefault={logout}>
			Log Out
		</h5>	
	{/if}
	
</header>


<style>

	header {
		color: #ff3e00;
		text-transform: uppercase;
	}

    h1 {
		font-size: 4em;
		font-weight: 100;
	}

	h5 {
		padding-bottom: 45px;
	}

	h5:hover {
		text-decoration: underline;
		cursor: pointer;
	}

</style>