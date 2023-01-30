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

	{#if !isNullish($statesForVariableAtDate.states[$filter.state].value)}
		<DetailTabs />
	{/if}
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
		border: 4px solid var(--c-foreground);
		outline: 4px solid white;
		box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
		border-radius: 6px;
	}
</style>
