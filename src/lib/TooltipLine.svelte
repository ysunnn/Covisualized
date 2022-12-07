<script>
	export let tooltipCoords;
</script>


<g class="tooltip-line" transform="translate(0, 0)">
	<!-- tooltip line -->
	<line
		y1="0"
		y2={tooltipCoords.lineLength}
		x1={tooltipCoords.x}
		x2={tooltipCoords.x}></line>
</g>

<style>
	.tooltip-line line {
		stroke: #666;
	}
</style>
