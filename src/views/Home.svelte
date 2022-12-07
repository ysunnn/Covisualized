<script>
	import Map from "../lib/Map.svelte";
	import Timeline from "../lib/Timeline.svelte";
	import DebugDataInput from "../lib/DebugDataInput.svelte";

	import { filter } from "../stores";
	import { getStateName, getUID } from "../util";

	const id = getUID();

	let projectionStyle = "geo";
	let regulationsStyle = 0;

	$: ({ state } = $filter);
</script>

<main>
	<div class="variables" />
	<div class="map">
		<span>Selected state: <b>{getStateName(state) || "None"}</b></span>
		<div>
			<label for="projection-style-{id}">Projection Style</label>
			<select id="projection-style-{id}" bind:value={projectionStyle}>
				{#each ["geo", "optimized"] as style}
					<option value={style}>{style}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="regulations-style-{id}">COVID Regulations Style</label>
			<select id="regulations-style-{id}" bind:value={regulationsStyle}>
				{#each [0, 1, 2] as i}
					<option value={i}>{i}</option>
				{/each}
			</select>
		</div>
		<Map {projectionStyle} {regulationsStyle} />
	</div>
	<div class="timeline">
		<Timeline />
	</div>
	<div class="details">
		<DebugDataInput />
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-areas:
			"variables details"
			"map       details"
			"timeline  timeline";
		grid-template-columns: 1fr 1fr;
		gap: 1em;
	}

	main > * {
		display: flex;
		flex-direction: column;
	}

	.map {
		grid-area: map;
	}

	.variables { grid-area: variables; }
	.timeline { grid-area: timeline; }
	.details { grid-area: details; }
</style>
