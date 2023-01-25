<script>
	import paths from "../assets/map-germany"; // contains SVG path coordinates for each state
	import { statesForVariableAtDate, filter, playback } from "../stores";
	import { getUID, stateIDs, isNullish, mapRange } from "../util";

	const id = getUID();

	const onSelectState = (id) => {
		if ($filter.state === id) $filter.state = null;
		else $filter.state = id;
	};

	$: ({ states, ranges } = $statesForVariableAtDate);
	$: ({ state: selectedState, variable } = $filter);
	$: date = (() => {
		if (!$filter.date) return { year: "", month: "" };
		const [year, month] = $filter.date.split("-");
		return { year, month };
	})();
</script>

<svg
	viewBox="0 0 1000 1360"
	fill="none"
	class={variable}
	style:--transition-duration="{$playback.playing ? $playback.stepDuration : 300}ms"
	style:--transition-timing-function={$playback.playing ? "linear" : "ease"}
>
	<defs>
		<pattern
			class="no-data-pattern"
			id="map-no-data-pattern-{id}"
			patternUnits="userSpaceOnUse"
			width="20"
			height="20"
			patternTransform="rotate(45)"
		>
			<rect width="20" height="20" />
			<line x1="0" y="0" x2="0" y2="20" stroke-width="20" />
		</pattern>

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


	{#each Object.entries(states) as [state, { valueFrac, regulationsIndex }]}
		<use
			class="state"
			class:data-available={!isNullish(valueFrac)}
			style:--lightness={mapRange(valueFrac, 0, 1, 0.9, 0.2)}
			fill="url(#map-no-data-pattern-{id})"
			href="#map-state-path-{state}-{id}"
			tabindex="0"
			on:click={() => onSelectState(state)}
			on:keypress={({ code }) => ["Enter", "Space"].includes(code) && onSelectState(state)}
		/>

		<g clip-path="url(#map-state-clip-{state}-{id})">
			<use
				class="regulation-border"
				href="#map-state-path-{state}-{id}"
				style:--frac={!isNullish(regulationsIndex) ? regulationsIndex / ranges.regulationsIndex.max : 0}
			/>
		</g>
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

	<foreignObject width="200" height="192" x="772" y="824">
		<div class="date">
			<span class="month">{date.month}</span>
			<span class="year">{date.year}</span>
		</div>
	</foreignObject>
</svg>

<style>
	svg {
		display: block;
		stroke-linejoin: round;
		--stroke-width-outline: 1px;
		--stroke-width-selected: 2px;
		filter: drop-shadow(0 0 32px rgba(0, 0, 0, 0.1));
	}

	svg use.state {
		transition: fill var(--transition-duration) var(--transition-timing-function);
	}
	svg use.state.data-available {
		fill: hsl(var(--c-primary-h), var(--c-primary-s), calc(100% * var(--lightness)));
	}
	svg.incidences use.state.data-available {
		fill: hsl(var(--c-covid-h), var(--c-covid-s), calc(100% * var(--lightness)));
	}
	svg .no-data-pattern rect {
		fill: #f2f2f2;
	}
	svg .no-data-pattern line {
		stroke: #e8e8e8;
	}

	svg use.state-outline {
		stroke: white;
		stroke-width: var(--stroke-width-outline);
	}

	svg use.regulation-border {
		pointer-events: none;
		stroke: hsl(var(--c-covid-hsl), var(--frac));
		stroke-width: calc(var(--frac) * 20px + var(--stroke-width-outline) / 2);

		transition: var(--transition-duration) var(--transition-timing-function);
		transition-property: stroke, stroke-width;
	}

	svg use.selected {
		pointer-events: none;

		stroke: gold;
		/* multiply by 2 because we mask off inside half of the stroke */
		stroke-width: calc(var(--stroke-width-selected) * 2);
	}

	.date {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		align-items: center;

		font-size: 40px;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}
	.date .month {
		font-size: 2em;
	}

	.date .year {
		font-weight: bold;
	}
</style>
