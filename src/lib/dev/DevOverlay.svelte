<script>
	import { createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";

	import Button from "../Button.svelte";
	import DataRaw from "./DataRaw.svelte";
	import DataDerived from "./DataDerived.svelte";
	import Filters from "./Filters.svelte";

	const dispatch = createEventDispatcher();
</script>

<div class="dev-overlay" transition:fly={{ x: 520 }}>
	<Button on:click={() => dispatch("close")} variant="outline" style="margin-left: auto">
		❌
	</Button>
	<Filters />
	<DataRaw />
	<DataDerived />
</div>

<style>
.dev-overlay {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	width: min(calc(100vw - 2rem), 520px);
	z-index: 1000;

	background-color: lightyellow;
	box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.25);

	padding: 1em;

	display: flex;
	flex-direction: column;
}
</style>
