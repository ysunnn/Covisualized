<script>
	import { filter, dataAtDate } from "../../stores";
	import Icon from "../Icon.svelte";
	import Tooltip from "../Tooltip.svelte";

	const labels = {
		church: {
			0: "<b>Places of worship:</b> Open without restriction",
			1: "<b>Places of worship:</b> One or more of:<ul><li>limited in numbers or duration</li><li>appointment required</li><ul>",
			2: "<b>Places of worship:</b> Closed",
		},
		daycare: {
			0: "<b>Kindergartens:</b> Open",
			1: "<b>Kindergartens:</b> Only for parents of essential professions",
			2: "<b>Kindergartens:</b> Closed",
		},
		demo: {
			0: "<b>Public assembly:</b> Allowed",
			1: "<b>Public assembly:</b> Limited in numbers or duration",
			2: "<b>Public assembly:</b> Banned",
		},
		dist: {
			0: "<b>Social distancing:</b> Not required",
			1: "<b>Social distancing:</b> Required",
		},
		"ess_shps": {
			0: "<b>Essential stores:</b> Open",
			1: "<b>Essential stores:</b> One or more of:<ul><li>partial sections open</li><li>appointment required</li></ul>",
			2: "<b>Essential stores:</b> Closed",
		},
		gastr: {
			0: "<b>Gastronomy:</b> Open",
			1: "<b>Gastronomy:</b> One or more of:<ul><li>only take-away & delivery</li><li>food-serving restaurants only</li><li>negative test or vaccination required</li></ul>",
			2: "<b>Gastronomy:</b> Closed",
		},
		hcut: {
			0: "<b>Body care studios:</b> Open",
			1: "<b>Body care studios:</b> Some services unavailable",
			2: "<b>Body care studios:</b> Closed",
		},
		leavehome: {
			0: "<b>Leaving home:</b> Unrestricted",
			1: "<b>Leaving home:</b> Restricted for some locations or times",
			2: "<b>Leaving home:</b> Only for sound reasons",
		},
		friends: {
			0: "<b>Meeting in public:</b> Unrestricted",
			1: "<b>Meeting in public:</b> Limited in number",
			2: "<b>Meeting in public:</b> Only with 1 other person",
			3: "<b>Meeting in public:</b> Banned",
		},
		msk: {
			0: "<b>Face masks:</b> Optional",
			1: "<b>Face masks:</b> Compulsory in some locations",
			2: "<b>Face masks:</b> Compulsory in public",
		},
		plygrnd: {
			0: "<b>Playgrounds:</b> Unrestricted",
			1: "<b>Playgrounds:</b> Conditions apply (e. g. limit in numbers)",
			2: "<b>Playgrounds:</b> Visits prohibited",
		},
		school: {
			0: "<b>Schools:</b> Unrestricted",
			1: "<b>Schools:</b> One or more of:<ul><li>open only to certain classes</li><li>open only to essential professions</li><li>split in face-to-face & online teaching</li></ul>",
			2: "<b>Schools:</b> Closed (online teaching allowed)",
		},
		shppng: {
			0: "<b>Non-essential stores:</b> Open",
			1: "<b>Non-essential stores:</b> One or more of:<ul><li>open dependant on size or type</li><li>appointment required</li><li>negative test or vaccination required</li></ul>",
			2: "<b>Non-essential stores:</b> Closed",
		},
		trvl: {
			0: "<b>Domestic travel:</b> Unrestricted",
			1: "<b>Domestic travel:</b> One or more of:<ul><li>allowed but accomodation prohibited</li><li>entry ban for certain groups</li><li>negative test or vaccination required</li></ul>",
			2: "<b>Domestic travel:</b> Only for sound reasons",
		},
		zoo: {
			0: "<b>Zoos & Botanic gardens:</b> Open",
			1: "<b>Zoos & Botanic gardens:</b> One or more of:<ul><li>outdoor areas only</li><li>closure of animal houses/aquariums</li><li>appointment required</li><li>negative test or vaccination required</li></ul>",
			2: "<b>Zoos & Botanic gardens:</b> Closed",
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
							<Tooltip tag="div" content={labels[name][level]} hideOnClick={false} offset={[0, 8]}>
								<Icon {name} size="1.75em" />
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
		Granular COVID-Regulations <strong>data unavailable</strong>.
	{/if}
</div>

<style>
	.regulations:not(.none) {
		display: grid;
		grid-template-areas:
			"a a c c c"
			"b b d d d"
			"b b d d d";
		gap: 0.5em;
	}
	.regulations.none {
		padding: 1em;
		background-image: var(--gradient-no-data);
		border-radius: 6px;
		border: 1px solid rgb(0, 0, 0, 0.1);
		box-shadow: 0 0.25em 1em 0 rgb(0, 0, 0, 0.05);
		text-align: center;
	}

	.category {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5em;

		background-color: hsl(var(--c-covid-hsl), 0.05);
		border-radius: 6px;
		border: 1px solid hsl(var(--c-covid-hsl), 0.25);
		box-shadow: 0 0.25em 1em 0 hsl(var(--c-covid-h), var(--c-covid-s), 40%, 0.15);
		padding: 0.625em;
		padding-left: 1em;
	}

	.category-title {
		margin: 0;
		font-size: 0.8125em;
		font-weight: 500;
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
	.regulation :global(.tooltip),
	.regulation :global(.icon) {
		display: flex;
	}
	.level-0 {
		color: hsl(var(--c-foreground-hsl), 0.2);
	}
	.level-1 {
		color: hsl(var(--c-covid-h), var(--c-covid-s), calc(var(--c-covid-l) + 12%));
	}
	.level-2, .level-3 {
		color: hsl(var(--c-covid-h), 100%, calc(var(--c-covid-l) - 20%));
		filter: drop-shadow(0 0 0.5em hsl(var(--c-covid-hsl), 0.8));
	}
</style>
