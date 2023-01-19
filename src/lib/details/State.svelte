<script>
	import { filter } from "../../stores";
	import { getStateFlag, getStateName } from "../../util";

	import BarChartStates from "./BarChartStates.svelte";
	import Regulations from "./Regulations.svelte";

	$: ({ state } = $filter);
</script>

<div class="state">
	<div class="header">
		<h1>{getStateName(state)}</h1>
		<img class="flag" src={getStateFlag(state)} role="presentation" />
	</div>

	<Regulations />

	<div class="charts">
		<h3>National Comparison</h3>
		<BarChartStates />
	</div>
</div>

<style>
	.state {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header h1 { margin: 0; }

	.flag {
		height: 4em;
	}

	.flag {
		border: 4px solid var(--c-foreground);
		border-radius: 6px;
	}
</style>
