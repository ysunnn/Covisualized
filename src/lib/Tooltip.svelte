<script>
	import { onDestroy, onMount } from "svelte";
	import { isNullish } from "../util";

	import tippy, { followCursor as followCursorPlugin } from "tippy.js";
	import "tippy.js/dist/tippy.css";
	import "tippy.js/animations/shift-away-subtle.css";

	/** @type {string | undefined} */
	export let content;
	export let show = undefined;
	export let placement = "top";
	export let offset = [0, 10];
	export let followCursor = false;
	export let hideOnClick = true;
	export let arrow = true;

	export let tag = "span";

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
			trigger: isNullish(show) ? undefined : "manual",
			plugins: [followCursorPlugin],
		});
	});
	onDestroy(() => tippyInstance.destroy());

	$: if (tippyInstance) tippyInstance.setContent(content);
	$: if (tippyInstance) tippyInstance.trigger = isNullish(show) ? undefined : "manual";
	$: if (tippyInstance && !isNullish(show)) {
		if (show) tippyInstance.show();
		else tippyInstance.hide();
	}
</script>

<svelte:element class="tooltip" this={tag} bind:this={el}>
	<slot />
	{#if $$slots.content}
		<div class="tooltip-content" bind:this={contentEl}>
			<slot name="content" />
		</div>
	{/if}
</svelte:element>
