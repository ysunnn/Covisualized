<script>
	import { data, filter, availableDatesForVariable } from "../../stores";
	import { formatValue, isNullish, variables } from "../../util";
	import Tooltip from "../Tooltip.svelte";

	$: variablesData = variables
		.map(variable => {
			const value = $data[$filter.date]?.[$filter.state]?.[variable.id];
			const dateIndex = $availableDatesForVariable.indexOf($filter.date);
			const prevMonthDate = $availableDatesForVariable[dateIndex - 1];
			const prevMonthValue = $data[prevMonthDate]?.[$filter.state]?.[variable.id];
			return {
				...variable,
				value,
				diffPrevMonth: prevMonthDate && prevMonthValue && (value - prevMonthValue),
				active: variable.id === $filter.variable,
			};
		})
		.filter(({ value }) => !isNullish(value));
</script>

<div class="overview">
	{#each variablesData as variable (variable.id)}
		<div
			class="variable"
			class:active={variable.active}
		>
			<div class="label" on:click={() => $filter.variable = variable.id}>
				{variable.label}
			</div>
			<div class="value">
				{formatValue(variable.value, variable.id)}
				{#if !isNullish(variable.diffPrevMonth)}
					<Tooltip content="compared to previous month" hideOnClick={false}>
						<span
							class="difference"
							class:positive={variable.diffPrevMonth > 0}
							class:negative={variable.diffPrevMonth < 0}
						>
							({variable.diffPrevMonth < 0 ? "" : "+"}{formatValue(variable.diffPrevMonth, variable.id)})
						</span>
					</Tooltip>
				{/if}
			</div>
		</div>
	{/each}
	{#if variablesData.length > 1}
		<div class="hint">
			Click on another category to compare.
		</div>
	{/if}
</div>


<style>
	.overview {
		display: grid;
		grid-template-columns: auto 1fr;
		margin-top: 1em;
	}

	.variable {
		display: contents;
		margin-top: 0.5em;
	}
	.variable.active {
		font-size: 1.75em;
		order: -2;
		margin-top: 0;
	}

	.label {
		font-weight: bold;
		padding-right: 1em;

		order: inherit;
		margin-top: inherit;
	}
	.variable:not(.active) .label {
		cursor: pointer;
		text-decoration: underline;
	}

	.value {
		order: inherit;
		margin-top: inherit;
	}

	.difference.positive {
		color: var(--c-positive);
	}
	.difference.negative {
		color: var(--c-covid);
	}

	.hint {
		order: -1;
		grid-column: 1 / 3;
		font-size: smaller;
		margin-top: 1.5em;
	}
</style>
