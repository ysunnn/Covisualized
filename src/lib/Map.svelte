<script>
	import mapData from "../assets/map-germany"; // contains SVG path coordinates for each state
	import { filter, valuesPerState } from "../stores.js";

	const onSelectState = (id) => {
		$filter.state = id;
	};
</script>

<svg viewBox="0 0 1000 1360" >
	{#each $valuesPerState.states as { id, value }}
		<path
			fill={`hsla(266, 35%, 19%, ${value / $valuesPerState.max})`}
			d={mapData[id]}
			tabindex="0"
			on:click={() => onSelectState(id)}
			on:keypress={({ code }) => ["Enter", "Space"].includes(code) && onSelectState(id)}
		/>
	{/each}
	{#if $filter.state}
		<path id="selected" d={mapData[$filter.state]} />
	{/if}
</svg>

<style>
	svg {
		display: block;
	}

	svg path {
		vector-effect: non-scaling-stroke;
	}

	svg path#selected {
		fill: none;
		stroke: royalblue;
		stroke-width: 3px;
	}
</style>
