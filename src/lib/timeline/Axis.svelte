<script>
	import {
		axisTop, axisBottom, axisLeft, axisRight,
		select,
	} from "d3";

	export let scale;
	/** @type {"top" | "bottom" | "left" | "right"} */
	export let type = "top";
	export let ticks;
	export let tickformat;
	export let tickpadding = 8;
	export let gridSize = 0;

	let svgEl = null;
	let width, height = null;
	$: if (svgEl) {
		const axis = { top: axisTop, bottom: axisBottom, left: axisLeft, right: axisRight }[type];
		// const vertical = ["top", "bottom"].includes(type);
		const axisGenerator = axis(scale)
			.ticks(ticks)
			.tickFormat(tickformat)
			.tickPadding(tickpadding)
			.tickSize(32);
		if (gridSize) {
			axisGenerator
				.tickPadding(tickpadding)
				.tickSize(gridSize);
		}
		axisGenerator(select(svgEl));
	}
</script>

<div class="axis" class:grid={gridSize} bind:clientWidth={width} bind:clientHeight={height}>
	<svg
		transform="translate({type === "left" ? width : 0} {type === "top" ? height : 0})"
		overflow="visible"
		bind:this={svgEl}
	/>
</div>

<style>
	.axis {
		width: 100%;
		height: 100%;
	}
	.axis > svg {
		display: block;
		width: 100%;
		height: 100%;
		font-family: inherit;
		font-size: inherit;
	}

	.axis :global(.domain) {
		display: none;
	}
	.axis.grid :global(.tick line) {
		color: hsl(var(--c-foreground-hsl), 0.2);
		stroke-dasharray: 2 2;
	}
	.axis:not(.grid) :global(.tick text) {
		transform: translate(0.125em, 18px);
	}
</style>
