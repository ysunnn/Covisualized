<script>
	import { filter, tutorial } from "../../stores";

	import State from "./State.svelte";
	import Tutorial from "./Tutorial.svelte";
	import Welcome from "./Welcome.svelte";
</script>

<div class="details">
	{#if $filter.state}
		<State />
	{:else if $tutorial.step}
		<Tutorial />
	{:else}
		<Welcome />
	{/if}
</div>

<style>
	.details {
		max-width: 48em;
		max-height: 100%;
		overflow: auto;

		border: 6px solid hsl(var(--c-foreground-hsl), 0.15);
		border-radius: 12px;
		padding: 1em;
		background-color: white;
		box-shadow: 0 0 4em 0 rgb(0, 0, 0, 0.08);
	}
</style>
