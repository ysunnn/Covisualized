<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";

	export let values = [];
	$: max = Math.max(...values);
	$: values, update();
	let el;

	function update(initial = false) {
		d3.select(el).selectAll("div")
			.data(values)
			.join(
				(enter) => {
					const selection = enter
						.append("div")
						.style("width", (d) => `${d / max * 100}%`)
						.text((d) => d);

					// Transition only if the element doesn't get created as part of the initial render:
					if (!initial) {
						selection
							.style("opacity", 0)
							.style("transform", "translateX(-200px)")
							.transition()
							.duration(300)
							.style("opacity", 1)
							.style("transform", "none");
					}
					return selection;
				},
				(update) => {
					return update
						.style("width", (d) => `${d / max * 100}%`)
						.text((d) => d);
				},
				(exit) => {
					return exit
						.transition()
						.duration(300)
						.style("opacity", 0)
						.style("transform", "translateX(-200px)")
						.remove();
				},
			);
	}

	onMount(() => update(true));
</script>

<div bind:this={el} class="chart" />

<style>
	.chart :global(div) {
		background-color: crimson;
		text-align: right;
		padding: 2px;
		padding-right: 0.5em;
		margin: 1px 0;
		color: white;

		transition: width 300ms ease;
	}
</style>
