<script>
	import paths from "../assets/map-germany"; // contains SVG path coordinates for each state
	import { filter, valuesPerState } from "../stores.js";

	const onSelectState = (id) => {
		$filter.state = id;
	};
</script>

<svg viewBox="0 0 1000 1360" fill="none">
	{#each $valuesPerState.states as { id, value }}
		<path {id} d={paths[id]} vector-effect="non-scaling-stroke" />
		<use
			class="state"
			href="#{id}"
			style="--fraction: {value / $valuesPerState.max}"
			tabindex="0"
			on:click={() => onSelectState(id)}
			on:keypress={({ code }) => ["Enter", "Space"].includes(code) && onSelectState(id)}
		/>
	{/each}
	{#if $filter.state}
		<defs>
			<mask id="mask-selected">
				<rect width="100%" height="100%" fill="white" />
				<use href={`#${$filter.state}`} fill="black" />
			</mask>
		</defs>
		<use id="selected" href={`#${$filter.state}`} mask="url(#mask-selected)" />
	{/if}
</svg>

<style>
	svg {
		--stroke-width: 3px;

		display: block;
	}

	svg use.state {
		fill: hsla(var(--col-primary-hsl), var(--fraction));
	}

	svg use#selected {
		pointer-events: none; /* prevent blocking of clicks on bordering states */

		stroke: gold;
		stroke-width: calc(var(--stroke-width) * 2);
	}
</style>
