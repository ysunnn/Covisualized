<script>
	import {
		timeFormat,
		line,
		curveLinear,
		scaleLinear,
		extent,
		scaleTime,
		timeMonths,
		bisector,
		format,
		formatLocale,
	} from "d3";
	import data from "../assets/data.js";
	import TooltipPoint from "./TooltipPoint.svelte";
	import TooltipLine from "./TooltipLine.svelte";
	import Tooltip from "./Tooltip.svelte";

	let el;

	const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// format for tooltip
	const localFormat = formatLocale({
		"decimal": ".",
		"thousands": ",",
		"grouping": [3],
		"currency": ["", "€"],
	});
	let euro = localFormat.format("$,.2f");
	let formatTime = timeFormat("%b %d %Y");

	const width = 1080;
	const height = 130;
	const margin = {top: 10, bottom: 10, left: 30, right: 10};

	// scales
	let extentX = extent(data, (d) => d.date);
	let xScale = scaleTime()
		.domain(extentX)
		.range([margin.left, width - margin.right]);

	let extentY = extent(data, (d) => d.revenue);
	let yScale = scaleLinear()
		.domain(extentY)
		.range([height - margin.bottom, margin.top]);

	let path = line()
		.x((d) => xScale(d.date))
		.y((d) => yScale(d.revenue))
		.curve(curveLinear);

	// ticks for x-axis - all the months with date
	let xTicks = timeMonths(data[0].date, data[data.length-1].date);

	// x-axis labels string formatting
	let xLabel = (x) =>
		monthNames[x.getMonth()] + " " + x.getFullYear().toString();

	// y ticks count to label by 50000's
	let yTicks = [];
	for (let i = Math.round(extentY[0]); i < Math.round(extentY[1] + 1); i = i + 100000) {
		yTicks.push(Math.floor(i/100000)*100000);
	}

	// d's for axis paths
	let xPath = `M${margin.left + .5},6V0H${width - margin.right + 1}V6`;
	let yPath = `M-6,${height + .5}H0.5V0.5H-6`;

	// d3's bisector function
	let bisect = bisector((d) => d.date).right;

	let m = { x: 0, y: 0 };
	let point = data[0];

	function handleMousemove(event) {
		m.x = event.offsetX;
		m.y = event.offsetY;

		// returns point to right of our current mouse position
		let i = bisect(data, xScale.invert(m.x));

		if (i < data.length) {
			point = data[i]; // update point
		}
	}

	// coords for tooltip line
	let tooltipLine = {};
	$: tooltipLine.y1 = 0;
	$: tooltipLine.y2 = height - margin.bottom;
	$: tooltipLine.x1 = xScale(point.date);
	$: tooltipLine.x2 = xScale(point.date);
</script>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 11px;
	}
</style>

<div bind:this={el} transform="translate({margin.left}, {margin.top})">
	<Tooltip date={formatTime(point.date)} value={euro(point.revenue)} left={xScale(point.date)} />
	<svg on:mousemove={handleMousemove}>
		<g>
			<!-- line -->
			<path
				d="{path(data)}"
				fill="none"
				stroke="blue"
			/>
		</g>

		<!-- y axis -->
		<g transform="translate({margin.left}, 0)">
			<path stroke="currentColor" d="{yPath}" fill="none" />

			{#each yTicks as y}
				<g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
					<line stroke="currentColor" x2="-5" />
					<text dy="0.32em" fill="currentColor" x="-{margin.left}">
						{format("~s")(y)}
					</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g transform="translate(0, {height})">
			<path stroke="currentColor" d="{xPath}" fill="none" />

			{#each xTicks as x}
				<g class="tick" opacity="1" transform="translate({xScale(x)},0)">
					<line stroke="currentColor" y2="6" />
					<text fill="currentColor" y="9" dy="0.71em" x="-{margin.left}">
						{xLabel(x)}
					</text>
				</g>
			{/each}
		</g>

		<!-- Tooltip -->
		<TooltipLine {tooltipLine} />
		<TooltipPoint x={xScale(point.date)} y={yScale(point.revenue)} />
	</svg>
</div>
