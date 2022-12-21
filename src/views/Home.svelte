<script>
	import Map from "../lib/Map.svelte";
	import Timeline from "../lib/Timeline.svelte";
	import DevOverlay from "../lib/dev/DevOverlay.svelte";

	let devOverlayOpen = false;
</script>

<main>
	<div class="variables" />
	<div class="map">
		<Map />
	</div>
	<div class="timeline">
		<Timeline />
	</div>
	<div class="details" />

	<button
		class="dev-button"
		on:click={() => devOverlayOpen = !devOverlayOpen}
	>
		{devOverlayOpen ? "❌" : "🚧"}
	</button>
	{#if devOverlayOpen}
		<DevOverlay />
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-template-areas:
			"variables details"
			"map       details"
			"timeline  timeline";
		grid-template-columns: 1fr 1fr;
		gap: 1em;
	}

	main > * {
		display: flex;
		flex-direction: column;
	}

	.map {
		grid-area: map;
	}

	.variables { grid-area: variables; }
	.timeline { grid-area: timeline; }
	.details { grid-area: details; }

	.dev-button {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1050;
		background-color: mistyrose;
	}
</style>
