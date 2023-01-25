<script>
	import { line } from "d3";
	import { isNullish } from "../../util.js";

	export let data;
	export let xScale;
	export let yScale;
	export let width;
	export let height;
	export let color;

	$: lineGenerator = line()
		.x((d) => xScale(d?.date))
		.y((d) => yScale(d?.value))
		.defined((d) => !isNullish(d?.value));
</script>

<svg
	viewBox="0 0 {width} {height}"
	preserveAspectRatio="none"
	fill="none"
	style:--color="var(--c-{color})"
>
	<path
		vector-effect="non-scaling-stroke"
		d={lineGenerator(data)}
	/>
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: 100%;
	}
	svg path {
		stroke: var(--color);
		stroke-width: 4px;
		stroke-linejoin: round;
		stroke-linecap: round;
		cursor: auto;
	}
</style>
