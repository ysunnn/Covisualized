<script>
	import { scaleLinear, scaleBand } from "d3-scale";
	import { mapRange } from "../../util";

	export let data;
	export let min;
	export let max;

	const height = 600;
	const width = 600;

	const margin = { top: 15, right: 20, bottom: 0, left: 50 };

	$: console.log(data);
	$: xScale = scaleBand()
		.domain(data.map((d) => d.key))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	$: yScale = scaleLinear()
		.domain([min, max])
		.range([height - margin.bottom, margin.top]);
</script>

<svg  {width} {height}>
	<g transform="translate(0,{margin.top})">
		{#each yScale.ticks() as tickValue}
			<g transform="translate(0, {yScale(tickValue) - margin.bottom})">
				<line x2="100%" stroke="black" />
				<text y="-4">{tickValue} </text>
			</g>
		{/each}
		{#each data as d}
			<g transform="translate({xScale(d.value)},{height})">
				<text
					text-anchor="start"
					y="0"
					dx=".28em"
					x={xScale(d.key) + xScale.bandwidth() / 2}
				>
					{(d.key).toUpperCase()}
				</text>
			</g>
			{#if min > 0}
				<rect
					x={xScale(d.key)}
					y={yScale(d.value)}
					width={xScale.bandwidth() * 0.8}
					height={height - margin.bottom - yScale(d.value)}
					fill="hsl(207, {mapRange(d.value / max, 0, 1, 25, 100)}%, 50%)"
				/>
			{:else}
				{#if d.value >= 0}
					<rect
						x={xScale(d.key)}
						y={yScale(d.value)}
						width={xScale.bandwidth() * 0.8}
						height={yScale(0) - yScale(d.value)}
						fill="hsl(214, {mapRange(d.value / max, 0, 1, 25, 100)}%, 50%)"
					/>
				{/if}
				{#if d.value < 0}
					<rect
						x={xScale(d.key)}
						y={yScale(0)}
						width={xScale.bandwidth() * 0.8}
						height={yScale(d.value) - yScale(0)}
						fill="hsl(355, {mapRange(d.value / min, 0, 1, 25, 100)}%, 50%)"
					/>
				{/if}
			{/if}
		{/each}
	</g>
</svg>
