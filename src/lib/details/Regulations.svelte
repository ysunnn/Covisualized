<script>
	import { filter, dataAtDate } from "../../stores";
	import Icon from "../Icon.svelte";
	import Tooltip from "../Tooltip.svelte";

	const labels = {
		church: {
			0: "Places of worship open",
			1: "Places of worship partially accessible",
			2: "Places of worship closed",
		},
		daycare: {
			0: "Kindergartens open",
			1: "Kindergartens only for essential professions",
			2: "Kindergartens closed",
		},
		demo: {
			0: "Public assembly allowed",
			1: "Public assembly restricted",
			2: "Public assembly banned",
		},
		dist: {
			0: "No Social distancing required",
			1: "Social distancing",
		},
		"ess_shps": {
			0: "Essential shops open",
			1: "Essential shops partially unavailable",
			2: "Essential shops closed",
		},
		gastr: {
			0: "Gastronomy open",
			1: "Gastronomy partially restricted",
			2: "Gastronomy closed",
		},
		hcut: {
			0: "Body care related shops open",
			1: "Some body care services unavailable",
			2: "Body care related shops closed",
		},
		leavehome: {
			0: "Leaving home unrestricted",
			1: "Leaving home restricted at some locations/times",
			2: "Leaving home only for sound reasons",
		},
		friends: {
			0: "Public company not limited",
			1: "Public company limited in number",
			2: "Public company only with 1 person",
			3: "No public company allowed",
		},
		msk: {
			0: "Face masks optional",
			1: "Face masks compulsory in some locations",
			2: "Face masks compulsory in public",
		},
		plygrnd: {
			0: "Playgrounds unrestricted",
			1: "Conditions apply to playground visits",
			2: "Playground visits prohibited",
		},
		school: {
			0: "Schools unrestricted",
			1: "Schools closed with exceptions",
			2: "Schools closed",
		},
		shppng: {
			0: "Non-essential stores open",
			1: "Non-essential stores partially unavailable",
			2: "Non-essential stores closed",
		},
		trvl: {
			0: "Domestic travel unrestricted",
			1: "Domestic travel restricted",
			2: "Domestic travel banned",
		},
		zoo: {
			0: "Zoos & botanic gardens open",
			1: "Zoos & botanic gardens restricted",
			2: "Zoos & botanic gardens closed",
		},
	};

	const categories = [{
		category: "Hospitality",
		regulations: ["gastr", "trvl"],
	}, {
		category: "Social",
		regulations: ["leavehome", "msk", "dist", "friends"],
	}, {
		category: "Commerce",
		regulations: ["ess_shps", "shppng", "hcut"],
	}, {
		category: "Public",
		regulations: ["school", "daycare", "plygrnd", "church", "zoo", "demo"],
	}];

	$: categorizedRegulations = (() => {
		const dataAvailable = Boolean($dataAtDate[$filter.state]?.regulations);
		if (!dataAvailable && $filter.date >= "2020-03") return undefined;

		const regulationLevels = $dataAtDate[$filter.state]?.regulations?.single || {};
		return categories
			.map(({ category, regulations }) => (
				{ category, regulations: regulations.map(name => [name, regulationLevels[name] || 0]) }
			));
	})();

	const indexToLetter = i => String.fromCharCode(97 + i);
</script>

<div class="regulations" class:none={!categorizedRegulations}>
	{#if categorizedRegulations}
		{#each categorizedRegulations as { category, regulations }, i}
			<div class="category {indexToLetter(i)}" style:grid-area={indexToLetter(i)}>
				<h4 class="category-title">
					{category}
				</h4>
				<div class="category-regulations">
					{#each regulations as [name, level] (name)}
						<div class="regulation level-{level}">
							<Tooltip content={labels[name][level]} hideOnClick={false}>
								<Icon {name} size="2rem" />
								<div class="severity">
									{#each { length: level } as _}
										<span class="dot" />
									{/each}
								</div>
							</Tooltip>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	{:else}
		COVID-Regulations <strong>data unavailable</strong>.
	{/if}
</div>

<style>
	.regulations:not(.none) {
		display: grid;
		grid-template-areas:
			"a a c c c"
			"b b d d d"
			"b b d d d";
		gap: 1em;
	}
	.regulations.none {
		padding: 1em;
		background-image: var(--gradient-no-data);
		border-radius: 6px;
		border: 1px solid rgb(0, 0, 0, 0.1);
		box-shadow: 0 4px 16px 0 rgb(0, 0, 0, 0.05);
	}

	.category {
		display: flex;
		justify-content: space-between;
		align-items: center;

		background-color: hsl(var(--c-covid-hsl), 0.05);
		border-radius: 6px;
		border: 1px solid hsl(var(--c-covid-hsl), 0.25);
		box-shadow: 0 4px 16px 0 hsl(var(--c-covid-h), var(--c-covid-s), 40%, 0.15);
		padding: 0.5em 1em;
	}

	.category-title {
		margin: 0;
		font-size: 0.75em;
		color: var(--c-covid);
	}

	.category-regulations {
		display: flex;
		gap: 1em;
	}

	.severity {
		display: flex;
		justify-content: center;
		height: 0.25em;
		gap: 0.25em;
	}
	.severity .dot {
		width: 0.25em;
		aspect-ratio: 1;
		background-color: currentColor;
		border-radius: 50%;
	}

	.regulation {
		transition: color 300ms ease;
	}
	.level-0 {
		color: hsl(var(--c-foreground-hsl), 0.2);
	}
	.level-1 {
		color: hsl(var(--c-covid-h), var(--c-covid-s), calc(var(--c-covid-l) + 12%));
	}
	.level-2, .level-3 {
		color: hsl(var(--c-covid-h), 100%, calc(var(--c-covid-l) - 20%));
	}
</style>
