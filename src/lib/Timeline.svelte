<script>
	import {
		timeFormat,
		line,
		curveLinear,
		scaleLinear,
		extent,
		bisector,
		formatLocale,
		select,
		axisBottom,
		axisLeft,
		scaleUtc,
	} from "d3";
	import data from "../assets/data.js";
	import TooltipPoint from "./TooltipPoint.svelte";
	import Tooltip from "./Tooltip.svelte";

	let el;
	let pinXAxis, pinYAxis;

	// format for tooltip
	const localFormat = formatLocale({
		"decimal": ".",
		"thousands": ",",
		"grouping": [3],
		"currency": ["", "€"],
	});
	const euro = localFormat.format("$,.2f");
	const formatTime = timeFormat("%b %d %Y");

	const width = 1080;
	const height = 130;
	const margin = { top: 10, bottom: 10, left: 40, right: 10 };

	// scales
	const xScale = scaleUtc()
		.domain(extent(data, d => d.date))
		.range([margin.left, width - margin.right]);

	const extentY = extent(data, (d) => d.revenue);
	const yScale = scaleLinear()
		.domain(extentY).nice()
		.range([height - margin.bottom, margin.top]);

	const chartLine = (data, xScale) => line()
		.curve(curveLinear)
		.x((d) => xScale(d.date))
		.y((d) => yScale(d.revenue))
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
			.text(data.y));

	$: if (pinXAxis) {
		select(pinXAxis).call(xAxis, xScale);
	}
	$: if (pinYAxis) {
		select(pinYAxis).call(yAxis, yScale);
	}

	// d3's bisector function
	const bisect = bisector((d) => d.date).right;

	const m = { x: 0, y: 0 };
	let point = data[0];

	function handleMousemove(event) {
		m.x = event.offsetX;
		m.y = event.offsetY;

		// returns point to right of our current mouse position
		const i = bisect(data, xScale.invert(m.x));

		if (i < data.length) {
			point = data[i]; // update point
		}
	}

	// coords for tooltip
	const tooltipCoords = {};
	tooltipCoords.lineLength = height - margin.bottom;
	$: tooltipCoords.x = xScale(point.date);
	$: tooltipCoords.y = yScale(point.revenue);
</script>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
</style>

<div id="area" bind:this={el} transform="translate({margin.left}, {margin.top})">
	<Tooltip date={formatTime(point.date)} value={euro(point.revenue)} {tooltipCoords} />
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
			<!-- line -->
			<path
				id="line"
				d={chartLine(data, xScale)}
				fill="none"
				stroke="blue"
				clip-path="url(#clip)"
			/>
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
		<g class="tooltipPoint" clip-path="url(#clip)">
			<TooltipPoint {tooltipCoords} />
		</g>
	</svg>
</div>
