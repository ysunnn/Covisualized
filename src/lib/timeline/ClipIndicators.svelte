<script>
	import iconLeftSVG from "../../assets/icons/arrow-expand-left.svg?raw";

	export let left = false;
	export let right = false;
</script>

<div class="clip-indicators" class:left class:right>
	{#each ["left", "right"] as side}
		<div class="side {side}">
			<div class="icon">
				{@html iconLeftSVG}
			</div>
		</div>
	{/each}
</div>

<style>
	.clip-indicators {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.side {
		position: absolute;
		top: 0;
		bottom: 0;
		width: max(5%, 2em);

		z-index: 1;

		transform: scaleX(0);
		transition: transform 300ms ease;

		display: flex;
		align-items: center;
	}
	.side.left {
		justify-content: flex-start;
		padding-left: 0.5em;
	}
	.side.right {
		justify-content: flex-end;
		padding-right: 0.5em;
	}

	.icon {
		display: none;
		width: 1em;
		height: 1em;
		color: hsl(var(--c-background-h), var(--c-background-s), calc(var(--c-background-l) - 20%), 0.5);
	}
	.side.right .icon { transform: scaleX(-1); }

	.clip-indicators .side.left {
		left: 0;
		background-image:
			linear-gradient(to right,
				var(--c-background),
				hsl(var(--c-background-hsl), 0.8),
				transparent
			);
		transform-origin: left;
	}
	.clip-indicators .side.right {
		right: 0;
		background-image: linear-gradient(to left,
			var(--c-background),
			hsl(var(--c-background-hsl), 0.8),
			transparent
		);
		transform-origin: right;
	}
	.clip-indicators.left .side.left,
	.clip-indicators.right .side.right {
		transform: scaleX(1);
	}
</style>
