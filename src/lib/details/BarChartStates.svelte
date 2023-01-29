<script>
	import { extent } from "d3";
	import { data, filter, statesForVariableAtDate, availableDatesForVariable } from "../../stores";
	import HorizontalBarChart from "./HorizontalBarChart.svelte";
	import VerticalBarChart from "./VerticalBarChart.svelte";
	import Tabs from "./Tabs.svelte";
	import DetailOverview from "./DetailOverview.svelte";

	const tabItems = [
		{ label: "Details", value: 1 },
		{ label: "National Comparison", value: 2 },
		{ label: "Yearly Difference", value: 3 },
	];

	let currentTab;

	$: minMaxDiff = Math.max(...Object.values($data).map(states => {
		return extent(Object.entries(states)
			.filter(([state]) => state !== "de")
			.map(([, variables]) => variables[$filter.variable]));
	}).filter(([min]) => min !== undefined).map(([min, max]) => max - min));

	$: stateChartData = Object.entries($statesForVariableAtDate.states)
		.filter(([state, values]) => values?.value && state !== $filter.state)
		.map(([state, values]) => ({
			key: state,
			value: (values.value - $statesForVariableAtDate.states[$filter.state].value),
		}))
		.sort(({ value: a }, { value: b }) => b - a);

	$: yearsChartData = $availableDatesForVariable
		.filter(date => date.slice(-2) === $filter.date.slice(-2))
		.map(date => ({
			key: date,
			value: $data[$filter.date]?.[$filter.state]?.[$filter.variable] - $data[date]?.[$filter.state]?.[$filter.variable],
		}));
	$: console.log(yearsChartData);
</script>

<Tabs bind:activeTabValue={currentTab} items={tabItems} />
{#if 1 === currentTab}
	<div class="charts">
		<DetailOverview data={stateChartData} />
	</div>
{/if}
{#if 2 === currentTab}
	<div class="charts">
		<HorizontalBarChart data={stateChartData} min={-minMaxDiff} max={minMaxDiff} />
	</div>
{/if}
{#if 3 === currentTab}
	<div class="charts">
		<VerticalBarChart data={yearsChartData} min={-minMaxDiff} max={minMaxDiff} />
	</div>
{/if}
