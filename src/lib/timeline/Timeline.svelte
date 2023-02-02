<script>
	import { onMount, onDestroy } from "svelte";
	import {
		utcParse, scaleLinear, scaleUtc, select,
		extent, timeFormat, zoom, pointer, bisector,
	} from "d3";

	import { data, filter, statesForVariableAtDate, playback } from "../../stores.js";
	import { formatValue } from "../../util.js";
	import { registerPlayingBlocker } from "../../playback.js";

	import Graph from "./Graph.svelte";
	import Axis from "./Axis.svelte";
	import Scrubber from "./Scrubber.svelte";
	import ClipIndicators from "./ClipIndicators.svelte";

	import Tooltip from "../Tooltip.svelte";
	import TooltipContent from "./TooltipContent.svelte";

	const graph = { el: null, width: null, height: null };

	$: graphData = (() => {
		const timePoints = Object.entries($data).map(([date, states]) => ({
			dateString: date,
			date: utcParse("%Y-%m")(date),
			states,
		}));
		return Object.fromEntries(["de", $filter.state]
			.filter(stateID => stateID)
			.map(stateID => [
				(stateID === "de" ? "de" : "state"),
				timePoints.map(({ dateString, date, states }) => ({
					dateString,
					date,
					value: states?.[stateID]?.[$filter.variable],
				})),
			]));
	})();

	$: yearsCount = new Set(graphData.de.map(({ date: date }) => date.getFullYear())).size;

	$: color = ($filter.variable === "incidences") ? "covid" : "primary";

	$: xScale = (() => {
		const scale = scaleUtc()
			.domain(extent(graphData.de, d => d.date))
			.range([0, graph.width]);
		return zoomTransform ? zoomTransform.rescaleX(scale) : scale;
	})();
	$: valueRange = $statesForVariableAtDate.ranges.value;
	$: yScale = scaleLinear()
		.domain([valueRange.min, valueRange.max])
		.range([graph.height, 0])
		.nice();

	let hovering = false;
	let dragging = false;
	let moving = false;
	let zoomed = false;
	let programmaticZoom = false;
	const zoomBehavior = zoom()
		.scaleExtent([1, 5])
		.clickDistance(2)
		.on("start", ({ sourceEvent }) => {
			if (!sourceEvent) {
				programmaticZoom = true;
			}
		})
		.on("zoom", ({ transform, sourceEvent }) => {
			dragging = ["pointermove", "mousemove", "touchmove"].includes(sourceEvent?.type);
			zoomed = (transform.k !== 1);
			blockPlayback(zoomed);
			if (zoomed) moving = true;
			zoomTransform = transform;
		})
		.on("end", ({ sourceEvent }) => {
			if (!sourceEvent) { // was programmatic zoom
				programmaticZoom = false;
				blockPlayback(false);
			}
			dragging = false;
			moving = false;
		}).filter(event => {
			return (event.type !== "wheel" || !event.ctrlKey) && !event.button && !programmaticZoom && !$playback.play;
		});

	$: zoomBehavior
		.extent([[0, 0], [graph.width, graph.height]])
		.translateExtent([[0, -Infinity], [graph.width, Infinity]]);

	let zoomTransform = null;
	// 1 pixel extra to combat rounding errors:
	$: contentClipped = {
		left: zoomTransform && zoomTransform.x < -1,
		right: zoomTransform && zoomTransform.x > graph.width - (graph.width * zoomTransform.k) + 1,
	};

	$: if ($playback.play && zoomTransform && zoomTransform.k !== 1 && !programmaticZoom) {
		zoomBehavior.scaleTo(select(graph.el).transition().duration(600), 1);
	}

	onMount(() => {
		select(graph.el)
			.call(zoomBehavior)
			.on("dblclick.zoom", null);
	});
	onDestroy(() => {
		zoomBehavior.on("zoom", null);
	});

	let hoverPos = [null, { de: null, state: null }];
	let hoverIndex = -1;
	$: selectedX = xScale(graphData.de.find(({ dateString }) => $filter.date === dateString)?.date);
	const pointerEventToDataIndex = (event) => {
		const [pointerX] = pointer(event);
		const date = xScale.invert(pointerX);
		return bisector(d => d.date).center(graphData.de, date);
	};
	const onPointermove = (event) => {
		if (!event.isPrimary) return;
		hoverIndex = pointerEventToDataIndex(event);
		hoverPos = [
			xScale(graphData.de[hoverIndex]?.date),
			{
				de: yScale(graphData.de[hoverIndex]?.value),
				state: graphData.state ? yScale(graphData.state[hoverIndex]?.value) : null,
			},
		];
	};
	const onPointerover = () => hovering = true;
	const onPointerleave = () => hovering = false;
	const onClick = (event) => {
		const index = pointerEventToDataIndex(event);
		$filter.date = graphData.de[index]?.dateString;
		$playback.play = false;
	};

	const blockPlayback = registerPlayingBlocker();

	$: tooltipData = Object.entries(graphData)
		.map(([type, timePoints]) => [type, timePoints[hoverIndex]]);
