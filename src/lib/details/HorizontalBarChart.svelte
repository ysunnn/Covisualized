<script>
	import { scaleBand, scaleLinear } from "d3-scale";
	import { mapRange, getStateName, formatValue } from "../../util";
	import { filter } from "../../stores";

	import Tooltip from "../Tooltip.svelte";
	import TooltipContent from "./TooltipContent.svelte";

	export let data;
	export let min;
	export let max;

	const width = 600;
	const height = 240;

	const margin = { top: 10, right: 20, bottom: 20, left: 76 };
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

	let hoveringDate = false;
	let tooltipData = null;
	const onDatePointerover = ({ key, value }) => {
		tooltipData = {
			key: getStateName(key),
			value: formatValue(value, $filter.variable),
		};
		hoveringDate = true;
	};
	const onDatePointerleave = () => {
		if (hoveringDate) hoveringDate = false;
	};
</script>

<Tooltip
	placement="bottom-start"
	offset={[0, 32]}
	followCursor
	arrow={false}
	hideOnClick={false}
	show={hoveringDate}
>
	<TooltipContent data={tooltipData} slot="content" />
	<svg viewBox="0 0 {width} {height}">
		<g transform="translate({margin.left}, {margin.top})">
			{#each xScale.ticks() as tickValue, i}
				<g transform={`translate(${xScale(tickValue)}, 0)`}>
					<line y2={innerHeight} class:zero={i === Math.ceil((xScale.ticks().length - 1) / 2)} />
					<text class="axis-x" text-anchor="middle" dy="12" y={innerHeight + 3}>
						{formatValue(tickValue, $filter.variable, true)}
					</text>
				</g>
			{/each}
			{#each data as d}
				<text
					class="axis-y"
					text-anchor="end"
					x="-6"
					dy=".28em"
					y={yScale(d.key) + yScale.bandwidth() / 2}
				>
					{getStateName(d.key, true)}
				</text>
				{#if d.value >= 0}
					<rect
						x={xScale(0)}
						y={yScale(d.key)}
						width={xScale(d.value) - xScale(0)}
						height={yScale.bandwidth() * 0.9}
						fill="hsl(var(--c-positive-h), {mapRange(d.value / max, 0, 1, 25, 90)}%, var(--c-positive-l))"
						on:pointerover={() => onDatePointerover(d)}
						on:pointerleave={onDatePointerleave}
					/>
				{/if}
				{#if d.value < 0}
					<rect
						x={xScale(d.value)}
						y={yScale(d.key)}
						width={xScale(0) - xScale(d.value)}
						height={yScale.bandwidth() * 0.9}
						fill="hsl(var(--c-covid-h), {mapRange(d.value / min, 0, 1, 25, 90)}%, var(--c-covid-l))"
						on:pointerover={() => onDatePointerover(d)}
						on:pointerleave={onDatePointerleave}
					/>
				{/if}
			{/each}
		</g>
	</svg>
</Tooltip>

<style>
	.axis-y {
		font-size: 12px;
	}
	.axis-x {
		font-size: 11px;
	}

	line {
		stroke: hsl(var(--c-foreground-hsl), 0.25);
		stroke-width: 0.75;
		stroke-dasharray: 2 2;
	}
	line.zero {
		stroke-dasharray: none;
		stroke: var(--c-foreground);
	}
</style>
