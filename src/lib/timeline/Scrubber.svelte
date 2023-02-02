<script>
	import { isNullish } from "../../util";
	import { playback } from "../../stores";
	import barHeadSVG from "../../assets/icons/scrubber.svg?raw";

	/** @type {"bar" | "dot"} */
	export let style = "bar";
	export let x = null;
	export let y = null;
	export let color = "foreground";
	export let visible = true;
	export let moving = false;

	let width = null;
</script>

<div
	bind:clientWidth={width}
	class="scrubber"
	class:moving
	class:visible
	class:playing={$playback.playing}
	style:--x="{x}px"
	style:--x-raw={x}
	style:--y="{y}px"
	style:--color="var(--c-{color})"
	style:--width="{width}px"
	style:--width-raw={width}
	style:--transition-duration="{$playback.playing ? $playback.stepDuration - 30 : 300}ms"
	style:--transition-timing-function={$playback.playing ? "linear" : "ease"}
>
	{#if style === "bar" && !isNullish(x)}
		<div class="bar">
			{@html barHeadSVG}
		</div>
	{:else if style === "dot" && !isNullish(x) && !isNullish(y)}
		<div class="dot" />
	{/if}
</div>

<style>
	.scrubber {
		position: absolute;
		inset: 0;
		pointer-events: none;
		transition: opacity 150ms ease;
	}

	.scrubber:not(.visible) {
		opacity: 0;
	}

	.dot, .bar {
		pointer-events: auto;
		cursor: auto;
	}

	/* BAR Style */
	.bar {
		position: absolute;
		width: 4px;
		top: 0;
		bottom: 0;
		left: 0;
		background-color: var(--color);

		transform: translateX(-50%) translateX(var(--x));
		transition: transform var(--transition-duration) var(--transition-timing-function);
	}
	.scrubber.moving .bar {
		transition: none;
	}

	.bar :global(svg) {
		position: absolute;
		width: 12px;
		height: auto;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	/* DOT Style */
	.dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: var(--color);
		transform: translate(-50%, -50%) translate(var(--x), var(--y));
	}
</style>
