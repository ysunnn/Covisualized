<script>
	import { statesForVariableAtDate, filter } from "../../stores";
	import BarChart from "../BarChart.svelte";

	$: data = Object.entries($statesForVariableAtDate.states)
		.filter(([, values]) => values?.value)
		.map(([key, values]) => {
			return {
				key,
				value: (values.value - $statesForVariableAtDate.states[$filter.state].value) * 100,
			};
		});
</script>

<BarChart {data} />
