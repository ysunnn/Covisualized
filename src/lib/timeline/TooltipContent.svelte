<script>
	import { filter } from "../../stores";
	import { formatValue, getStateName, isNullish } from "../../util";
	import { utcFormat } from "d3";

	export let data = [];
	export let colors;

	const formatDate = utcFormat("%B %Y");

	$: colorsCSS = Object.fromEntries(
		Object.entries(colors).map(([type, color]) => [type, `var(--c-${color})`]),
	);
</script>

<div class="tooltip-content">
	{#each data as [type, point], i}
		{#if i === 0}
			<div class="date">
				{formatDate(point?.date)}
			</div>
		{/if}
		<div class="entry">
			<span
				class="color-indicator"
				class:no-data={isNullish(point?.value)}
				style:background-color={colorsCSS[type]}
			/>
			<span class="state">
				&nbsp;{getStateName(type === "state" ? $filter.state : type)}:&nbsp;
			</span>
			<span class="value">
				{#if !isNullish(point?.value)}
					<b>{formatValue(point.value, $filter.variable)}</b>
				{:else}
					<i>no data</i>
				{/if}
			</span>
		</div>
	{/each}
</div>

<style>
	.tooltip-content {
		display: flex;
		flex-direction: column;
	}

	.date {
		font-weight: 500;
		margin-bottom: 0.5em;
	}

	.entry {
		display: flex;
		align-items: center;
	}

	.color-indicator {
		width: 1em;
		height: 1em;
		border-radius: 50%;
	}

	.color-indicator.no-data {
		background-image: var(--gradient-no-data-legend);
		background-size: 100%;
	}
</style>
