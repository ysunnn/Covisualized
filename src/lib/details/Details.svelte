<script>
	import { filter } from "../../stores";

	import State from "./State.svelte";
	import Welcome from "./Welcome.svelte";
</script>

<div class="details">
	{#if $filter.state}
		<State />
	{:else}
		<Welcome />
	{/if}
</div>

<style>
	.details {
		max-width: 80ch;
		max-height: 100%;
		overflow: auto;

		border: 6px solid hsl(var(--c-foreground-hsl), 0.15);
		border-radius: 12px;
		padding: 1em;
		background-color: white;
		box-shadow: 0 0 64px 0 rgba(0, 0, 0, 0.1);
	}
</style>
