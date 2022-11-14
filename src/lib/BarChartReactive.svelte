<script>
	import { fly } from "svelte/transition";

	export let values = [];
	$: max = Math.max(...values);
</script>

<div class="chart">
	{#each values as value}
		<div style="width: {value / max * 100}%" transition:fly={{ x: -200, duration: 300 }}>
			{value}
		</div>
	{/each}
</div>

<style>
	.chart :global(div) {
		background-color: cornflowerblue;
		text-align: right;
		padding: 2px;
		padding-right: 0.5em;
		margin: 1px 0;
		color: white;

		transition: width 300ms ease;
	}
</style>
