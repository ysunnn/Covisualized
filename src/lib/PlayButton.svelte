<script>
	import { onMount } from "svelte";
	import { availableDatesForVariable, filter, playback, tutorial } from "../stores";
	import Button from "../lib/Button.svelte";

	export let dummy = null;

	$: icon = outOfBounds ? "refresh" : $playback.play ? "pause" : "play";
	$: index = $availableDatesForVariable.indexOf($filter.date);
	$: outOfBounds = Boolean(index === -1 || !$availableDatesForVariable[index + 1]);

	function reset() {
		$filter.date = $availableDatesForVariable[0];
	}
	function togglePlayback() {
		$playback.play = !$playback.play;
	}

	function onClick() {
		if (outOfBounds) reset();
		else togglePlayback();
	}

	let el;
	onMount(() => {
		if (!dummy) $tutorial.playButtonEl = el;
	});
</script>

<div
	class="play-button"
	class:dummy
	style:--dummy-start-x={dummy && `${dummy?.start[0]}px`}
	style:--dummy-start-y={dummy && `${dummy?.start[1]}px`}
	style:--dummy-end-x={dummy && `${dummy?.end[0]}px`}
	style:--dummy-end-y={dummy && `${dummy?.end[1]}px`}
	bind:this={el}
>
	<Button
		{icon}
		shape="ellipse"
		size="2em"
		on:click={onClick}
	/>
</div>

<style>
.play-button {
	display: flex;
}

.dummy {
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;

	will-change: transform;
	animation: dummy-path 1.5s cubic-bezier(0.5, 0, 0.5, 1) both;
}

@keyframes dummy-path {
	from {
		transform: translate(-50%, -50%) translate(var(--dummy-start-x), var(--dummy-start-y));
	}
	to {
		transform: translate(-50%, -50%) translate(var(--dummy-end-x), var(--dummy-end-y));
	}
}
</style>
