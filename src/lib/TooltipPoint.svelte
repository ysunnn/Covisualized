<script>
	export let tooltipCoords;
</script>

<!-- tooltip line -->
<g class="tooltip-line" transform="translate(0, 0)">
	<line
		y1="0"
		y2={tooltipCoords.lineLength}
		x1={tooltipCoords.x}
		x2={tooltipCoords.x}></line>
</g>

<!-- tooltip point -->
<g>
	<circle class="point" cx={tooltipCoords.x} cy={tooltipCoords.y} r="4"></circle>
</g>

<g>
	<circle class="selectedPoint" cx={tooltipCoords.selectedX} cy={tooltipCoords.selectedY} r="4"></circle>
</g>

<style>
	.selectedPoint {
		fill: #000;
	}
	.point {
		fill: #666;
	}
	.tooltip-line line {
		stroke: #666;
		stroke-width: 2;
	}
</style>
