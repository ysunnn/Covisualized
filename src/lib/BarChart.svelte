<script>
	import { scaleBand, scaleLinear } from "d3-scale";
	import { mapRange } from "../util";

	export let data;

	const width = 600;
	const height = 400;

	const margin = { top: 10, right: 20, bottom: 20, left: 30 };
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	$: xDomain = data.map((d) => d.key);
	$: yDomain = data.map((d) => d.value);
	$: min = Math.min(...data.map(({ value }) => value));
	$: max = Math.max(...data.map(({ value }) => value));


	$: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
	$: xScale = scaleLinear()
		.domain([Math.min.apply(null, yDomain) - 1.99, Math.max.apply(null, yDomain) + 1.99])
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
				y={yScale(d.key) + yScale.bandwidth() / 2}
			>
				{d.key}
			</text>
			{#if min > 0}
				<rect
					x="0"
					y={yScale(d.key)}
					width={xScale(d.value)}
					height={yScale.bandwidth() * 0.8}
					fill="hsl(207, {mapRange(d.value / max, 0, 1, 25, 100)}%, 50%)"
				/>
			{:else}
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
			{/if}
		{/each}
	</g>
</svg>
