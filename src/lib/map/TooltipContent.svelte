<script>
	import { isNullish, formatValue, getStateName } from "../../util";

	export let state;
	export let data;

	// We need to keep the data from the last time it wasn't undefined,
	// so we can still show it while the tooltip fades out:
	$: cached = {
		state: isNullish(state) ? cached?.state : state,
		data: isNullish(data) ? cached?.data : data,
	};
</script>

<div class="state">
	{getStateName(cached.state)}
</div>
{#each cached.data || [] as { label, type, color, value }}
	<div class="entry {type}">
		<span
			class="color-indicator"
			class:no-data={isNullish(value)}
			style:background-color={color}
		/>
		<span class="label">
			&nbsp;{label}:&nbsp;
		</span>
		<span class="value">
			{#if !isNullish(value)}
				<b>{formatValue(value, type)}</b>
			{:else}
				<i>no data</i>
			{/if}
		</span>
	</div>
{/each}

<style>
	.state {
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
	.entry.regulationsIndex .color-indicator {
		border-radius: 0;
		height: 0.75em;
		border: 2px solid white;
	}
	.color-indicator.no-data {
		background-image: var(--gradient-no-data-legend);
		background-size: 100%;
	}
</style>
