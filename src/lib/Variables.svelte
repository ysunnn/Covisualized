<script>
	import { filter } from "../stores";

	import Button from "./Button.svelte";

	const variables = [
		{ id: "revenue", label: "Revenue", icon: "currency-eur", color: "primary" },
		{ id: "employees", label: "Employees", icon: "badge-account", color: "primary" },
		{ id: "covid", label: "COVID-19 Cases", icon: "virus", color: "covid" },
	];
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
