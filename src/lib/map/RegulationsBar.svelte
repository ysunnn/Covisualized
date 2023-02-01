<script>
	import { playback } from "../../stores";
	import { isNullish } from "../../util";

	export let x;
	export let y;
	export let fraction;

	const SECTIONS = 5;
</script>

<div
	class="regulations-bar"
	class:no-data={isNullish(fraction)}
	style:--x={x}
	style:--y={y}
	style:--fraction={fraction ?? 0}
	style:--transition-duration="{$playback.playing ? $playback.stepDuration - 20 : 300}ms"
	style:--transition-timing-function={$playback.playing ? "ease-in-out" : "ease"}
	on:click
	on:pointerover
	on:pointerleave
>
	<div class="inner">
		<div class="fill" />
		{#each { length: SECTIONS - 1 } as _, i}
			<div class="tick" style:--tick-fraction={(i + 1) / SECTIONS} />
		{/each}
	</div>
</div>

<style>
	.regulations-bar {
		position: absolute;
		left: calc(var(--x) * 100%);
		top: calc(var(--y) * 100%);
		width: max(2%, 4px);
		height: max(10%, 20px);
		transform: translate(-50%, -100%);

		box-sizing: content-box;
		border: 2px solid white;
		background-color: hsl(var(--c-background-h), var(--c-background-s), calc(var(--c-background-l) - 20%));

		cursor: pointer;
	}
	.regulations-bar.no-data {
		background-image: var(--gradient-no-data-legend);
		background-size: 100%;
	}

	.inner {
		position: absolute;
		inset: 0;
	}

	.fill {
		position: absolute;
		inset: 0;
		background-color: hsl(var(--c-covid-h), calc(var(--c-covid-s) + 20%), var(--c-covid-l));
		transform-origin: bottom;
		transform: scaleY(var(--fraction));

		transition: transform var(--transition-duration) var(--transition-timing-function);
	}

	.tick {
		position: absolute;
		left: 0;
		right: 0;
		top: calc(var(--tick-fraction) * 100%);
		height: 2px;
		transform: translateY(-50%);
		background-color: rgb(255, 255, 255, 0.5);
	}
</style>
