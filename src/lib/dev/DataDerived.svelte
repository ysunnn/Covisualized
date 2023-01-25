<script>
	import { onMount } from "svelte";
	import { dataAtDate, availableDatesForVariable, statesForVariableAtDate } from "../../stores";

	$: stores = {
		$dataAtDate,
		$availableDatesForVariable,
		$statesForVariableAtDate,
	};

	let selectedStoreName;

	onMount(() => {
		selectedStoreName = Object.keys(stores)[0];
	});
</script>

<h2>Derived Data Stores</h2>
<select bind:value={selectedStoreName}>
	{#each Object.keys(stores) as name}
		<option value={name}>{name}</option>
	{/each}
</select>
<textarea
	readonly
	value={JSON.stringify(stores[selectedStoreName], undefined, 2)}
/>

<style>
	textarea {
		flex-grow: 1;
		margin-top: 1rem;
		resize: none;
	}
</style>
