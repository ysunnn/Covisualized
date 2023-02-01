<script>
	import Icon from "./Icon.svelte";

	export let element = "button";
	/** @type {"fill" | "outline" | "text"} */
	export let variant = "fill";
	/** @type {"default" | "pill" | "ellipse"} */
	export let shape = "default";
	export let color = "foreground";
	export let size = "1em";
	export let type = "button";
	export let icon = undefined;
</script>

<svelte:element
	this={element}
	class="button {variant} {shape}"
	style:--color-h="var(--c-{color}-h)"
	style:--color-s="var(--c-{color}-s)"
	style:--color-l="var(--c-{color}-l)"
	style:font-size={size}
	{type}
	{...$$restProps}
	on:click
>
	{#if icon}
		<Icon name={icon} />
	{/if}
	<slot />
</svelte:element>

<style lang="postcss">
	.button {
		--color: hsl(var(--color-h), var(--color-s), var(--color-l));
		--color-shade: transparent;

		display: inline-flex;
		align-items: center;
		gap: 0.25em;

		appearance: none;
		background: none;
		border-radius: 4px;
		border: 2px solid transparent;
		padding: 0.5em 1em;
		font-family: inherit;
		font-size: 1em;
		font-weight: 500;
		cursor: pointer;

		transition: ease 300ms;
		transition-property: background-color, border-color, color;
	}
	.button:hover {
		--color: hsl(var(--color-h), var(--color-s), calc(var(--color-l) + 10%));
		--color-shade: hsl(var(--color-h), calc(var(--color-s) + 20%), calc(var(--color-l) + 20%), 0.1);
	}
	.button.fill {
		background-color: var(--color);
		color: white;
	}
	.button.outline {
		background-color: var(--color-shade);
		border-color: var(--color);
		color: var(--color);
	}
	.button.text {
		background-color: var(--color-shade);
		color: var(--color);
	}

	.button.pill {
		border-radius: max(1000vw, 1000vh);
	}
	.button.ellipse {
		border-radius: 50%;
		padding: 0.5em;
	}
</style>
