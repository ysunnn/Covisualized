<script context="module">
	const MIN_VALUE_LIGHTNESS = 0.9;
	const MAX_VALUE_LIGHTNESS = 0.2;

	export const getValueColorCSS = (valueFrac, variable) => {
		if (isNullish(valueFrac)) return;
		const color = (variable === "incidences" ? "covid" : "primary");
		const lightness = mapRange(valueFrac, 0, 1, MIN_VALUE_LIGHTNESS, MAX_VALUE_LIGHTNESS);
		return `hsl(var(--c-${color}-h), var(--c-${color}-s), calc(${lightness} * 100%))`;
	};
</script>

<script>
	import paths from "../../assets/map-germany"; // contains SVG path coordinates for each state
	import barOrigins from "../../assets/map-germany-bar-origins";
	import { statesForVariableAtDate, filter, playback } from "../../stores";
	import { getUID, stateIDs, variables, isNullish, mapRange } from "../../util";

	import Tooltip from "../Tooltip.svelte";
	import TooltipContent from "./TooltipContent.svelte";
	import RegulationsBar from "./RegulationsBar.svelte";

	const COORDS_WIDTH = 1000;
	const COORDS_HEIGHT = 1360;

	const id = getUID();

	const onSelectState = (id) => {
		if ($filter.state === id) $filter.state = null;
		else $filter.state = id;
	};

	let hoveredState = null;
	const onStatePointerover = (state) => {
		hoveredState = state;
	};
	const onStatePointerleave = (state) => {
		if (hoveredState === state) hoveredState = null;
	};

	$: ({ states } = $statesForVariableAtDate);
	$: ({ state: selectedState, variable: variableID } = $filter);
	$: date = (() => {
		if (!$filter.date) return { year: "", month: "" };
		const [year, month] = $filter.date.split("-");
		return { year, month };
	})();
	$: variable = variables.find(({ id }) => id === variableID);
</script>

<div class="map">
	<div class="svg-container" style:--aspect-ratio={COORDS_WIDTH / COORDS_HEIGHT}>
		<Tooltip
			placement="bottom-start"
			offset={[0, 32]}
			followCursor
			arrow={false}
			hideOnClick={false}
			show={Boolean(hoveredState)}
		>
			<TooltipContent
				slot="content"
				state={hoveredState}
				data={hoveredState && [{
					label: variable.label,
					type: variable.id,
					color: `var(--c-${variable.color})`,
					value: states[hoveredState]?.value,
				}, {
					label: "COVID-19 Regulation Index",
					type: "regulationsIndex",
					color: "hsl(var(--c-covid-h), calc(var(--c-covid-s) + 20%), var(--c-covid-l))",
					value: states[hoveredState]?.regulationsIndex,
				}]}
			/>
			<svg
				viewBox="0 0 {COORDS_WIDTH} {COORDS_HEIGHT}"
				fill="none"
				class={variableID}
				style:--transition-duration="{$playback.playing ? $playback.stepDuration - 30 : 300}ms"
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

						<!-- Mask can be used to cut off anything INSIDE the state. Used for outside borders. -->
						<mask id="map-state-mask-{state}-{id}">
							<rect width="100%" height="100%" fill="white" />
							<use href="#map-state-path-{state}-{id}" fill="black" />
						</mask>
					{/each}
				</defs>

				{#each Object.entries(states) as [state, { valueFrac }]}
					<use
						class="state"
						class:data-available={!isNullish(valueFrac)}
						style:--lightness={mapRange(valueFrac, 0, 1, 0.9, 0.2)}
						fill="url(#map-no-data-pattern-{id})"
						href="#map-state-path-{state}-{id}"
						tabindex="0"
						on:click={() => onSelectState(state)}
						on:pointerover={() => onStatePointerover(state)}
						on:pointerleave={() => onStatePointerleave(state)}
						on:keypress={({ code }) => ["Enter", "Space"].includes(code) && onSelectState(state)}
					/>
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

			{#each Object.entries(states) as [state, { regulationsIndexFrac }]}
				<RegulationsBar
					x={barOrigins[state][0] / COORDS_WIDTH}
					y={barOrigins[state][1] / COORDS_HEIGHT}
					fraction={regulationsIndexFrac}
					on:click={() => onSelectState(state)}
					on:pointerover={() => onStatePointerover(state)}
					on:pointerleave={() => onStatePointerleave(state)}
				/>
			{/each}
		</Tooltip>
	</div>
</div>

<style>
	.map {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.svg-container {
		position: absolute;
		margin: auto;
		inset: 0;
		max-width: 100%;
		max-height: 100%;
		aspect-ratio: var(--aspect-ratio);
	}

	svg {
		display: block;
		stroke-linejoin: round;
		--stroke-width-outline: 1px;
		--stroke-width-selected: 4px;
		filter: drop-shadow(0 0 2em rgba(0, 0, 0, 0.15));
		width: 100%;
	}

	svg use.state {
		transition: fill var(--transition-duration) var(--transition-timing-function);
		cursor: pointer;
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

		pointer-events: none;
	}

	svg use.selected {
		stroke: var(--c-state);
		/* multiply by 2 because we mask off inside half of the stroke */
		stroke-width: calc(var(--stroke-width-selected) * 2);

		pointer-events: none;
	}

	.date {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-size: 40px;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}
	.date .month {
		font-size: 2em;
		font-weight: 500;
	}

	.date .year {
		font-weight: bold;
	}
</style>
