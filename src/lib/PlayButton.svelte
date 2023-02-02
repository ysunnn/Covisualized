<script>
	import { availableDatesForVariable, filter, playback } from "../stores";
	import Button from "../lib/Button.svelte";

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
</script>

<div class="play-button">
	<Button
		{icon}
		shape="ellipse"
		size="2em"
		on:click={onClick}
	/>
</div>

<style>
	.play-button {
		margin-bottom: -1em;
	}
</style>
