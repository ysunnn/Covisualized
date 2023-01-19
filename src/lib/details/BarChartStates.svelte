<script>
	import { statesForVariableAtDate, filter } from "../../stores";
	import BarChart from "../BarChart.svelte";

	$: data = Object.entries($statesForVariableAtDate.states)
		.filter(([state, values]) => values?.value && state !== $filter.state)
		.map(([state, values]) => ({
			key: state,
			value: (values.value - $statesForVariableAtDate.states[$filter.state].value) * 100,
		}))
		.sort(({ value: a }, { value: b }) => b - a);
</script>

<BarChart {data} />
