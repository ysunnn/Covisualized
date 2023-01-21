<script>
	import { filter } from "../../stores.js";

	export let tooltipCoords;
</script>

<!-- tooltip line -->
<g class="tooltip-line" transform="translate(0, 0)">
	<line
		y1="0"
		y2={tooltipCoords.lineLength}
		x1={tooltipCoords.x}
		x2={tooltipCoords.x} />
</g>

<!-- tooltip line -->
<g class="selected-tooltip-line" transform="translate(0, 0)">
	<line
		y1="0"
		y2={tooltipCoords.lineLength}
		x1={tooltipCoords.selectedX}
		x2={tooltipCoords.selectedX} />
</g>

<!-- tooltip point -->
<g>
	{#if (tooltipCoords.y !== 120)}
		<circle class="pointGermany" cx={tooltipCoords.x} cy={tooltipCoords.y} r="4" />
	{/if}
	{#if $filter.state && tooltipCoords.stateY !== 120}
		<circle class="pointState" cx={tooltipCoords.x} cy={tooltipCoords.stateY} r="4" />
	{/if}
</g>

<!-- tooltip point -->
<g>
	<circle class="pointGermany" cx={tooltipCoords.x} cy={tooltipCoords.y} r="4" />
</g>

<style>
	.pointGermany {
		fill: var(--c-primary);
	}
	.pointState {
		fill: #4169E1;
	}
	.pointState {
		fill: #4169E1;
	}
	.tooltip-line line {
		stroke: #666;
		stroke-width: 2;
	}
	.selected-tooltip-line line {
		stroke: #000;
		stroke-width: 2;
	}
</style>
