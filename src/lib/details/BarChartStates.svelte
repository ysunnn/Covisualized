<script>
	import { statesForVariableAtDate } from "../../stores";
	import BarChart from "../BarChart.svelte";

	$: data = Object.entries($statesForVariableAtDate.states).map(([key, values]) => {
		return { key, value: values.value * 100 };
	});
</script>

<BarChart {data} />
