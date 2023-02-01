<script>
	import { filter, statesForVariableAtDate } from "../../stores";
	import { getStateFlag, getStateName, isNullish } from "../../util";

	import DetailTabs from "./DetailTabs.svelte";
	import Regulations from "./Regulations.svelte";

	$: ({ state } = $filter);
</script>

<div class="state">
	<div class="header">
		<h1>{getStateName(state)}</h1>
		<img class="flag" src={getStateFlag(state)} role="presentation" />
	</div>
	<Regulations />
	<DetailTabs show={!isNullish($statesForVariableAtDate.states[$filter.state].value)} />
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
		height: 3em;
		border: 4px solid var(--c-foreground);
		outline: 4px solid white;
		box-shadow: 0 0.25em 1em 0 rgb(0, 0, 0, 0.2);
		border-radius: 6px;
	}
</style>
