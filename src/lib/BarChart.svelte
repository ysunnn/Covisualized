<script>
	import { scaleBand, scaleLinear } from "d3-scale";

	export let data;

	const width = 800;
	const height = 400;

	const margin = { top: 10, right: 20, bottom: 20, left: 180 };
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	$: xDomain = data.map((d) => d.gState);
	$: yDomain = data.map((d) => +d.income);

	$: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
	$: xScale = scaleLinear()
		.domain([0, Math.max.apply(null, yDomain)])
		.range([0, innerWidth]);
</script>

<svg {width} {height}>
	<g transform={`translate(${margin.left},${margin.top})`}>
		{#each xScale.ticks() as tickValue}
			<g transform={`translate(${xScale(tickValue)},0)`}>
				<line y2={innerHeight} stroke="black" />
				<text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
					{tickValue}
				</text>
			</g>
		{/each}
		{#each data as d}
			<text
				text-anchor="end"
				x="-8"
				dy=".28em"
				y={yScale(d.gState) + yScale.bandwidth() / 2}
			>
				{d.gState}
			</text>
			<rect
				x="0"
				y={yScale(d.gState)}
				width={xScale(d.income)}
				height={yScale.bandwidth() * 0.8}
			/>
		{/each}
	</g>
</svg>
