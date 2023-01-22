<script>
	import { extent } from "d3";
	import { data, filter, statesForVariableAtDate } from "../../stores";
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

	$: chartData = Object.entries($statesForVariableAtDate.states)
		.filter(([state, values]) => values?.value && state !== $filter.state)
		.map(([state, values]) => ({
			key: state,
			value: (values.value - $statesForVariableAtDate.states[$filter.state].value) * 100,
		}))
		.sort(({ value: a }, { value: b }) => b - a);

</script>

<Tabs bind:activeTabValue={currentTab} items={tabItems} />
{#if 1 === currentTab}
	<div class="charts">
		<h3>{tabItems[currentTab - 1].label}</h3>
		<DetailOverview />
	</div>
{/if}
{#if 2 === currentTab}
	<div class="charts">
		<h3>{tabItems[currentTab - 1].label}</h3>
		<HorizontalBarChart data={chartData} min={-minMaxDiff * 100} max={minMaxDiff * 100} />
	</div>
{/if}
{#if 3 === currentTab}
	<div class="charts">
		<h3>{tabItems[currentTab - 1].label}</h3>
		<VerticalBarChart data={chartData} min={-minMaxDiff * 100} max={minMaxDiff * 100} />
	</div>
{/if}
