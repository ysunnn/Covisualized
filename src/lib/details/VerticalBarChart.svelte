<script>
	import { scaleLinear, scaleBand } from "d3-scale";
	import { mapRange, formatValue } from "../../util";
	import { filter } from "../../stores";

	export let data;
	export let min;
	export let max;

	const width = 600;
	const height = 300;

	const margin = { top: 15, right: 20, bottom: 10, left: 50 };

	$: xScale = scaleBand()
		.domain(data.map((d) => d.key))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	$: yScale = scaleLinear()
		.domain([min, max])
		.range([height - margin.bottom, margin.top])
		.nice();
</script>

<svg  {width} {height}>
	<g transform="translate(0,{margin.top})">
		{#each yScale.ticks() as tickValue}
			<g transform="translate(0, {yScale(tickValue) - margin.bottom})">
				<line x1="8%" x2="96%" stroke="grey" />
				<text
					x="7%"
					text-anchor="end">
					{formatValue(tickValue, $filter.variable, true)}
				</text>
			</g>
		{/each}
		{#each data as d}
			<text
				text-anchor="start"
				y="0"
				dx=".28em"
				x={xScale(d.key) + 15}
			>
				{(d.key)}
			</text>
			{#if d.value >= 0}
				<rect
					x={xScale(d.key)}
					y={yScale(d.value) - margin.bottom}
					width={xScale.bandwidth() * 0.8}
					height={yScale(0) - yScale(d.value)}
					fill="hsl(214, {mapRange(d.value / max, 0, 1, 25, 100)}%, 50%)"
				/>
			{/if}
			{#if d.value < 0}
				<rect
					x={xScale(d.key)}
					y={yScale(0) - margin.bottom}
					width={xScale.bandwidth() * 0.8}
					height={yScale(d.value) - yScale(0)}
					fill="hsl(355, {mapRange(d.value / min, 0, 1, 25, 100)}%, 50%)"
				/>
			{/if}
		{/each}
	</g>
</svg>

<style>
	text{
		font-size: small;
	}
</style>
