<script>
	export let tooltipLine;
</script>


<g class="tooltip-line" transform="translate(0, 0)">
	<!-- tooltip line -->
	<line
		y1={tooltipLine.y1}
		y2={tooltipLine.y2}
		x1={tooltipLine.x1}
		x2={tooltipLine.x2}></line>
</g>

<style>
	.tooltip-line line {
		stroke: #666;
	}
</style>
