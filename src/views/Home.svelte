<script>
	import { tutorial, filter } from "../stores";

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

	// eslint-disable-next-line svelte/no-reactive-functions
	$: tutorialSteps = (min, max) => {
		return $tutorial.step > 0 && $tutorial.step >= min && $tutorial.step <= max;
	};

	const onTutorialRepeat = () => {
		$filter.state = "";
		$tutorial.step = 1;
	};
</script>

<main>
	<div class="head tutorial-transition" class:tutorial-deactivate={tutorialSteps(1, 4)}>
		<div class="left">
			<Variables />
		</div>
		<div class="right">
			{#if !$tutorial.step}
				<Button icon="refresh" size="0.875em" variant="outline" on:click={onTutorialRepeat}>
					Repeat Tutorial
				</Button>
			{/if}
			<Button variant="outline" on:click={() => page = "about"}>
				About
			</Button>
			{#if import.meta.env.MODE === "development"}
				<Button on:click={() => devOverlayOpen = true} variant="outline">
					🚧
				</Button>
			{/if}
		</div>
	</div>

	<div
		class="map tutorial-transition"
		class:tutorial-deactivate={tutorialSteps(1, 2)}
		class:tutorial-block={tutorialSteps(1, 4)}
	>
		<div class="extras">
			<Legend />
			<div
				class="play-button"
				class:tutorial-hide={tutorialSteps(1, 2)}
				class:tutorial-block={tutorialSteps(1, 4)}
			>
				<PlayButton />
			</div>
		</div>
		<Map />
	</div>

	<div class="details">
		<Details />
	</div>

	<div
		class="timeline tutorial-transition"
		class:tutorial-deactivate={tutorialSteps(1, 2)}
		class:tutorial-block={tutorialSteps(1, 4)}
	>
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
	.head .left,
	.head .right {
		display: flex;
		gap: 0.5em;
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

	.play-button {
		margin-bottom: -1em;
	}

	.tutorial-block {
		cursor: not-allowed;
	}
	.tutorial-block :global(> *) {
		pointer-events: none;
	}
	.tutorial-deactivate {
		pointer-events: none;
		opacity: 0.5;
		filter: grayscale(1);
	}
	.tutorial-hide {
		opacity: 0;
	}
	.tutorial-transition {
		transition: ease 1s;
		transition-property: opacity, filter;
	}
</style>
