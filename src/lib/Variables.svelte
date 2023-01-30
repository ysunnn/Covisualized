<script>
	import { filter } from "../stores";
	import { variables } from "../util";

	import Button from "./Button.svelte";
</script>

<div class="variables">
	{#each variables as { id, label, icon, color }}
		<Button
			{color}
			{icon}
			variant={$filter.variable === id ? "fill" : "outline"}
			on:click={() => $filter.variable = id}
		>
			{label}
		</Button>
	{/each}
</div>

<style>
	.variables {
		display: flex;
		gap: 0.5em;
	}
</style>
