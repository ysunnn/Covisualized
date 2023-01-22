<script>
	import { getValueColorCSS } from "./Map.svelte";
	import { labelTitle, mapRange, round } from "../util";
	import { filter, statesForVariableAtDate } from "../stores";
	import { format, precisionFixed } from "d3";

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
	// const f = format(".2s");

	$: ({ variable } = $filter);
	$: ({ ranges: { value: { min, max } } } = $statesForVariableAtDate);
	$: yAxisLabelTitle = labelTitle.find(l => l.id === $filter.variable).title;
	$: yAxisLabelNote = labelTitle.find(l => l.id === $filter.variable).note;
</script>

<div class="legend">
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

<style>
	.title {
		width: 6.5em;
		margin-right: 0.5em;
	}

	.titleText{
		font-weight: bold;
	}

	.titleNote {
		font-size: small;
	}

	.legend {
		height: 20%;
		display: flex;
		align-self: flex-end;
		margin-right: 2em;
		margin-bottom: 2em;
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
		height: 15px;
		width: 15px;
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
</style>
