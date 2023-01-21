<script>
	import { getValueColorCSS } from "./Map.svelte";
	import { mapRange, round } from "../util";
	import { filter, statesForVariableAtDate } from "../stores";
	$: ({ variable } = $filter);
	$: ({ ranges: { value: { min, max } } } = $statesForVariableAtDate);
</script>

<div class="legend">
	<div
		class="scale"
		style:--min={getValueColorCSS(0.0, variable)}
		style:--mid={getValueColorCSS(0.5, variable)}
		style:--max={getValueColorCSS(1.0, variable)}
	/>
	<div class="labels">
		<span>
			{round(min, 2)}
		</span>
		<span>
			{round(mapRange(0.5, 0.0, 1.0, min, max), 2)}
		</span>
		<span>
			{round(max, 2)}
		</span>
	</div>
</div>

<style>
	.legend {
		height: 100%;
		display: flex;
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
</style>
