<script>
	import { labelTitle, mapRange, round } from "../../util.js";
	import { filter, statesForVariableAtDate } from "../../stores.js";
	import { format, precisionFixed } from "d3";
	import { getValueColorCSS } from "./Map.svelte";

	const SECTIONS = 5;

	function f (v) {
		if ($filter.variable === "incidences") {
			if (v > 1) {
				const formatSI = format(".2s");
				return formatSI(v);
			}
			return v;
		} else {
			const p = Math.max(0, precisionFixed(0.05) - 2);
			const formatPercent = format("." + p + "%");
			return formatPercent(v);
		}
	}

	$: ({ variable } = $filter);
	$: ({ ranges: { value: { min, max } } } = $statesForVariableAtDate);
	$: indexRange = $statesForVariableAtDate.ranges.regulationsIndex;
	$: yAxisLabelTitle = labelTitle.find(l => l.id === $filter.variable).title;
	$: yAxisLabelNote = labelTitle.find(l => l.id === $filter.variable).note;
</script>

<div class="legendVariable">
	<div class="title">
		<span class="titleText"> {yAxisLabelTitle} </span>
		<br />
		<span class="titleNote">{yAxisLabelNote} </span>
		<br />
		<br />
		<span class="squareNoData" /> No data
	</div>

	<div
		class="scale"
		style:--min={getValueColorCSS(1.0, variable)}
		style:--mid={getValueColorCSS(0.5, variable)}
		style:--max={getValueColorCSS(0.0, variable)}
	/>

	<div class="labels">
		<span>
			{f(round(max, 1))}
		</span>
		<span>
			{f(round(mapRange(0.75, 0.0, 1.0, min, max), 1))}
		</span>
		<span>
			{f(round(mapRange(0.5, 0.0, 1.0, min, max), 1))}
		</span>
		<span>
			{f(round(mapRange(0.25, 0.0, 1.0, min, max), 1))}
		</span>
		<span>
			{f(round(min, 1))}
		</span>
	</div>
</div>

<div class="legendRegulation">
	<div class="title">
		<span class="titleText"> COVID-19 Regulation index </span> <span class="squareRegulation" />
		<br />
		<span class="titleNote"> Coded index for corona regulations and their severity </span>
	</div>
	<div class="regulations-bar">
		<div class="border" />
		{#each { length: SECTIONS - 1 } as _, i}
			<div class="tick" style:--tick-fraction={(i + 1) / SECTIONS} />
		{/each}
	</div>
	<div class="labels">
		<span>
			{round(indexRange.max, 1)}
		</span>
		<span>
			{round(mapRange(0.8, 0.0, 1.0, indexRange.min, indexRange.max), 1)}
		</span>
		<span>
			{round(mapRange(0.6, 0.0, 1.0, indexRange.min, indexRange.max), 1)}
		</span>
		<span>
			{round(mapRange(0.4, 0.0, 1.0, indexRange.min, indexRange.max), 1)}
		</span>
		<span>
			{round(mapRange(0.2, 0.0, 1.0, indexRange.min, indexRange.max), 1)}
		</span>
		<span>
			{round(indexRange.min, 1)}
		</span>
	</div>
</div>

<style>
	.title {
		width: 7em;
		margin-right: 0.3em;
	}

	.titleText{
		font-weight: bold;
	}

	.titleNote {
		font-size: small;
	}

	.legendVariable {
		height: 20%;
		display: flex;
		margin: 2.5em;
	}

	.legendRegulation{
		height: 20%;
		display: flex;
		margin: 2.5em;
	}

	.scale {
		width: 1em;
		height: 100%;
		background-image: linear-gradient(to bottom, var(--min), var(--mid), var(--max));
	}

	.labels {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.squareNoData {
		display: inline-block;
		height: 1em;
		width: 1em;
		background-image: linear-gradient(135deg,
		white 0%,
		white 25%,
		#f2f2f2 25%,
		#f2f2f2  50%,
		white  50%,
		white  75%,
		#f2f2f2  75%,
		#f2f2f2  100%);
		border: 1px solid white;
	}

	.squareRegulation{
		display: inline-block;
		height: 0.5em;
		width: 1em;
		background-color: hsl(var(--c-covid-h), calc(var(--c-covid-s) + 20%), var(--c-covid-l));
	}

	.regulations-bar {
		width: 1em;
		border: 2px solid white;
		background-color: hsl(var(--c-background-h), var(--c-background-s), calc(var(--c-background-l) - 20%));
		box-sizing: content-box;
	}

	.tick {
		position: relative;
		top: calc(var(--tick-fraction) * 93%);
		height: 2px;
		background-color: rgb(255, 255, 255, 0.5);
	}
</style>
