<script>
	import { format } from "d3";
	import { filter } from "../../stores.js";
	import { getStateName, isNullish } from "../../util.js";

	export let date;
	export let valueGermany;
	export let valueState = null;
	export let tooltipCoords;

	function setValueFormat(v) {
		if (isNullish(v)){
			return "No Data";
		} else {
			const formatRound = format(".5");
			return formatRound(v);
		}
	}
</script>

<div
	class="tooltip"
	style:left="{tooltipCoords.x}px" style:line-height="18px"
>
	{date}
	<br />
	<span class="squareGermany" /> Germany: {setValueFormat(valueGermany)}
	{#if $filter.state}
		<br />
		<span class="squareState" /> {getStateName($filter.state)}: {setValueFormat(valueState)}
	{/if}
</div>

<style>
	.squareGermany {
		display: inline-block;
		height: 10px;
		width: 10px;
		background-color: var(--c-primary);
	}

	.squareState {
		display: inline-block;
		height: 10px;
		width: 10px;
		background-color: #4169E1;
	}

	.tooltip {
		z-index: 0;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 4px;
		position: relative;
		font-size: 0.725em;
		color: white;
		text-align: center;
		padding: 0.5em;
		width: max-content;
		transform: translateX(-50%);
	}

	.tooltip:after {
		content: " ";
		width: 0;
		height: 0;
		position: absolute;
		right: 0;
		left: 0;
		top: 100% ;
		margin: 0 auto;
		border-top: 10px solid rgba(0, 0, 0, 0.8);
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}
</style>
