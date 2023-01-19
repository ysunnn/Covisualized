<script>
	import { filter, dataAtDate } from "../../stores";
	import Icon from "../Icon.svelte";

	const labels = {
		church: { 1: "Places of worship partially accessible ", 2: "Places of worship closed" },
		daycare: { 1: "", 2: "" },
		demo: { 1: "", 2: "" },
		dist: { 1: "", 2: "" },
		"ess_shps": { 1: "", 2: "" },
		gastr: { 1: "", 2: "" },
		hcut: { 1: "", 2: "" },
		leavehome: { 1: "", 2: "" },
		morefriends: { 1: "", 2: "" },
		msk: { 1: "", 2: "" },
		onefriend: { 1: "", 2: "" },
		plygrnd: { 1: "", 2: "" },
		school: { 1: "", 2: "" },
		shppng: { 1: "", 2: "" },
		trvl: { 1: "", 2: "" },
		zoo: { 1: "", 2: "" },
	};

	$: regulations = Object.entries($dataAtDate[$filter.state]?.regulations?.single || {})
		.filter(([, level]) => level > 0);
</script>

<div class="regulations" class:none={regulations.length === 0}>
	{#if regulations.length > 0}
		{#each regulations as [name, level]}
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
