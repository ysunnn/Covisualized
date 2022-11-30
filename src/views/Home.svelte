<script>
	import Map from "../lib/Map.svelte";
	import DebugDataInput from "../lib/DebugDataInput.svelte";

	import { filter } from "../stores.js";
	import { getStateName } from "../util.js";
</script>

<main>
	<div class="variables" />
	<div class="map">
		Selected state: <b>{getStateName($filter.state) || "None"}</b>
		<Map />
	</div>
	<div class="timeline" />
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
