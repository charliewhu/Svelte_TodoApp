<script>
	import Header from './components/Header.svelte';
	import Tabs from './shared/Tabs.svelte';
	import TodoCreateForm from './components/TodoCreateForm.svelte';
	import TodoList from './components/TodoList.svelte';
	import { isLoggedIn, loading } from './stores/TodoStore.js';
	
	let tabs;
	let activeTab;

	// when isLoggedIn changes, re-run statement
	$: if ($isLoggedIn) {
		activeTab = 'To-Do List';
		tabs = ['To-Do List', 'Add To-Do'];
	} else {
		activeTab = 'Log-In';
		tabs = ['Log-In', 'Sign-Up'];
	}
	
	const tabChange = (e) => {
		// sets tab as activeTab when clicked on
		activeTab = e.detail; 
	}

	const handleCreate = (e) => {
		activeTab = 'To-Do List';
	}

</script>


<main>
	<Header/>

	<!-- 
		IF $loading 
			show loading screen
		ELSE
			IF !$isLoggedIn
				IF activeTab === 'Log-In'
					<Login/>
				ELSE
					<Signup/>
				END IF
			ELSE
				IF activeTab === 'To-Do List'
					<TodoList/>
				ELSE
					<TodoCreateForm on:create={handleCreate}/>
				END IF
			END IF
		END IF
	 -->

	{#if !$isLoggedIn}
		<Tabs on:tabChange={tabChange} {activeTab} {tabs}/>

		{#if activeTab === 'Log-In'}
			<TodoList/>       
		{:else if activeTab === 'Sign-Up'}
			<TodoCreateForm on:create={handleCreate}/>
		{/if}

	{:else}
		<Tabs on:tabChange={tabChange} {activeTab} {tabs}/>

		{#if activeTab === 'To-Do List'}
			<TodoList/>
		{:else if activeTab === 'Add To-Do'}
			<TodoCreateForm on:create={handleCreate}/>
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