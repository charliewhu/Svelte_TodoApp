<script>
	import Header from './components/Header.svelte';
	import Tabs from './shared/Tabs.svelte';
	import TodoCreateForm from './components/TodoCreateForm.svelte';
	import TodoList from './components/TodoList.svelte';
	import Login from './components/auth/Login.svelte'
	import Signup from './components/auth/Signup.svelte'
	import { isLoggedIn, loading } from './stores/TodoStore.js';
	
	// declare variables
	let tabs;
	let activeTab;

	// when isLoggedIn changes, re-run statement
	$: if ($isLoggedIn) {
		activeTab = 'To-Do List';
		tabs = ['To-Do List', 'Add To-Do'];
	} else {
		activeTab = 'Log-In';
		tabs = ['Log-In', 'Sign-Up'];
	};
	
	const tabChange = (e) => {
		// sets tab as activeTab when clicked on
		activeTab = e.detail; 
	};

	const handleCreate = (e) => {
		// after todo is created, flick back to todo list
		activeTab = 'To-Do List';
	};

	const handleSignup = (e) => {
		activeTab = 'Log-In';
	};

</script>


<main>
	<Header/>

	{#if $loading}
		<h1>Loading...</h1>
	{:else}
		<Tabs on:tabChange={tabChange} {activeTab} {tabs}/>
		{#if !$isLoggedIn}
			{#if activeTab === 'Log-In'}
				<Login/>
			{:else}
				<Signup on:signup={handleSignup}/>
			{/if}
		{:else}
			{#if activeTab ===  'To-Do List'}
				<TodoList/>       
			{:else if activeTab === 'Add To-Do'}
				<TodoCreateForm on:create={handleCreate}/>
			{/if}
		{/if}
	{/if}
	
</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>