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
	import { data, filter, statesForVariableAtDate } from "../../stores.js";
	import { isNullish } from "../../util.js";

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

	$: dataState = Object.entries($data).map(([date, states]) => ({
		date: timeParse("%Y-%m")(date),
		value: states[$filter.state] && states[$filter.state][$filter.variable],
	}));


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
		.x((d) => xScale(d?.date))
		.y((d) => yScale(d?.value))
		.defined((d) => !isNullish(d?.value))
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
			.text(dataGermany.y));

	const label = [
		{ id: "revenue", text: "↑ Revenue (2015 = 1.0)" },
		{ id: "employees", text: "↑ Employees (2015 = 1.0)" },
		{ id: "incidences", text: "↑ Average 7 day incidence" },
	];
	$: yAxisLabel = label.find(l => l.id === $filter.variable).text;

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
	$: pointState = dataState[Object.keys($data).indexOf($filter.date)];

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
	$: if (!isNullish(point)) {
		if (!isNullish(newScale)) {
			tooltipCoords.x = newScale(point.date);
			tooltipCoords.selectedX = newScale(selectedPoint.date);
		} else {
			tooltipCoords.x = xScale(point.date);
			tooltipCoords.selectedX = xScale(selectedPoint.date);
		}
		tooltipCoords.y = yScale(point.value);
		tooltipCoords.selectedY = yScale(selectedPoint.value);
		tooltipCoords.stateY = yScale(pointState.value);
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

<div id="area" bind:this={el} bind:clientWidth={width} transform="translate({margin.left}, {margin.top})">
	{#if !isNullish(point) && !isNullish(pointState)}
		<Tooltip date={formatDate(point.date)} valueGermany={point.value} valueState={pointState.value} {tooltipCoords} />
	{:else if !isNullish(point)}
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
				d={chartLine(dataGermany, xScale)}
				fill="none"
				stroke="var(--c-primary)"
				stroke-width="2"
				clip-path="url(#clip)"
			/>
		</g>

		<g>
			<!-- line state -->
			<path
				bind:this={bindLineStateZoom}
				d={chartLine(dataState, xScale)}
				fill="none"
				stroke="RoyalBlue"
				stroke-width="2"
				clip-path="url(#clip)"
			/>
		</g>

		<!-- y axis -->
		<g
			class="yAxis"
			bind:this={pinYAxis}
			transform="translate({margin.left}, 0)"
		/>

		<text class="yAxisLabel" x={-margin.left + 55} y="10"> {yAxisLabel} </text>

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

<style>
	svg {
		width: 100%;
	}
	.yAxisLabel {
		font-size: 10px;
	}
</style>
