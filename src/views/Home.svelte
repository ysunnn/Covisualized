<script>
	import Variables from "../lib/Variables.svelte";
	import Map from "../lib/map/Map.svelte";
	import PlayButton from "../lib/PlayButton.svelte";
	import Timeline from "../lib/timeline/Timeline.svelte";
	import Details from "../lib/details/Details.svelte";
	import DevOverlay from "../lib/dev/DevOverlay.svelte";
	import Button from "../lib/Button.svelte";
	import Legend from "../lib/map/Legend.svelte";

	let devOverlayOpen = false;
</script>

<main>
	<div class="variables">
		<Variables />
	</div>
	<div class="map">
		<Legend />
		<Map />
	</div>
	<div class="playbutton">
		<PlayButton />
	</div>
	<div class="timeline">
		<Timeline />
	</div>
	<div class="details">
		<Details />
	</div>
	<div class="dev-button">
		<Button on:click={() => devOverlayOpen = !devOverlayOpen} variant="outline">
			{devOverlayOpen ? "❌" : "🚧"}
		</Button>
	</div>
	{#if devOverlayOpen}
		<DevOverlay />
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-template-areas:
			"variables  variables"
			"map        details"
			"playbutton details"
			"timeline   timeline";
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto minmax(0, 1fr) auto 20vh;
		gap: 1em;

		height: 100%;
	}

	main > * {
		display: flex;
		flex-direction: column;
	}

	.map {
		grid-area: map;
		position: relative;
		justify-content: center;
	}

	.variables {
		grid-area: variables;
	}

	.timeline {
		grid-area: timeline;
	}

	.details {
		grid-area: details;
	}

	.playbutton {
		align-items: flex-start;
	}

	.dev-button {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 1050;
	}
</style>
