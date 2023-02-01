<script>
	import { scaleLinear, scaleBand } from "d3-scale";
	import { mapRange, formatValue } from "../../util";
	import { filter } from "../../stores";
	import { utcParse, utcFormat } from "d3";

	import Tooltip from "../Tooltip.svelte";
	import TooltipContent from "./TooltipContent.svelte";

	export let data;
	export let min;
	export let max;

	const width = 600;
	const height = 240;

	const margin = { top: 20, right: 20, bottom: 10, left: 50 };

	$: xScale = scaleBand()
		.domain(data.map((d) => d.key))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	$: yScale = scaleLinear()
		.domain([min, max])
		.range([height - margin.bottom, margin.top])
		.nice();

	let hoveringDate = false;
	let tooltipData = null;
	const onDatePointerover = ({ key, value }) => {
		tooltipData = {
			key: utcFormat("%b %Y")(utcParse("%Y-%m")(key)),
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
		<g transform="translate(0, {margin.top})">
			{#each yScale.ticks(5) as tickValue, i}
				<g transform="translate(0, {yScale(tickValue) - margin.bottom})">
					<line x1="8%" x2="100%" class:zero={i === Math.ceil((yScale.ticks(5).length - 1) / 2)} />
					<text
						class="axis-y"
						x="7%"
						text-anchor="end">
						{formatValue(tickValue, $filter.variable, true)}
					</text>
				</g>
			{/each}
			{#each data as d}
				<text
					class="axis-x"
					text-anchor="middle"
					y="0"
					x={xScale(d.key) + 180 / data.length + margin.left / data.length}
				>
					{utcFormat("%b %Y")(utcParse("%Y-%m")(d.key))}
				</text>
				{#if d.value >= 0}
					<rect
						x={xScale(d.key) + margin.left / data.length}
						y={yScale(d.value) - margin.bottom}
						width={xScale.bandwidth() * 0.8}
						height={yScale(0) - yScale(d.value)}
						fill="hsl(var(--c-positive-h), {mapRange(d.value / max, 0, 1, 25, 100)}%, var(--c-positive-l))"
						on:pointerover={() => onDatePointerover(d)}
						on:pointerleave={onDatePointerleave}
					/>
				{/if}
				{#if d.value < 0}
					<rect
						x={xScale(d.key) + margin.left / data.length}
						y={yScale(0) - margin.bottom}
						width={xScale.bandwidth() * 0.8}
						height={yScale(d.value) - yScale(0)}
						fill="hsl(var(--c-covid-h), {mapRange(d.value / min, 0, 1, 25, 100)}%, var(--c-covid-l))"
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
