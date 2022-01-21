<script>
	import Header from './components/Header.svelte';
	import Tabs from './shared/Tabs.svelte';
	import TodoCreateForm from './components/TodoCreateForm.svelte';
	import TodoList from './components/TodoList.svelte';
	

	let tabs = ['To-Do List', 'Add To-Do'];
	let activeTab = 'To-Do List';

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
	<Tabs on:tabChange={tabChange} {activeTab} {tabs}/>
	{#if activeTab === 'To-Do List'}
		<TodoList/>
	{:else if activeTab === 'Add To-Do'}
		<TodoCreateForm on:create={handleCreate}/>
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