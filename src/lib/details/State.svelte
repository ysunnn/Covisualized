<script>
	import { filter } from "../../stores";
	import { getStateFlag, getStateName } from "../../util";

	import BarChartStates from "./BarChartStates.svelte";
	import Regulations from "./Regulations.svelte";
	import Tabs from "./Tabs.svelte";

	$: ({ state } = $filter);

	const tabItems = [
		{ label: "Details", value: 1 },
		{ label: "National Comparison", value: 2 },
		{ label: "Yearly Difference", value: 3 },
	];

	let currentTab;
</script>

<div class="state">
	<div class="header">
		<h1>{getStateName(state)}</h1>
		<img class="flag" src={getStateFlag(state)} role="presentation" />
	</div>

	<Regulations />

	<Tabs bind:activeTabValue={currentTab} items={tabItems} />
	{#if 1 === currentTab}
		<div class="charts">
			<h3>Details</h3>
			<p> Construction Place </p>
		</div>
	{/if}
	{#if 2 === currentTab}
		<div class="charts">
			<h3>National Comparison</h3>
			<BarChartStates />
		</div>
	{/if}
	{#if 3 === currentTab}
		<div class="charts">
			<h3>Yearly Difference</h3>
			<p> Construction Place </p>
		</div>
	{/if}


</div>

<style>
	.charts {
		margin-left: 15px;
	}
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
