<script>
	import Map from "../lib/Map.svelte";
	import Timeline from "../lib/Timeline.svelte";
	import DebugDataInput from "../lib/DebugDataInput.svelte";

	import { filter } from "../stores.js";
	import { getStateName } from "../util.js";

	let projectionStyle = "geo";
	let regulationsStyle = 0;

	$: ({ state } = $filter);
</script>

<main>
	<div class="variables" />
	<div class="map">
		Selected state: <b>{getStateName(state) || "None"}</b>
		<select bind:value={projectionStyle}>
			{#each ["geo", "optimized"] as style}
				<option value={style}>{style}</option>
			{/each}
		</select>
		<select bind:value={regulationsStyle}>
			{#each [0, 1, 2] as i}
				<option value={i}>{i}</option>
			{/each}
		</select>
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

	.map {
		grid-area: map;
	}

	.variables { grid-area: variables; }
	.timeline { grid-area: timeline; }
	.details { grid-area: details; }
</style>