</script>

<div
	class="timeline"
	class:dragging
	class:moving
	class:zoomed
>
	<div class="axis-year">
		<Axis
			scale={xScale}
			type="top"
			ticks={yearsCount / (zoomTransform?.k ?? 1)}
			tickformat={timeFormat("%Y")}
			tickpadding={4}
		/>
	</div>

	<div class="axis-month">
		<Axis
			scale={xScale}
			type="bottom"
			ticks={graph.width / 140}
			tickformat={timeFormat("%B")}
			tickpadding={16}
			gridSize={graph.height}
		/>
	</div>

	<div class="axis-variable">
		<Axis
			scale={yScale}
			type="left"
			ticks={5}
			tickformat={(value) => formatValue(value, $filter.variable, true)}
			gridSize={graph.width}
		/>
	</div>

	<div
		class="graph"
		bind:clientWidth={graph.width}
		bind:clientHeight={graph.height}
		bind:this={graph.el}
		on:pointermove={onPointermove}
		on:pointerover={onPointerover}
		on:pointerleave={onPointerleave}
		on:click={onClick}
	>
		<Tooltip
			placement="top-start"
			offset={[0, 16]}
			followCursor
			hideOnClick={false}
			arrow={false}
			show={hovering && !moving}
		>
			<TooltipContent
				slot="content"
				data={tooltipData}
				colors={{ de: color, state: "state" }}
			/>
			<Graph
				data={graphData.de}
				{xScale} {yScale}
				width={graph.width}
				height={graph.height}
				{color}
			/>
			{#if graphData.state}
				<Graph
					data={graphData.state}
					{xScale} {yScale}
					width={graph.width}
					height={graph.height}
					color="state"
				/>
			{/if}
			<Scrubber
				x={selectedX}
				style="bar"
				{moving}
			/>
			<Scrubber
				x={hoverPos[0]}
				y={hoverPos[1].de}
				style="dot"
				{color}
				visible={hovering && !moving}
				{moving}
			/>
			{#if graphData.state}
				<Scrubber
					x={hoverPos[0]}
					y={hoverPos[1].state}
					style="dot"
					color="state"
					visible={hovering && !moving}
					{moving}
				/>
			{/if}
			<ClipIndicators left={contentClipped.left} right={contentClipped.right} />
		</Tooltip>
	</div>
</div>

<style>
	.timeline {
		height: 100%;
		display: grid;
		grid-template-areas:
			".             axis-year"
			"axis-variable graph"
			".             axis-month";
		grid-template-columns: 6ch 1fr;
		grid-template-rows: calc(4px + 2em) minmax(0, 1fr) calc(16px + 1em);

		overflow: hidden;
	}
	.timeline.zoomed .graph {
		cursor: grab;
	}
	.timeline.dragging.moving .graph {
		cursor: grabbing;
	}
	.timeline.dragging:not(.moving) .graph {
		cursor: not-allowed;
	}

	.axis-year { grid-area: axis-year; }
	.axis-month { grid-area: graph / graph / axis-month / axis-month; }
	.axis-variable { grid-area: axis-variable / axis-variable / graph / graph; }
	.graph { grid-area: graph; }

	.graph {
		position: relative;
	}

	.axis-year {
		font-weight: bold;
		font-size: 1.5em;
	}
	.axis-year :global(svg) {
		dominant-baseline: middle;
		text-anchor: start;
	}

	.axis-month :global(.tick line) {
		display: none;
	}
	/* .axis-variable :global(.tick:first-of-type text) {
		transform: translateY(-0.5em);
	} */
	/* .axis-variable :global(.tick:last-of-type text) {
		transform: translateY(0.5em);
	} */

	.graph {
		position: relative;
	}
</style>
