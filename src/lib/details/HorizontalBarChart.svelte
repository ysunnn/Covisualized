<script>
	import { scaleBand, scaleLinear } from "d3-scale";
	import { mapRange, getStateNameShort } from "../../util";

	export let data;
	export let min;
	export let max;

	const width = 600;
	const height = 300;

	const margin = { top: 10, right: 20, bottom: 20, left: 110 };
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	$: yScale = scaleBand()
		.domain(data.map((d) => d.key))
		.range([0, innerHeight])
		.padding(0.1);

	$: xScale = scaleLinear()
		.domain([min, max])
		.range([0, innerWidth])
		.nice();
</script>

<svg {width} {height}>
	<g transform={`translate(${margin.left},${margin.top})`}>
		{#each xScale.ticks() as tickValue}
			<g transform={`translate(${xScale(tickValue)},0)`}>
				<line y2={innerHeight} stroke="grey" />
				<text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
					{tickValue}
				</text>
			</g>
		{/each}
		{#each data as d}
			<text
				text-anchor="end"
				x="-4"
				dy=".28em"
				y={yScale(d.key) + yScale.bandwidth() / 2}
			>
				{getStateNameShort(d.key)}
			</text>
			{#if d.value >= 0}
				<rect
					x={xScale(0)}
					y={yScale(d.key)}
					width={xScale(d.value) - xScale(0)}
					height={yScale.bandwidth() * 0.8}
					fill="hsl(214, {mapRange(d.value / max, 0, 1, 25, 100)}%, 50%)"
				/>
			{/if}
			{#if d.value < 0}
				<rect
					x={xScale(d.value)}
					y={yScale(d.key)}
					width={xScale(0) - xScale(d.value)}
					height={yScale.bandwidth() * 0.8}
					fill="hsl(355, {mapRange(d.value / min, 0, 1, 25, 100)}%, 50%)"
				/>
			{/if}
		{/each}
	</g>
</svg>
