<script>
	import paths from "../assets/map-germany"; // contains SVG path coordinates for each state
	import { statesForVariableAtDate, filter } from "../stores";
	import { getUID, stateIDs } from "../util";

	const id = getUID();

	const onSelectState = (id) => {
		if ($filter.state === id) $filter.state = null;
		else $filter.state = id;
	};

	$: ({ states, ranges } = $statesForVariableAtDate);
	$: ({ state: selectedState } = $filter);
</script>

<svg viewBox="0 0 1000 1360" fill="none">
	<defs>
		{#each stateIDs as state}
			<!-- Base vector path per state: -->
			<path
				id="map-state-path-{state}-{id}"
				d={paths[state]}
				vector-effect="non-scaling-stroke"
			/>

			<!-- Clip can be used to cut off anything OUTSIDE the state. Used for inside borders. -->
			<clipPath id="map-state-clip-{state}-{id}">
				<use href="#map-state-path-{state}-{id}" />
			</clipPath>

			<!-- Mask can be used to cut off anything INSIDE the state. Used for outside borders. -->
			<mask id="map-state-mask-{state}-{id}">
				<rect width="100%" height="100%" fill="white" />
				<use href="#map-state-path-{state}-{id}" fill="black" />
			</mask>
		{/each}
	</defs>


	{#each stateIDs as state}
		<use
			class="state"
			href="#map-state-path-{state}-{id}"
			style:--fraction={states[state] ? (states[state].value - ranges.value.min) / (ranges.value.max - ranges.value.min) : 0.5}
			tabindex="0"
			on:click={() => onSelectState(state)}
			on:keypress={({ code }) => ["Enter", "Space"].includes(code) && onSelectState(state)}
		/>

		{#if false}
			<g clip-path="url(#map-state-clip-{state}-{id})">
				{#each { length: states[state] ? Math.floor(states[state].regulationsTotal / ranges.regulationsTotal.max * 4) : 0 } as _, i}
					<use class="regulation-border" href="#map-state-path-{state}-{id}" style:--index={i} />
				{/each}
			</g>
		{/if}
	{/each}

	<!-- Outlines are extra, so we can hide the inside half with a mask (otherwise removes the fill) -->
	<g>
		{#each stateIDs as state}
			<use
				class="state-outline"
				href="#map-state-path-{state}-{id}"
				mask={selectedState && `url(#map-state-mask-${selectedState}-${id})`}
			/>
		{/each}
	</g>

	{#if selectedState}
		<use
			class="selected"
			href="#map-state-path-{selectedState}-{id}"
			mask="url(#map-state-mask-{selectedState}-{id})"
		/>
	{/if}
</svg>

<style>
	svg {
		display: block;
		stroke-linejoin: round;
		--stroke-width-outline: 1px;
		--stroke-width-selected: 2px;
		--stroke-width-regulation: 4px;
	}

	svg use.state {
		fill: hsl(var(--c-primary-hsl), var(--fraction));

		transition: fill 300ms ease;
	}

	svg use.state-outline {
		stroke: white;
		stroke-width: var(--stroke-width-outline);
	}

	svg use.regulation-border {
		pointer-events: none;
		stroke: #c92d34;
		opacity: 0.5;
		/* multiply by 2 because we clip off outside half of the stroke */
		stroke-width: calc(var(--stroke-width-regulation) * 2 * (var(--index) + 1) + var(--stroke-width-outline) / 2);
	}

	svg use.selected {
		pointer-events: none;

		stroke: gold;
		/* multiply by 2 because we mask off inside half of the stroke */
		stroke-width: calc(var(--stroke-width-selected) * 2);
	}
</style>
