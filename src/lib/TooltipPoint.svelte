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

<style>
	.point {
		fill: #000;
	}
	.tooltip-line line {
		stroke: #666;
	}
</style>
