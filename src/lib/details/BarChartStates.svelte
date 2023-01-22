<script>
	import { extent } from "d3";
	import { data, filter, statesForVariableAtDate } from "../../stores";
	import BarChart from "../BarChart.svelte";

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

<BarChart data={chartData} min={-minMaxDiff * 100} max={minMaxDiff * 100} />
