<script>
	import { onDestroy, onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { wait, variables } from "../../util";
	import { filter, tutorial, playback } from "../../stores";

	import Button from "../Button.svelte";
	import PlayButton from "../PlayButton.svelte";

	onMount(() => {
		$filter.date = "2019-06";
	});

	let buttonEl;

	let dummy = undefined;
	const getDummySettings = () => {
		if (!buttonEl || !$tutorial.playButtonEl) return undefined;

		const { x: xS, y: yS, width: wS, height: hS } = buttonEl.getBoundingClientRect();
		const { x: xE, y: yE, width: wE, height: hE } = $tutorial.playButtonEl.getBoundingClientRect();
		return { start: [xS + wS / 2, yS + hS / 2], end: [xE + wE / 2, yE + hE / 2] };
	};

	const onPlayClick = async () => {
		dummy = getDummySettings();
		$tutorial.step++;

		await wait(1500);
		$playback.play = true;
		$tutorial.step++;
	};

	$: if ($tutorial.step === 3 && $filter.date === "2020-03") {
		$tutorial.step++;
	}
	$: if ($tutorial.step === 4 && $filter.date === "2021-01") {
		(async () =>{
			await wait($playback.stepDuration - 100);
			$tutorial.step++;
			$playback.play = false;
		})();
	}

	onDestroy(() => {
		if ($tutorial.step === 5) $tutorial.step = 0;
	});
</script>

<div class="tutorial">
	{#if $tutorial.step === 1}
		<h1>Welcome to <span class="covid">Covi</span>sualize<span class="covid">d</span></h1>
		<p>
			Visualize the impacts of the COVID-19 regulations on the <strong>hospitality</strong> industry.
		</p>
		<p>
			To begin, let’s look at the <strong>{$filter.variable}</strong> development at the start of the pandemic.
		</p>
		<div class="play-button-container">
			<div class="play-button" bind:this={buttonEl}>
				<Button icon="play" shape="pill" size="2em" on:click={onPlayClick}>Start</Button>
			</div>
			<Button variant="text" on:click={() => $tutorial.step = 0}>Skip Tutorial</Button>
		</div>
	{:else if $tutorial.step >= 2 && $tutorial.step <= 4}
		<h1>Getting Started</h1>
		<p>
			The <strong>map</strong> provides a monthly overview of the currently selected variable
			({variables.find(({ id }) => id === $filter.variable)?.label})
			<strong>per state</strong>.
		</p>
		<p>
			On the <strong>timeline</strong>, the <strong>national total</strong> can be seen for each month.
		</p>
		{#if $tutorial.step === 4}
			<p in:fly={{ x: 200, duration: 600 }}>
				When <strong class="covid">COVID-19 regulations</strong> are in place, these are shown in the
				bars above the states in the map with <strong class="covid">red coloring</strong>.
			</p>
		{/if}
	{:else}
		<h1>Now it’s your turn!</h1>
		<p>
			You can now <strong>select another variable</strong> to inspect at the top.
		</p>
		<p>
			On the <strong>timeline</strong>, <strong>navigate</strong> by clicking a month.
		</p>
		<p>
			Finally, click a state on the map to get more details about it —
			<strong>ending this tutorial</strong>.
		</p>
	{/if}

	{#if [2, 3].includes($tutorial.step)}
		<PlayButton {dummy} />
	{/if}
</div>

<style>
	.tutorial {
		overflow-x: hidden;
	}

	.covid {
		color: var(--c-covid);
	}

	p {
		font-size: 1.5em;
	}

	.play-button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
		margin: 2em 0;
	}

	.play-button {
		position: relative;
	}
</style>
