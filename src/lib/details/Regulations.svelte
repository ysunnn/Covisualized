<script>
	import { filter, dataAtDate } from "../../stores";
	import Icon from "../Icon.svelte";

	const labels = {
		church: { 1: "Places of worship partially accessible", 2: "Places of worship closed" },
		daycare: { 1: "Kindergartens only for essential professions", 2: "Kindergartens closed" },
		demo: { 1: "Public assembly restricted", 2: "Public assembly banned" },
		dist: { 1: "Social distancing" },
		"ess_shps": { 1: "Essential shops partially unavailable", 2: "Essential shops closed" },
		gastr: { 1: "Gastronomy partially restricted", 2: "Gastronomy closed" },
		hcut: { 1: "Some body care services unavailable", 2: "Body care related shops closed" },
		leavehome: { 1: "Leaving home restricted at some locations/times", 2: "Leaving home only for sound reasons" },
		morefriends: { 1: "Public meetings limited in number", 2: "Public meetings only with 1 person" },
		msk: { 1: "Face masks compulsory in some locations", 2: "Face masks compulsory in public" },
		onefriend: { 1: "Public meet-ups banned" },
		plygrnd: { 1: "Conditions apply to playground visits", 2: "Playground visits prohibited" },
		school: { 1: "Schools closed with exceptions", 2: "Schools closed" },
		shppng: { 1: "Non-essential stores partially unavailable", 2: "Non-essential stores closed" },
		trvl: { 1: "Domestic travel restricted", 2: "Domestic travel banned" },
		zoo: { 1: "Zoos & botanic gardens restricted", 2: "Zoos & botanic gardens closed" },
	};
	const availableRegulations = [
		"leavehome", "gastr", "msk", "dist", "onefriend", "morefriends",
		"ess_shps", "shppng", "demo", "hcut", "school", "plygrnd",
		"daycare", "church", "trvl", "zoo",
	];

	let regulations = [];
	$: {
		const regulationLevels = $dataAtDate[$filter.state]?.regulations?.single || {};
		regulations = availableRegulations
			.map(name => [name, regulationLevels[name]])
			.filter(([, level]) => level > 0);
	}
</script>

<div class="regulations" class:none={regulations.length === 0}>
	{#if regulations.length > 0}
		{#each regulations as [name, level] (name)}
			<div class="regulation">
				<Icon {name} size="2rem" />
				<span class="label">{labels[name][level]}</span>
			</div>
		{/each}
	{:else}
		No COVID-19 regulations in place.
	{/if}
</div>

<style>
	.regulations {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20ch, 1fr));
		gap: 1em;

		padding: 1em;
		border-radius: 6px;
		background-color: hsl(var(--c-covid-hsl), 0.2);
		box-shadow: 0 4px 16px 0 hsl(var(--c-covid-h), var(--c-covid-s), 40%, 0.15);
		color: var(--c-covid);
		font-weight: bold;
	}
	.regulations.none {
		grid-template-columns: 1fr;
		background-color: hsl(var(--c-positive-hsl), 0.2);
		color: var(--c-positive);
	}

	.regulation {
		display: flex;
		align-items: center;
		font-size: 0.75em;
		gap: 0.5em;
	}
	.regulation :global(.icon) {
		flex-shrink: 0;
	}
</style>
