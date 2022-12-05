<script>
	import {
		line,
		curveStep,
		scaleLinear,
		timeParse,
		extent,
		scaleTime,
	} from "d3";
	import data from '../assets/data.js';

	let el;

	const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const width = 1080;
	const height = 135;
	const margin = {top: 10, bottom: 10, left: 40, right: 10};
	console.log(data);
	data.forEach((d) => {
		d.date = timeParse("%Y%m%d")(d.date);
		console.log(d);
		d.date = new Date(d.date); // x
		console.log(d);
		d.revenue = d["revenue"];
	});

	console.log(data);

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
		.curve(curveStep)

	// ticks for x axis - first day of each month found in the data
	let xTicks = [];
	data.forEach(d => {
		if (d.date.getDate() === 1) {
			xTicks.push(d.date)
		}
	})

	// x axis labels string formatting
	let xLabel = (x) =>
		monthNames[x.getMonth()] + ' 20' + x.getYear().toString().substring(x.getYear(), 1)

	// y ticks count to label by 50000's
	let yTicks = [];
	for (let i = Math.round(extentY[0]); i < Math.round(extentY[1] + 1); i = i + 100000) {
		yTicks.push(Math.floor(i/100000)*100000);
	}

	// d's for axis paths
	let xPath = `M${margin.left + .5},6V0H${width - margin.right + 1}V6`
	let yPath = `M-6,${height + .5}H0.5V0.5H-6`

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

<svg bind:this={el} transform="translate({margin.left}, {margin.top})">
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
					{y}
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
</svg>
