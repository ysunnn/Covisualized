<script>
	import { onDestroy, onMount } from "svelte";
	import tippy, { followCursor as followCursorPlugin } from "tippy.js";
	import "tippy.js/dist/tippy.css";
	import "tippy.js/animations/shift-away-subtle.css";

	/** @type {string | undefined} */
	export let content;
	export let placement = "top";
	export let offset = [0, 10];
	export let followCursor = false;
	export let hideOnClick = true;
	export let arrow = true;

	let el = null;
	let contentEl = null;
	let tippyInstance = null;
	onMount(() => {
		tippyInstance = tippy(el, {
			allowHTML: true,
			content: $$slots.content ? contentEl : content,
			animation: "shift-away-subtle",
			placement,
			offset,
			followCursor,
			hideOnClick,
			arrow,
			plugins: [followCursorPlugin],
		});
	});
	onDestroy(() => tippyInstance.destroy());

	$: tippyInstance?.setContent(content);
</script>

<span class="tooltip" bind:this={el}>
	<slot />
	{#if $$slots.content}
		<div class="tooltip-content" bind:this={contentEl}>
			<slot name="content" />
		</div>
	{/if}
</span>
