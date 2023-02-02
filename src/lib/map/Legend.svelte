<script>
	import { variables, mapRange, formatValue } from "../../util.js";
	import { filter, statesForVariableAtDate } from "../../stores.js";
	import { getValueColorCSS } from "./Map.svelte";

	const SECTIONS = {
		variable: 5,
		regulations: 5,
	};

	$: ({ ranges: { value: rangeValue } } = $statesForVariableAtDate);
	$: rangeRegulations = $statesForVariableAtDate.ranges.regulationsIndex;
	$: variable = variables.find(({ id }) => id === $filter.variable);
</script>

<div class="legend">
	<div class="variable">
		<div class="description">
			<div class="desc">{variable.desc}</div>
			<div class="details">{variable.details}</div>
			<div class="note-no-data">
				<span class="indicator-no-data" /><i>no data</i>
			</div>
		</div>
		<div class="scale">
			<div
				class="bar"
				style:--min={getValueColorCSS(1.0, variable.id)}
				style:--mid={getValueColorCSS(0.5, variable.id)}
				style:--max={getValueColorCSS(0.0, variable.id)}
			/>
			<div class="labels">
				{#each { length: SECTIONS.variable } as _, i}
					<span>
						{formatValue(mapRange(i / (SECTIONS.variable - 1), 0.0, 1.0, rangeValue.min, rangeValue.max), variable.id, true)}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<div class="regulations">
		<div class="description">
			<div class="desc">COVID-19 Regulation index <span class="indicator-regulations" /></div>
			<div class="details">Coded index for corona regulations and their severity</div>
		</div>
		<div class="scale">
			<div class="bar">
				{#each { length: SECTIONS.regulations - 1 } as _, i}
					<div class="tick" style:--tick-fraction={(i + 1) / SECTIONS.regulations} />
				{/each}
			</div>
			<div class="labels">
				{#each { length: SECTIONS.regulations + 1 } as _, i}
					<span>
						{formatValue(mapRange(i / SECTIONS.regulations, 0.0, 1.0, rangeRegulations.min, rangeRegulations.max), "regulationsIndex", true)}
					</span>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.legend {
		display: flex;
		flex-direction: column;
		gap: 2em;
		font-size: 0.875em;
	}

	.variable, .regulations {
		display: flex;
		gap: 0.5em;
	}

	.description {
		width: 12ch;
		display: flex;
		flex-direction: column;
	}
	.description .desc {
		font-weight: bold;
	}
	.description .details {
		font-size: 0.8125em;
	}
	.description .note-no-data {
		margin-top: auto;
		font-size: 0.8125em;

		display: flex;
		align-items: center;
		gap: 0.5em;
	}
	.indicator-no-data {
		display: inline-block;
		height: 1em;
		width: 1em;
		background-image: var(--gradient-no-data-legend);
		border: 1px solid white;
		box-shadow: 0 0 1em 0 rgb(0, 0, 0, 0.15);
	}

	.scale {
		display: flex;
		gap: 0.25em;
		font-size: 0.8125em;
		line-height: 1;
		padding-right: 0.5em;
	}

	.scale .bar {
		width: 1em;
		min-height: 10em;
		/* Correctly align text to bars */
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		box-shadow: 0 0 2em 0 rgb(0, 0, 0, 0.15);
	}

	.scale .labels {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-between;
		width: 5ch;
		text-align: right;
	}

	.indicator-regulations {
		display: inline-block;
		height: 0.5em;
		width: 1em;
		background-color: hsl(var(--c-covid-h), calc(var(--c-covid-s) + 20%), var(--c-covid-l));
	}

	.variable .bar {
		background-image: linear-gradient(to bottom, var(--min), var(--mid), var(--max));
	}
	.regulations .bar {
		position: relative;
		box-sizing: content-box;
		border: 2px solid white;
		margin-left: -2px;
		background-color: hsl(var(--c-background-h), var(--c-background-s), calc(var(--c-background-l) - 20%));
	}
	.regulations .bar .tick {
		position: absolute;
		top: calc(var(--tick-fraction) * 100%);
		left: 0;
		right: 0;
		height: 2px;
		transform: translateY(-50%);
		background-color: rgb(255, 255, 255, 0.5);
	}
</style>
