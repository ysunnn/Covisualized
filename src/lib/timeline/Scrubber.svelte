<script>
	import { isNullish } from "../../util";
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
	style:--x="{x}px"
	style:--x-raw={x}
	style:--y="{y}px"
	style:--color="var(--c-{color})"
	style:--width="{width}px"
	style:--width-raw={width}
>
	{#if style === "bar" && !isNullish(x)}
		<div class="overlay" />
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
		contain: strict;
	}

	.dot, .bar {
		pointer-events: auto;
		cursor: auto;
	}

	/* BAR Style */
	.overlay {
		position: absolute;
		inset: 0;
		background-color: var(--c-background);
		opacity: 0.4;
		transform-origin: left;
		/* We need to animate via transform as this gets laggy otherwise: */
		transform: scaleX(calc(var(--x-raw) / var(--width-raw)));
	}

	.bar {
		position: absolute;
		width: 4px;
		top: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-50%) translateX(var(--x));
		background-color: var(--color);
	}
	.scrubber > * {
		transition: 300ms ease;
		transition-property: opacity, transform;
	}
	.scrubber.moving > * {
		transition-property: opacity;
	}
	.scrubber:not(.visible) > * {
		opacity: 0;
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

		transition: 150ms ease;
		transition-property: opacity /*, transform */;
	}
	.scrubber.moving .dot {
		transition-property: opacity;
	}
	.scrubber:not(.visible) .dot {
		opacity: 0;
	}
</style>
