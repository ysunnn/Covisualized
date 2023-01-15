<script>
	import {
		line,
		curveLinear,
		scaleLinear,
		extent,
		bisector,
		select,
		axisBottom,
		axisLeft,
		scaleUtc,
		zoom,
		pointer, timeFormat, timeParse,
	} from "d3";
	import TooltipPoint from "./TooltipPoint.svelte";
	import Tooltip from "./Tooltip.svelte";
	import { data, filter, statesForVariableAtDate } from "../stores.js";

	let el;
	let dataGermany, dataState;
	let point, selectedPoint, pointState;
	let pinXAxis, pinYAxis, bindLineGermanyZoom, bindLineStateZoom;
	let newScale = null;
	const formatDate = timeFormat("%Y %b");

	//data from store
	$: dataGermany = Object.entries($data).map(([date, states]) => ({
		date: timeParse("%Y-%m")(date),
		value: states["de"][$filter.variable],
	}));

	$: if ($filter.state !== null){
		dataState = Object.entries($data).map(([date, states]) => ({
			date: timeParse("%Y-%m")(date),
			value: states[$filter.state][$filter.variable],
		}));
	}

	let width = 1080;
	const height = 130;
	const margin = { top: 20, bottom: 10, left: 40, right: 10 };

	// scales
	$: xScale = scaleUtc()
		.domain(extent(dataGermany, d => d.date))
		.range([margin.left, width - margin.right]);

	$: yScale = scaleLinear()
		.domain([$statesForVariableAtDate.ranges.value.min, $statesForVariableAtDate.ranges.value.max]).nice()
		.range([height - margin.bottom, margin.top]);

	const chartLine = (data, xScale) => line()
		.curve(curveLinear)
		.x((d) => xScale(d.date))
		.y((d) => yScale(d.value))
		.defined(function (d) { return d.value !== 0; })
		// eslint-disable-next-line no-unexpected-multiline
		(data);

	const xAxis = (g, x) => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(axisBottom(x).ticks(width / 80).tickSizeOuter(0));

	const yAxis = (g, y) => g
		.attr("transform", `translate(${margin.left},0)`)
		.call(axisLeft(y).ticks(null, "s"))
		.call(g => g.select(".domain").remove())
		.call(g => g.select(".tick:last-of-type text").clone()
			.attr("x", 3)
			.attr("text-anchor", "start")
			.attr("font-weight", "bold")
			.text(dataGermany.y))
		.call(g => g.append("text")
			.attr("x", -margin.left)
			.attr("y", 10)
			.attr("fill", "currentColor")
			.attr("text-anchor", "start")
			.text("↑ " + $filter.variable + " (2015 = 1.0)"));

	// draw Axis
	$: if (pinXAxis) {
		select(pinXAxis).call(xAxis, xScale);
	}
	$: if (pinYAxis) {
		select(pinYAxis).call(yAxis, yScale);
	}

	// select point for tooltip
	const bisect = bisector((d) => d.date).center;

	$: point = dataGermany[Object.keys($data).indexOf($filter.date)];
	$: selectedPoint = dataGermany[Object.keys($data).indexOf($filter.date)];
	if ($filter.state){
		pointState = dataState[Object.keys($data).indexOf($filter.date)];
	}

	function handleMousemove(event) {
		const [mx] = pointer(event);

		// returns point to right of our current mouse position
		let i = bisect(dataGermany, xScale.invert(mx));
		if (newScale !== null) {
			i = bisect(dataGermany, newScale.invert(mx));
		}
		if (i < dataGermany.length) {
			point = dataGermany[i];
			if ($filter.state){
				pointState = dataState[i];
			}
		}
	}

	// coords for tooltip
	const tooltipCoords = {};
	tooltipCoords.lineLength = height - margin.bottom;
	// check if scale has changed due to zoom
	$: if (point !== undefined) {
		if (newScale !== null) {
			tooltipCoords.x = newScale(point.date);
			tooltipCoords.selectedX = newScale(selectedPoint.date);
		} else {
			tooltipCoords.x = xScale(point.date);
			tooltipCoords.selectedX = xScale(selectedPoint.date);
		}
		tooltipCoords.y = yScale(point.value);
		tooltipCoords.selectedY = yScale(selectedPoint.value);
		if (pointState !== undefined && $filter.state){
			tooltipCoords.stateY = yScale(pointState.value);
		}
	}

	function handleMouseClick() {
		const formatDateFilter = timeFormat("%Y-%m");
		$filter.date = (formatDateFilter(point.date));
	}

	// zoom
	$: zoomX = zoom()
		.scaleExtent([1, 9])
		.extent([[margin.left, 0], [width - margin.right, height]])
		.translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
		.on("zoom", updateChart);

	// select zoom area
	$: if (el) {
		select(el).call(zoomX).transition().duration(750);
	}

	function updateChart(e) {
		// update scale based on event
		newScale = e.transform.rescaleX(xScale);
		// update X Axis
		select(pinXAxis).call(xAxis, newScale);
		// update Line
		select(bindLineGermanyZoom).attr("d", chartLine(dataGermany, newScale));
		select(bindLineStateZoom).attr("d", chartLine(dataState, newScale));
	}
</script>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
</style>

<div id="area" bind:this={el} bind:clientWidth={width} transform="translate({margin.left}, {margin.top})">
	{#if point !== undefined && pointState !== undefined}
		<Tooltip date={formatDate(point.date)} valueGermany={point.value} valueState={pointState.value} {tooltipCoords} />
	{:else if point !== undefined}
		<Tooltip date={formatDate(point.date)} valueGermany={point.value} valueState={null} {tooltipCoords} />
	{/if}
	<svg on:mousemove={handleMousemove}>
		<!-- clipPath -->
		<defs>
			<clipPath id="clip">
				<rect
					x={margin.left}
					y={margin.top}
					width={width - margin.left - margin.right}
					height={height - margin.top - margin.bottom}
				/>
			</clipPath>
		</defs>

		<g>
			<!-- line Germany -->
			<path
				bind:this={bindLineGermanyZoom}
				id="line"
				d={chartLine(dataGermany, xScale)}
				fill="none"
				stroke="rebeccapurple"
				stroke-width="2"
				clip-path="url(#clip)"
			/>
		</g>

		<g>
			<!-- line state -->
			{#if $filter.state}
				<path
					bind:this={bindLineStateZoom}
					id="line"
					d={chartLine(dataState, xScale)}
					fill="none"
					stroke="RoyalBlue"
					stroke-width="2"
					clip-path="url(#clip)"
				/>
			{/if}
		</g>

		<!-- y axis -->
		<g
			class="yAxis"
			bind:this={pinYAxis}
			transform="translate({margin.left}, 0)"
		/>

		<!-- x axis -->
		<g
			class="xAxis"
			bind:this={pinXAxis}
			transform="translate(0, {height})"
		/>

		<!-- Tooltip line and Point -->
		<g class="tooltipPoint" clip-path="url(#clip)" on:click={handleMouseClick}>
			<TooltipPoint {tooltipCoords} />
		</g>
	</svg>
</div>
