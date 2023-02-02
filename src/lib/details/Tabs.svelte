
<script>
	import { onMount } from "svelte";

	import Icon from "../Icon.svelte";

	export let items = [];
	export let activeTabValue;

	onMount(() => {
		if (Array.isArray(items) && items.length && items[0].value) {
			activeTabValue = items[0].value;
		}
	});
</script>

<ul>
	{#if Array.isArray(items)}
		{#each items as item}
			<li class:active={activeTabValue === item.value}>
				<button on:click={() => (activeTabValue = item.value)}>
					<Icon name={item.icon} size="1.5em" />
					<span>{item.label}</span>
				</button>
			</li>
		{/each}
	{/if}
</ul>

<style>
	ul {
		list-style: none;
		padding-left: 0;
		margin: 0;
		margin-top: 1em;

		display: flex;
		gap: 1em;
		border-bottom: 1px solid var(--c-foreground);
	}

	li {
		position: relative;
		font-weight: 500;
	}

	button {
		appearance: none;
		background: none;
		border: none;
		border-radius: 0;
		font: inherit;
		color: inherit;

		display: flex;
		align-items: center;
		gap: 0.5em;

		padding: 0.75em 0.5em;
	}
	button :global(.icon) {
		flex-shrink: 0;
	}
	li:not(.active) button {
		cursor: pointer;
	}

	li::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-radius: 1em 1em 0 0;
		background-color: currentColor;
		opacity: 0;
		pointer-events: none;

		transition: 150ms ease;
		transition-property: height, opacity;
	}
	li:hover::after,
	li:focus-within::after {
		height: 0.125em;
		opacity: 0.75;
	}
	li.active::after {
		height: 0.25em;
		opacity: 1;
	}
</style>
