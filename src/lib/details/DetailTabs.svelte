<script>
	import { extent } from "d3";
	import { isNullish, stateIDs } from "../../util";
	import { data, filter, statesForVariableAtDate, availableDatesForVariable } from "../../stores";
	import HorizontalBarChart from "./HorizontalBarChart.svelte";
	import VerticalBarChart from "./VerticalBarChart.svelte";
	import Tabs from "./Tabs.svelte";
	import DetailOverview from "./DetailOverview.svelte";

	export let show; // hide the component from the inside to keep it's state

	const tabItems = [
		{ label: "Details", icon: "info", value: 1 },
		{ label: "National Comparison", icon: "difference", value: 2 },
		{ label: "Yearly Difference", icon: "compare", value: 3 },
	];

	let currentTab;

	$: statesMinMaxDiff = Math.max(...Object.values($data).map(states => {
		return extent(Object.entries(states)
			.filter(([state]) => state !== "de")
			.map(([, variables]) => variables[$filter.variable]));
	}).filter(([min]) => min !== undefined).map(([min, max]) => max - min));

	$: yearsMinMaxDiff = Math.max(...new Array(12).fill().map((_, i) => String(i + 1).padStart(2, "0"))
		.flatMap(month => {
			const yearsForMonth = $availableDatesForVariable.filter(date => date.slice(-2) === month);
			return stateIDs.map(stateID => {
				return extent(yearsForMonth.map(date => $data[date][stateID]?.[$filter.variable]));
			}).filter(([min]) => min !== undefined).map(([min, max]) => max - min);
		}));

	$: statesChartData = Object.entries($statesForVariableAtDate.states)
		.filter(([state, values]) => !isNullish(values?.value) && state !== $filter.state)
		.map(([state, values]) => ({
			key: state,
			value: (values.value - $statesForVariableAtDate.states[$filter.state].value),
		}))
		.sort(({ value: a }, { value: b }) => b - a);

	$: yearsChartData = $availableDatesForVariable
		.filter(date => !isNullish($data[date][$filter.state]?.[$filter.variable]) && (date !== $filter.date) && (date.slice(-2) === $filter.date.slice(-2)))
		.map(date => ({
			key: date,
			value: $data[date]?.[$filter.state]?.[$filter.variable] - $data[$filter.date]?.[$filter.state]?.[$filter.variable],
		}));
</script>

<div class="tabs" class:show>
	<Tabs bind:activeTabValue={currentTab} items={tabItems} />
	<div class="content">
		{#if 1 === currentTab}
			<div class="charts">
				<DetailOverview />
			</div>
		{/if}
		{#if 2 === currentTab}
			<div class="charts">
				<HorizontalBarChart data={statesChartData} min={-statesMinMaxDiff} max={statesMinMaxDiff} />
			</div>
		{/if}
		{#if 3 === currentTab}
			<div class="charts">
				<VerticalBarChart data={yearsChartData} min={-yearsMinMaxDiff} max={yearsMinMaxDiff} />
			</div>
		{/if}
	</div>
</div>

<style>
	.tabs {
		display: flex;
		flex-direction: column;
	}
	.tabs:not(.show) {
		display: none;
	}
</style>
