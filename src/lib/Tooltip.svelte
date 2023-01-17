<script>
	import { format } from "d3";
	import { filter } from "../stores.js";
	import { isNullish } from "../util.js";

	export let date;
	export let valueGermany;
	export let valueState = null;
	export let tooltipCoords;

	const width = 85;

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
	class="arrowBox"
	style:width="{width}px" style:left="{tooltipCoords.x - width / 2}px" style:line-height="18px"
>
	{date}
	<br />
	<span class="squareGermany"></span> all: {setValueFormat(valueGermany)}
	{#if $filter.state}
		<br />
		<span class="squareState"></span> {$filter.state}: {setValueFormat(valueState)}
	{/if}
</div>

<style>
	.squareGermany {
		display: inline-block;
		height: 10px;
		width: 10px;
		background-color: #663399;
	}

	.squareState {
		display: inline-block;
		height: 10px;
		width: 10px;
		background-color: #4169E1;
	}

	.arrowBox {
		z-index: 0;
		background-color: #000;
		border-radius: 2px;
		position: relative;
		font-size: 0.725em;
		font-weight: 200;
		color: white;
		text-align: center;
		left: 50px;
		border-bottom: 5px solid #000;
	}

	.arrowBox:after {
		content: " ";
		width: 0;
		height: 0;
		position: absolute;
		right: 0;
		left: 0;
		top: 100% ;
		margin: 0 auto;
		border-top: 10px solid #000;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}
</style>
