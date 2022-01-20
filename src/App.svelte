<script>
	import Header from './components/Header.svelte';
	import Tabs from './shared/Tabs.svelte';

	let tabs = ['Todo List', 'Add Todo'];
	let activeTab = 'Todo List';

	const tabChange = (e) => {
		// sets tab as activeTab when clicked on
		activeTab = e.detail; 
	}

	
</script>



<main>
	<Header/>
	<Tabs on:tabChange={tabChange} {activeTab} {tabs}/>
	{#if activeTab === 'Todo List'}
		<p>TodoList</p>
	{:else if activeTab === 'Add Todo'}
		<p>TodoCreateForm</p>
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