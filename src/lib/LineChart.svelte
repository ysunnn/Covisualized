<script>
	import {
		line,
		scaleLinear,
		timeParse,
		extent,
		scaleTime,
	} from "d3";
	export let chartWidth;
	export let chartHeight;
	export let data;
	export let xVar;
	export let yVar;

	let el;
	const idContainer = "svg-container-" + Math.random() * 1000000;
	let mousePosition = { x: null, y: null };
	let mouseChanged = false;

	data.forEach((d) => {
		d[xVar] = timeParse("%Y-%m-%d")(d[xVar]);
		d.date = d[xVar];
		console.log(d);
	});


	const paddings = { top: 50, bottom: 50, left: 50, right: 50 };
	const ONE_K = 1000;
	const monthNames = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
	];

	let extentX = extent(data, (d) => d[xVar].getTime());
	let xScale = scaleTime()
		.domain(extentX)
		.range([paddings.left, chartWidth - 2 * paddings.right]);

	let extentY = extent(data, (d) => d[yVar]);
	let yScale = scaleLinear()
		.domain(extentY)
		.range([chartHeight - paddings.bottom, paddings.top]);
	//		.nice(10);

	let path = line()
		.x((d) => xScale(d[xVar]))
		.y((d) => yScale(d[yVar]));

	// ticks for x axis - first day of each month found in the data
	let xTicks = [];
	data.forEach(d => {
		xTicks.push(d[xVar]);
	});
	let xLabel = (x) => monthNames[x.getMonth()] + " 20" + x.getYear().toString().substring(x.getYear(), 1);

	// y ticks count to label by 5's
	let yTicks = [];
	let yTickInterval = 10000;
	for (let i = Math.round(extentY[0]); i < Math.round(extentY[1] + 1); i=i+yTickInterval) {
		yTicks.push(Math.floor(i/yTickInterval)*yTickInterval);
	}
	let yLabel = (y) => Math.floor(y/ONE_K) + "K";

	// d's for axis paths
	let xPath = `M${paddings.left + .5},6V0H${chartWidth - 2 * paddings.right + 1}V6`;
	let yPath = `M-6,${chartHeight + .5}H0.5V0.5H-6`;
	console.log(xPath);
	console.log(yPath);

	function followMouse(event) {
		const svg = document.getElementById(idContainer);
		if (svg === null) return;
		let pt = svg.createSVGPoint();
		pt.x = event.clientX - paddings.left;
		pt.y = event.clientY - paddings.top;
		let cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
		console.log("svg transform: (" + cursorpt.x + ", " + cursorpt.y + ")");
		mousePosition =
			cursorpt.x > 0 &&
				cursorpt.x < chartWidth - paddings.right - paddings.left * 2 &&
				cursorpt.y > paddings.top &&
				cursorpt.y < chartHeight - paddings.bottom
				? { x: cursorpt.x, y: cursorpt.y }
				: { x: null, y: null };
		console.log(mousePosition);
		mouseChanged = true;
	}
	function removePointer() {
		mousePosition = { x: null, y: null };
	}
	function computeSelectedXValue(value) {
		//console.log("compute x for: " + value);
		//console.log(data.map((d) => xScale(d[xVar])));
		let result = undefined;
		if (value !== undefined) {
			let filtered = data.filter((d) => xScale(d[xVar]) >= value);
			if (filtered.length === 0) {
				result = data.slice(-1)[xVar];
			} else {
				result = filtered.sort()[0][xVar];
			}
		}
		if (result === undefined) {
			console.log("undefined result!");
		}
		return result;
	}

</script>

<svg
	bind:this={el}
	on:mousemove={followMouse}
	on:mouseleave={removePointer}
	viewBox="0 0 {chartWidth} {chartHeight + 0.5 * paddings.top + 0.5 * paddings.bottom}"
	id={idContainer}
>
	<g transform="translate({paddings.left *0.5}, {0.5 * paddings.top})">
		<!-- curve -->
		<path
			d="{path(data)}"
			fill="none"
			stroke="blue"
		/>
	</g>
	<!-- y axis -->
	<g transform="translate({paddings.left *1.5}, {0.5 * paddings.top})">
		<path stroke="currentColor" d="{yPath}" fill="none" />

		{#each yTicks as y}
			<g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
				<line stroke="currentColor" x2="-5" />
				<text dy="0.32em" fill="currentColor" x="-{paddings.left}">
					{yLabel(y)}
				</text>
			</g>
		{/each}
		<text dy="0.32em" fill="currentColor" x="-{paddings.left}">
			{yVar}
		</text>
	</g>
	<!-- x axis -->
	<g transform="translate({paddings.left *0.5}, {chartHeight + 0.5 * paddings.top})">
		<path stroke="currentColor" d="{xPath}" fill="none" />

		{#each xTicks as x}
			<g class="tick" opacity="1" transform="translate({xScale(x)},0)">
				<line stroke="currentColor" y2="6" />
				<text fill="currentColor" y="9" dy="0.71em" x="-{paddings.left}">
					{xLabel(x)}
				</text>
			</g>
		{/each}
	</g>

	<!-- tooltip (vertical, movable bar) -->
	{#if mousePosition.x !== null && mouseChanged}
		<g
			transform="translate({xScale(computeSelectedXValue(mousePosition.x)) + paddings.left * 0.5} {0.5 * paddings.top})"
		>
			<line
				x1="0"
				x2="0"
				y1={0.5 * paddings.top}
				y2={chartHeight + 0.5 * paddings.top}
				stroke="black"
				stroke-width="5"
			/>
			<circle
				cx={0}
				cy={yScale(
					data.find(
						(d) => d[xVar] === computeSelectedXValue(mousePosition.x),
					)[yVar],
				)}
				r="7"
				fill={"blue"}
			/>
		</g>
	{/if}
</svg>
