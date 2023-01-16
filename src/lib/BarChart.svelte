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
		.domain([Math.min.apply(null, yDomain), Math.max.apply(null, yDomain)])
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
			{#if d.income >= 0}
				<rect
					x={xScale(0)}
					y={yScale(d.gState)}
					width={xScale(d.income) - xScale(0)}
					height={yScale.bandwidth() * 0.8}
					fill="#0062B1"
					fill-opacity={Math.abs(xScale(d.income)) / Math.abs(Math.max.apply(null, yDomain))}
				/>
			{/if}
			{#if d.income < 0}
				<rect
					x={xScale(d.income)}
					y={yScale(d.gState)}
					width={xScale(0) - xScale(d.income)}
					height={yScale.bandwidth() * 0.8}
					fill="rgb(255,0,0)"
					fill-opacity={Math.abs(xScale(0) - xScale(d.income)) / Math.abs(Math.min.apply(null, yDomain))}
				/>
			{/if}
		{/each}
	</g>
</svg>
