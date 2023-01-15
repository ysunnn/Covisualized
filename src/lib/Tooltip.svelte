<script>
	export let date;
	export let valueGermany;
	export let valueState = null;
	export let tooltipCoords;

	import { filter } from "../stores.js";

	const width = 80;
</script>

<div
	class="arrowBox"
	style:width="{width}px" style:left="{tooltipCoords.x - width / 2}px" style:line-height="18px"
>
	{date}
	<br />
	<span class="squareGermany"></span> all: {valueGermany}
	{#if $filter.state}
		<br />
		<span class="squareState"></span> {$filter.state}: {valueState}
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
	}

	.arrowBox:after {
		content: " ";
		z-index: 0;
		width: 0;
		height: 0;
		border-radius: 2px;
		position: absolute;
		right: 50%;
		top: 100%;
		margin-right: -7px;
	}
</style>
