<script>
	import Variables from "../lib/Variables.svelte";
	import Map from "../lib/map/Map.svelte";
	import PlayButton from "../lib/PlayButton.svelte";
	import Timeline from "../lib/timeline/Timeline.svelte";
	import Details from "../lib/details/Details.svelte";
	import DevOverlay from "../lib/dev/DevOverlay.svelte";
	import Button from "../lib/Button.svelte";
	import Legend from "../lib/map/Legend.svelte";

	export let page;

	let devOverlayOpen = false;
</script>

<main>
	<div class="head">
		<div class="left">
			<Variables />
		</div>
		<div class="right">
			<Button on:click={() => page = "about"} variant="outline">
				About
			</Button>
			{#if import.meta.env.MODE === "development"}
				<Button on:click={() => devOverlayOpen = true} variant="outline">
					🚧
				</Button>
			{/if}
		</div>
	</div>

	<div class="map">
		<div class="extras">
			<Legend />
			<PlayButton />
		</div>
		<Map />
	</div>

	<div class="details">
		<Details />
	</div>

	<div class="timeline">
		<Timeline />
	</div>

	{#if devOverlayOpen}
		<DevOverlay on:close={() => devOverlayOpen = false} />
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-template-areas:
			"head       head"
			"map        details"
			"timeline   timeline";
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto minmax(0, 1fr) max(20vh, 128px);
		column-gap: 4em;
		row-gap: 2em;

		height: 100%;
	}

	main > * {
		display: flex;
		flex-direction: column;
	}

	.head {
		grid-area: head;

		flex-direction: row;
		justify-content: space-between;
	}

	.map {
		grid-area: map;

		flex-direction: row;
	}
	.map .extras {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.details {
		flex-shrink: 1;
		grid-area: details;
	}

	.timeline {
		grid-area: timeline;
	}
</style>
