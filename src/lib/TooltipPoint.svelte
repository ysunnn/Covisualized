<script>
	export let tooltipCoords;

	import { filter } from "../stores.js";
</script>

<!-- tooltip line -->
<g class="tooltip-line" transform="translate(0, 0)">
	<line
		y1="0"
		y2={tooltipCoords.lineLength}
		x1={tooltipCoords.x}
		x2={tooltipCoords.x}></line>
</g>

<!-- tooltip line -->
<g class="selected-tooltip-line" transform="translate(0, 0)">
	<line
		y1="0"
		y2={tooltipCoords.lineLength}
		x1={tooltipCoords.selectedX}
		x2={tooltipCoords.selectedX}></line>
</g>

<!-- tooltip point -->
<g>
	{#if (tooltipCoords.y !== 120)}
		<circle class="pointGermany" cx={tooltipCoords.x} cy={tooltipCoords.y} r="4"></circle>
	{/if}
	{#if $filter.state && tooltipCoords.stateY !== 120}
		<circle class="pointState" cx={tooltipCoords.x} cy={tooltipCoords.stateY} r="4"></circle>
	{/if}
</g>

<g>
	<circle class="selectedPoint" cx={tooltipCoords.selectedX} cy={tooltipCoords.selectedY} r="4"></circle>
</g>

<style>
	.pointGermany {
		fill: #663399;
	}
	.pointState {
		fill: #4169E1;
	}
	.point {
		fill: #666;
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
