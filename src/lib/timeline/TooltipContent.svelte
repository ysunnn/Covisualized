<script>
	import { filter } from "../../stores";
	import { formatValue, getStateName } from "../../util";

	export let data;
	export let colors;

	$: colorsCSS = Object.fromEntries(Object.entries(colors).map(([type, color]) => [type, `var(--c-${color})`]));
</script>

<div class="tooltip-content">
	{#each data as [type, point]}
		<div class="entry">
			<span
				class="color-indicator"
				class:no-data={!point?.value}
				style:background-color={colorsCSS[type]}
			/>
			<span class="state">
				{getStateName(type === "state" ? $filter.state : type)}:
			</span>
			<span class="value">
				{#if point?.value}
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

	.color-indicator {
		display: inline-block;
		width: 1em;
		height: 1em;
		border-radius: 50%;
	}

	.color-indicator.no-data {
		background-image: var(--gradient-no-data-legend);
		background-size: 100%;
	}
</style>
