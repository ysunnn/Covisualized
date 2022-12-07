<script>
	export let tooltipCoords;
</script>

<g>
	<circle class="point" cx={tooltipCoords.x} cy={tooltipCoords.y} r="4"></circle>
</g>

<style>
	.point {
		fill: #000;
	}
</style>
