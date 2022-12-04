<script>
	import {
		line,
		//curveStep,
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

	let extentX = extent(data, (d) => d[xVar]);
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
	//.curve(curveStep);

	// ticks for x axis - first day of each month found in the data
	let xTicks = [];
	data.forEach(d => {
		xTicks.push(d[xVar]);
	});
	let xLabel = (x) => monthNames[x.getMonth()] + ' 20' + x.getYear().toString().substring(x.getYear(), 1);

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
</script>

<svg
	bind:this={el}
	viewBox="0 0 {chartWidth} {chartHeight + 0.5 * paddings.top + 0.5 * paddings.bottom}"
>
	<g transform="translate({paddings.left *0.5}, {0.5 * paddings.top})">
		<!-- line -->
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
</svg>
