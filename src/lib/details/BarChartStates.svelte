<script>
	import { statesForVariableAtDate, filter } from "../../stores";
	import BarChart from "../BarChart.svelte";
	// go through data set at every moment of time and substract the highest value of all states by the lowest value of all states.
	// Save the biggest difference from all moments of time.
	$: minMaxDiff = $statesForVariableAtDate?.ranges?.value
		? $statesForVariableAtDate.ranges.value.max - $statesForVariableAtDate.ranges.value.min
		: 0;

	$: data = Object.entries($statesForVariableAtDate.states)
		.filter(([state, values]) => values?.value && state !== $filter.state)
		.map(([state, values]) => ({
			key: state,
			value: (values.value - $statesForVariableAtDate.states[$filter.state].value) * 100,
		}))
		.sort(({ value: a }, { value: b }) => b - a);

</script>

<BarChart {data} min={-minMaxDiff * 100} max={minMaxDiff * 100} />
