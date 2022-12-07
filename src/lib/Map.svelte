<script>
	// This component currently would not work reliably with multiple instances,
	// due to the SVG ids not being unique anymore.

	import paths from "../assets/map-germany"; // contains SVG path coordinates for each state
	import { valuesPerState, filter } from "../stores";
	import { getUID, stateIDs } from "../util";

	export let projectionStyle = "geo";
	export let regulationsStyle = 0;

	const id = getUID();

	const onSelectState = (id) => {
		if ($filter.state === id) $filter.state = null;
		else $filter.state = id;
	};

	$: ({ states, max } = $valuesPerState);
	$: ({ state: selectedState } = $filter);
</script>

<svg viewBox="0 0 1000 1360" fill="none">
	<defs>
		{#each stateIDs as state}
			<!-- Base vector path per state: -->
			<path
				id="map-state-path-{state}-{id}"
				d={paths[projectionStyle][state]}
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


	{#each states as { id: state, value, regulationsTotal }}
		<use
			class="state"
			href="#map-state-path-{state}-{id}"
			style:--fraction={value / max.value}
			tabindex="0"
			on:click={() => onSelectState(state)}
			on:keypress={({ code }) => ["Enter", "Space"].includes(code) && onSelectState(state)}
		/>

		{#if regulationsStyle === 0}
			<g clip-path="url(#map-state-clip-{state}-{id})">
				{#each { length: Math.floor(regulationsTotal / max.regulationsTotal * 4) } as _, i}
					<use class="regulation-border" href="#map-state-path-{state}-{id}" style:--index={i} />
				{/each}
			</g>
		{:else if regulationsStyle === 1}
			<pattern
				id="map-state-regulations-fill={state}-{id}"
				class="regulation-circles"
				width="16" height="16"
				patternUnits="userSpaceOnUse"
			>

				<circle cx="8" cy="8" r={regulationsTotal / max.regulationsTotal * 8} />
			</pattern>
			<use
				class="regulation-circles"
				href="#map-state-path-{state}-{id}"
				fill="url(#map-state-regulations-fill={state}-{id})"
			/>
		{:else if regulationsStyle === 2}
			<pattern
				id="map-state-regulations-tilt={state}-{id}"
				class="regulation-tilt"
				width="32" height="32"
				patternTransform="rotate({regulationsTotal / max.regulationsTotal * 45})"
				patternUnits="userSpaceOnUse"
			>

				<line
					y1="16"
					y2="16"
					x1={16 - regulationsTotal / max.regulationsTotal * 16}
					x2={16 + regulationsTotal / max.regulationsTotal * 16}
					stroke-width={1 + regulationsTotal / max.regulationsTotal * 3}
				/>
			</pattern>
			<use
				class="regulation-tilt"
				href="#map-state-path-{state}-{id}"
				fill="url(#map-state-regulations-tilt={state}-{id})"
			/>
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
		fill: hsla(var(--col-primary-hsl), var(--fraction));

		transition: fill 300ms ease;
	}
	svg use.state-outline {
		stroke: white;
		stroke-width: calc(var(--stroke-width-outline) / 2);
	}

	svg use.regulation-border {
		pointer-events: none;
		stroke: #c92d34;
		opacity: 0.5;
		/* multiply by 2 because we clip off outside half of the stroke */
		stroke-width: calc(var(--stroke-width-regulation) * 2 * (var(--index) + 1) + var(--stroke-width-outline) / 2);
	}

	svg pattern.regulation-circles {
		fill: #c92d34;
	}
	svg use.regulation-circles {
		pointer-events: none;
	}

	svg pattern.regulation-tilt {
		stroke: #c92d34;
		stroke-width: 2px;
	}
	svg use.regulation-tilt {
		pointer-events: none;
	}

	svg use.selected {
		pointer-events: none;

		stroke: gold;
		/* multiply by 2 because we mask off inside half of the stroke */
		stroke-width: calc(var(--stroke-width-selected) * 2);
	}
</style>
