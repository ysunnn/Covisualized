<script>
	import { fly } from "svelte/transition";

	import RawData from "./RawData.svelte";
</script>

<div class="dev-overlay" transition:fly={{ x: 520 }}>
	<RawData />
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
